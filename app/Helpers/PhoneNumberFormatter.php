<?php

/**
 * Phone Number Formatter for Nigeria
 * Converts local format to international format
 */

namespace App\Helpers;

use Illuminate\Support\Str;

class PhoneNumberFormatter
{
      /**
       * Convert Nigerian phone number to international format
       *
       * @param string $phone Phone number in various formats
       * @param string $countryCode Default country code (default: 234 for Nigeria)
       * @return string Phone number in international format (+234...)
       */
      public static function toInternational(string $phone, string $countryCode = '234'): string
      {
            // Remove all non-numeric characters
            $phone = preg_replace('/[^0-9]/', '', $phone);

            // Remove leading zeros
            $phone = ltrim($phone, '0');

            // Remove country code if already present
            if (str_starts_with($phone, $countryCode)) {
                  $phone = substr($phone, strlen($countryCode));
            }

            // Add country code with +
            return '+' . $countryCode . $phone;
      }

      /**
       * Format for WhatsApp (without +)
       */
      public static function forWhatsApp(string $phone, string $countryCode = '234'): string
      {
            $formatted = self::toInternational($phone, $countryCode);
            return str_replace('+', '', $formatted);
      }

      /**
       * Validate Nigerian phone number
       */
      public static function isValidNigerian(string $phone): bool
      {
            $phone = preg_replace('/[^0-9]/', '', $phone);
            $phone = ltrim($phone, '0');

            // Remove country code if present
            if (str_starts_with($phone, '234')) {
                  $phone = substr($phone, 3);
            }

            // Nigerian numbers are 10 digits after removing leading 0
            // Valid prefixes: 70x, 80x, 81x, 90x, 91x, etc.
            return strlen($phone) === 10 && preg_match('/^[789][01]\d{8}$/', $phone);
      }

      /**
       * Format with spaces for display (e.g., +234 70 5984 9938)
       */
      public static function formatForDisplay(string $phone, string $countryCode = '234'): string
      {
            $international = self::toInternational($phone, $countryCode);

            // Remove + for formatting
            $digits = str_replace('+', '', $international);

            // Format: +234 70 5984 9938
            if (strlen($digits) === 13) { // 234 + 10 digits
                  return '+' . substr($digits, 0, 3) . ' ' .
                        substr($digits, 3, 2) . ' ' .
                        substr($digits, 5, 4) . ' ' .
                        substr($digits, 9, 4);
            }

            return $international;
      }

      /**
       * Batch convert multiple phone numbers
       */
      public static function convertBatch(array $phones, string $countryCode = '234'): array
      {
            return array_map(
                  fn($phone) => self::toInternational($phone, $countryCode),
                  $phones
            );
      }
}
