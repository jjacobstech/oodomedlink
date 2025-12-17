<?php

namespace App\Actions\OCR;


use App\Interfaces\OCR;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Google\Cloud\DocumentAI\V1\RawDocument;
use Google\Cloud\DocumentAI\V1\ProcessRequest;
use Google\Cloud\DocumentAI\V1\Client\DocumentProcessorServiceClient;


class TextExtractor
{

    private $client;
    protected string $projectId;
    protected string $location;
    protected string $processorId;
    protected string $filePath;

    protected string $processorName;


    public function __construct()
    {

        $credentialsPath = storage_path('app/private/credentials/client_secret.json');
        $credentialsContent = file_get_contents($credentialsPath);
        $credentials = json_decode($credentialsContent, true);

        $this->client = new DocumentProcessorServiceClient([
            'credentials' => $credentials
        ]);

        $this->projectId = config('services.google.project.id');
        $this->location =  config('services.google.project.processor.location');
        $this->processorId =  config('services.google.project.processor.id');
        $this->processorName =  config('services.google.project.processor.name');
    }

    /**
     * Process a document file
     *
     * @param string $filePath Path to the document file
     * @param string $mimeType MIME type (e.g., 'application/pdf', 'image/jpeg')
     * @return object Processed document response
     */
    public function processDocument($filePath, $mimeType)
    {
        try {



            // Read file content
            $fileContent = file_get_contents($filePath);

            // Create processor name
            $name = $this->client->processorName(
                $this->projectId,
                $this->location,
                $this->processorId
            );

            // Create raw document
            $rawDocument = new RawDocument([
                'content' => $fileContent,
                'mime_type' => $mimeType
            ]);

            // Create process request
            $request = new ProcessRequest([
                'name' => $name,
                'raw_document' => $rawDocument
            ]);

            // Process the document
            $response = $this->client->processDocument($request);


            return $response->getDocument();
        } catch (\Throwable $th) {
            Log::error($th);
            throw $th;
        }
    }

    /**
     * Extract text from document
     */
    public function extractText($document)
    {
        return $document->getText();
    }

    /**
     * Extract entities from document
     */
    public function extractEntities($document)
    {
        $entities = [];
        foreach ($document->getEntities() as $entity) {
            $entities[] = [
                'type' => $entity->getType(),
                'mention_text' => $entity->getMentionText(),
                'confidence' => $entity->getConfidence()
            ];
        }
        return $entities;
    }

    /**
     * Extract key-value pairs (form fields)
     */
    public function extractKeyValuePairs($document)
    {
        $keyValuePairs = [];
        foreach ($document->getPages() as $page) {
            foreach ($page->getFormFields() as $field) {
                $fieldName = $this->getTextFromLayout($field->getFieldName(), $document->getText());
                $fieldValue = $this->getTextFromLayout($field->getFieldValue(), $document->getText());

                $keyValuePairs[] = [
                    'key' => trim($fieldName),
                    'value' => trim($fieldValue),
                    'confidence' => $field->getFieldValue()->getConfidence()
                ];
            }
        }
        return $keyValuePairs;
    }

    /**
     * Extract tables from document
     */
    public function extractTables($document)
    {
        $tables = [];
        foreach ($document->getPages() as $page) {
            foreach ($page->getTables() as $table) {
                $tableData = [];
                foreach ($table->getHeaderRows() as $headerRow) {
                    $rowData = [];
                    foreach ($headerRow->getCells() as $cell) {
                        $rowData[] = $this->getTextFromLayout($cell->getLayout(), $document->getText());
                    }
                    $tableData[] = ['type' => 'header', 'cells' => $rowData];
                }

                foreach ($table->getBodyRows() as $bodyRow) {
                    $rowData = [];
                    foreach ($bodyRow->getCells() as $cell) {
                        $rowData[] = $this->getTextFromLayout($cell->getLayout(), $document->getText());
                    }
                    $tableData[] = ['type' => 'body', 'cells' => $rowData];
                }

                $tables[] = $tableData;
            }
        }
        return $tables;
    }

    /**
     * Helper method to extract text from layout
     */
    private function getTextFromLayout($layout, $fullText)
    {
        if (!$layout) {
            return '';
        }

        $textSegment = $layout->getTextAnchor()->getTextSegments()[0] ?? null;
        if (!$textSegment) {
            return '';
        }

        $startIndex = $textSegment->getStartIndex();
        $endIndex = $textSegment->getEndIndex();

        return substr($fullText, $startIndex, $endIndex - $startIndex);
    }

    public function textExists($document, $searchText)
    {
        $fullText = $document->getText();
        return str_contains($fullText, $searchText);
    }

    public function allTermsExist($document, string $text, array $terms)
    {
        $text_analysis = [];
        $lines_analysis = [];
        $full_analysis = [];
        $exists = [];
        $match = [];

        // Split text into lines
        $lines = explode("\n", $text);

        // === ANALYZE EACH TERM ===
        foreach ($terms as $term) {
            // Find all matches for this term
            $termMatches = Str::matchAll("/\$term/", $text);

            // Check if term exists
            $termExists = $this->textExists($document, $term);

            // Store results for this specific term
            $full_analysis[$term] = [
                'exists' => $termExists,
                'count' => $termMatches->count(),
                'matches' => $termMatches->toArray(), // Convert to array, not JSON
                'confidence' => $termExists ? 1.0 : 0.0
            ];

            // Also store in separate arrays if needed
            $exists[$term] = $termExists;
            $match[$term] = $termMatches->toArray();
        }

        // === ANALYZE EACH LINE ===
        foreach ($lines as $lineNumber => $line) {
            $lineData = [
                'line_number' => $lineNumber + 1,
                'content' => $line,
                'length' => strlen($line),
                'is_empty' => empty(trim($line)),
                'found_terms' => []
            ];

            // Check which terms appear in this line
            foreach ($terms as $term) {
                if (str_contains($line, $term)) {
                    $lineData['found_terms'][] = $term;
                }
            }

            // Only store lines that contain at least one term
            if (!empty($lineData['found_terms'])) {
                $lines_analysis[] = $lineData;
            }
        }

        // === TEXT ANALYSIS ===
        $text_analysis = [
            'total_lines' => count($lines),
            'non_empty_lines' => count(array_filter($lines, fn($l) => !empty(trim($l)))),
            'total_characters' => strlen($text),
            'word_count' => str_word_count($text),
            'terms_searched' => count($terms),
            'terms_found' => count(array_filter($exists)),
            'all_terms_exist' => !in_array(false, $exists, true)
        ];

        // === RETURN STRUCTURED RESULTS ===
        return [
            'summary' => $text_analysis,
            'term_analysis' => $full_analysis,
            'lines_with_terms' => $lines_analysis,
            'exists_map' => $exists,
            'match_map' => $match
        ];
    }

    public function __destruct()
    {
        $this->client->close();
    }
}
