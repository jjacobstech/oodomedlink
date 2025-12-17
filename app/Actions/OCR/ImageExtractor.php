<?php

namespace App\Actions\OCR;

use Google\Cloud\Vision\V1\Client\ImageAnnotatorClient;
use Google\Cloud\Vision\V1\Client\ProductSearchClient;
use Google\Cloud\Vision\V1\Feature\Type;
use Illuminate\Support\Facades\Log;

class ImageExtractor
{
      private ?ImageAnnotatorClient $visionClient = null;
      protected string $projectId;
      protected string $location;
      protected string $processorId;
      protected string $processorName;

      public function __construct()
      {
            $credentialsPath = storage_path('app/private/credentials/client_secret.json');

            if (!file_exists($credentialsPath)) {
                  throw new \RuntimeException("Google credentials file not found at: {$credentialsPath}");
            }

            $credentialsContent = file_get_contents($credentialsPath);
            $credentials = json_decode($credentialsContent, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                  throw new \RuntimeException("Invalid JSON in credentials file: " . json_last_error_msg());
            }

            $this->projectId = config('services.google.project.id');
            $this->location = config('services.google.project.processor.location');
            $this->processorId = config('services.google.project.processor.id');
            $this->processorName = config('services.google.project.processor.name');

            // Validate required config values
            if (!$this->projectId || !$this->location || !$this->processorId) {
                  throw new \RuntimeException("Missing required Google Cloud configuration values");
            }
      }

      /**
       * Get or initialize the Vision client
       */
      private function getVisionClient(): ImageAnnotatorClient
      {
            if ($this->visionClient === null) {
                  $credentialsPath = storage_path('app/private/credentials/client_secret.json');
                  $credentials = json_decode(file_get_contents($credentialsPath), true);

                  $this->visionClient = new ImageAnnotatorClient([
                        'credentials' => $credentials
                  ]);
            }

            return $this->visionClient;
      }

      /**
       * Detects text in an image using the Cloud Vision API
       *
       * @param string $imagePath The path to the local image file
       * @param bool $useDocumentDetection Use DOCUMENT_TEXT_DETECTION for dense text (default: false)
       * @return array Returns array with 'success', 'text', and optional 'error' keys
       */
      public function detectTextFromImage(string $imagePath, bool $useDocumentDetection = false): array
      {
            if (!file_exists($imagePath)) {
                  return [
                        'success' => false,
                        'error' => "Image file not found at path: {$imagePath}",
                        'text' => null
                  ];
            }

            // Validate file type
            $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
            $mimeType = mime_content_type($imagePath);

            if (!in_array($mimeType, $allowedMimeTypes)) {
                  return [
                        'success' => false,
                        'error' => "Unsupported image type: {$mimeType}",
                        'text' => null
                  ];
            }

            $client = $this->getVisionClient();

            try {
                  $imageData = file_get_contents($imagePath);

                  if ($imageData === false) {
                        throw new \RuntimeException("Failed to read image file");
                  }

                  // Use document detection for dense text, otherwise use regular text detection
                  $response = $useDocumentDetection
                        ? $client->documentTextDetection($imageData)
                        : $client->textDetection($imageData);

                  $error = $response->getError();
                  if ($error && $error->getCode() !== 0) {
                        throw new \RuntimeException("Vision API error: " . $error->getMessage());
                  }

                  $texts = $response->getTextAnnotations();

                  if (!$texts || count($texts) === 0) {
                        return [
                              'success' => true,
                              'text' => '',
                              'message' => 'No text found in image'
                        ];
                  }

                  // The first annotation contains all detected text
                  $fullText = $texts[0]->getDescription();

                  // Get additional details from subsequent annotations (individual words/blocks)
                  $details = [];
                  foreach (array_slice(iterator_to_array($texts), 1) as $text) {
                        $vertices = $text->getBoundingPoly()->getVertices();
                        $bounds = [];

                        foreach ($vertices as $vertex) {
                              $bounds[] = [
                                    'x' => $vertex->getX(),
                                    'y' => $vertex->getY()
                              ];
                        }

                        $details[] = [
                              'text' => $text->getDescription(),
                              'bounds' => $bounds
                        ];
                  }

                  Log::info('OCR text extraction successful', [
                        'image_path' => $imagePath,
                        'text_length' => strlen($fullText),
                        'words_detected' => count($details)
                  ]);

                  return [
                        'success' => true,
                        'text' => $fullText,
                        'details' => $details,
                        'word_count' => count($details)
                  ];
            } catch (\Exception $e) {
                  Log::error('OCR text extraction failed', [
                        'image_path' => $imagePath,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                  ]);

                  return [
                        'success' => false,
                        'error' => $e->getMessage(),
                        'text' => null
                  ];
            }
      }

      /**
       * Extract text from multiple images in batch
       *
       * @param array $imagePaths Array of image file paths
       * @param bool $useDocumentDetection Use DOCUMENT_TEXT_DETECTION
       * @return array Results for each image
       */
      public function detectTextFromMultipleImages(array $imagePaths, bool $useDocumentDetection = false): array
      {
            $results = [];

            foreach ($imagePaths as $imagePath) {
                  $results[$imagePath] = $this->detectTextFromImage($imagePath, $useDocumentDetection);
            }

            return $results;
      }

      /**
       * Get confidence score and language information for detected text
       *
       * @param string $imagePath The path to the local image file
       * @return array
       */
      public function getTextAnalysis(string $imagePath): array
      {
            if (!file_exists($imagePath)) {
                  return [
                        'success' => false,
                        'error' => "Image file not found"
                  ];
            }

            $client = $this->getVisionClient();

            try {
                  $imageData = file_get_contents($imagePath);
                  $response = $client->documentTextDetection($imageData);

                  $fullTextAnnotation = $response->getFullTextAnnotation();

                  if (!$fullTextAnnotation) {
                        return [
                              'success' => true,
                              'text' => '',
                              'pages' => []
                        ];
                  }

                  $pages = [];
                  foreach ($fullTextAnnotation->getPages() as $page) {
                        $pageData = [
                              'width' => $page->getWidth(),
                              'height' => $page->getHeight(),
                              'confidence' => $page->getConfidence(),
                              'blocks' => []
                        ];

                        foreach ($page->getBlocks() as $block) {
                              $blockData = [
                                    'confidence' => $block->getConfidence(),
                                    'paragraphs' => []
                              ];

                              foreach ($block->getParagraphs() as $paragraph) {
                                    $words = [];
                                    foreach ($paragraph->getWords() as $word) {
                                          $wordText = '';
                                          foreach ($word->getSymbols() as $symbol) {
                                                $wordText .= $symbol->getText();
                                          }
                                          $words[] = [
                                                'text' => $wordText,
                                                'confidence' => $word->getConfidence()
                                          ];
                                    }
                                    $blockData['paragraphs'][] = [
                                          'words' => $words,
                                          'confidence' => $paragraph->getConfidence()
                                    ];
                              }

                              $pageData['blocks'][] = $blockData;
                        }

                        $pages[] = $pageData;
                  }

                  return [
                        'success' => true,
                        'text' => $fullTextAnnotation->getText(),
                        'pages' => $pages
                  ];
            } catch (\Exception $e) {
                  Log::error('Text analysis failed', [
                        'error' => $e->getMessage()
                  ]);

                  return [
                        'success' => false,
                        'error' => $e->getMessage()
                  ];
            }
      }

      /**
       * Clean up resources
       */
      public function __destruct()
      {
            if ($this->visionClient !== null) {
                  $this->visionClient->close();
            }
      }
}
