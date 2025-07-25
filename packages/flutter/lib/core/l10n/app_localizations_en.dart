// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Allowance Quest Board';

  @override
  String get userIdRequired => 'User ID is required.';

  @override
  String get parentIdIsInvalid => ' Invalid parent ID specified.';

  @override
  String get memberIdIsInvalid => 'Invalid member ID specified.';

  @override
  String get emailInvalid => 'Email address format is invalid.';

  @override
  String maxLength(Object max) {
    return 'Must be at most $max characters long.';
  }

  @override
  String minLength(Object min) {
    return 'Must be at least $min characters long.';
  }

  @override
  String get required => 'Value is required.';

  @override
  String get positiveInteger => 'Must be a positive integer.';

  @override
  String get loginSuccess => 'Login successful';

  @override
  String loginError(Object message) {
    return 'Login error: $message';
  }

  @override
  String get signUpComplete => 'Sign up complete';

  @override
  String get familyName => 'Family Name';

  @override
  String get loginAsParent => 'Login as Parent';

  @override
  String get loginAsChild => 'Login as Child';

  @override
  String get cancel => 'Cancel';

  @override
  String get enterYourEmail => 'Enter your email';

  @override
  String get enterYourPassword => 'Enter your password';

  @override
  String get signIn => 'Sign in';

  @override
  String get signUp => 'Sign up';

  @override
  String get forgotYourPassword => 'Forgot your password?';

  @override
  String get dontHaveAnAccount => 'Don\'t have an account?';

  @override
  String get alreadyHaveAnAccount => 'Already have an account?';

  @override
  String get createNewFamily => 'Create new family';

  @override
  String get email => 'Email';

  @override
  String get password => 'Password';

  @override
  String get validEmailError => 'Please enter a valid email address';

  @override
  String get passwordLengthError =>
      'Please enter a password that is at least 6 characters long';

  @override
  String get forgotPassword => 'Forgot your password?';

  @override
  String get dontHaveAccount => 'Don\'t have an account? Sign up';

  @override
  String get haveAccount => 'Already have an account? Sign in';

  @override
  String get sendPasswordReset => 'Send password reset email';

  @override
  String get passwordResetSent => 'Password reset email has been sent';

  @override
  String get backToSignIn => 'Back to sign in';

  @override
  String get unexpectedError => 'An unexpected error occurred';

  @override
  String get requiredFieldError => 'This field is required';

  @override
  String get confirmPasswordError => 'Passwords do not match';

  @override
  String get confirmPassword => 'Confirm Password';
}
