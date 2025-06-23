import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/util/validator.dart';

void main() {
  group('Validator', () {
    group('isMailAddress', () {
      test('should return true for valid email addresses', () {
        // Arrange
        const validEmails = [
          'test@example.com',
          'user.name@domain.co.jp',
          'user+tag@domain.org',
          'user123@domain.net',
          'a@b.co',
          'test.email+tag@domain.com',
        ];

        // Act & Assert
        for (final email in validEmails) {
          expect(isMailAddress(email), true, reason: 'Email: $email should be valid');
        }
      });

      test('should return false for invalid email addresses', () {
        // Arrange
        const invalidEmails = [
          '',
          'test',
          'test@',
          '@domain.com',
          'test@domain',
          'test.domain.com',
          'test@domain.',
          'test@.domain.com',
          'test..test@domain.com',
          'test@domain..com',
          'test@',
          '@',
          'test@domain@com',
          'test space@domain.com',
        ];

        // Act & Assert
        for (final email in invalidEmails) {
          expect(isMailAddress(email), false, reason: 'Email: $email should be invalid');
        }
      });

      test('should handle edge cases', () {
        // Act & Assert
        expect(isMailAddress('a@b.c'), true);
        expect(isMailAddress('test@domain.a'), true);
        expect(isMailAddress('test@domain.abc'), true);
        expect(isMailAddress('test@domain.abcd'), true);
      });
    });
  });
}