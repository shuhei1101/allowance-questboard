import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/presentation/login/state/login_state.dart';

void main() {
  group('LoginState', () {
    test('should have correct default values', () {
      // Arrange & Act
      const state = LoginState();

      // Assert
      expect(state.isLoading, false);
      expect(state.isFamilyMode, true);
      expect(state.email, '');
      expect(state.password, '');
      expect(state.errorMessage, null);
    });

    test('should create copy with updated values', () {
      // Arrange
      const initialState = LoginState();

      // Act
      final updatedState = initialState.copyWith(
        isLoading: true,
        isFamilyMode: false,
        email: 'test@example.com',
        password: 'password123',
        errorMessage: 'Test error',
      );

      // Assert
      expect(updatedState.isLoading, true);
      expect(updatedState.isFamilyMode, false);
      expect(updatedState.email, 'test@example.com');
      expect(updatedState.password, 'password123');
      expect(updatedState.errorMessage, 'Test error');
    });

    test('should toggle family mode correctly', () {
      // Arrange
      const initialState = LoginState(isFamilyMode: true);

      // Act
      final toggledState = initialState.copyWith(isFamilyMode: false);

      // Assert
      expect(initialState.isFamilyMode, true);
      expect(toggledState.isFamilyMode, false);
    });
  });
}