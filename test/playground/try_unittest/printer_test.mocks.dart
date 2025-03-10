// Mocks generated by Mockito 5.4.5 from annotations
// in allowance_questboard/test/playground/try_unittest/printer_test.dart.
// Do not manually edit this file.

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:allowance_questboard/playground/try_unittest/calculator.dart'
    as _i2;
import 'package:mockito/mockito.dart' as _i1;

// ignore_for_file: type=lint
// ignore_for_file: avoid_redundant_argument_values
// ignore_for_file: avoid_setters_without_getters
// ignore_for_file: comment_references
// ignore_for_file: deprecated_member_use
// ignore_for_file: deprecated_member_use_from_same_package
// ignore_for_file: implementation_imports
// ignore_for_file: invalid_use_of_visible_for_testing_member
// ignore_for_file: must_be_immutable
// ignore_for_file: prefer_const_constructors
// ignore_for_file: unnecessary_parenthesis
// ignore_for_file: camel_case_types
// ignore_for_file: subtype_of_sealed_class

/// A class which mocks [Calculator].
///
/// See the documentation for Mockito's code generation for more information.
class MockCalculator extends _i1.Mock implements _i2.Calculator {
  MockCalculator() {
    _i1.throwOnMissingStub(this);
  }

  @override
  int add(int? a, int? b) =>
      (super.noSuchMethod(Invocation.method(#add, [a, b]), returnValue: 0)
          as int);

  @override
  int sub(int? a, int? b) =>
      (super.noSuchMethod(Invocation.method(#sub, [a, b]), returnValue: 0)
          as int);

  @override
  int mul(int? a, int? b) =>
      (super.noSuchMethod(Invocation.method(#mul, [a, b]), returnValue: 0)
          as int);

  @override
  double div(int? a, int? b) =>
      (super.noSuchMethod(Invocation.method(#div, [a, b]), returnValue: 0.0)
          as double);

  @override
  int addWithAPI(int? a) =>
      (super.noSuchMethod(Invocation.method(#addWithAPI, [a]), returnValue: 0)
          as int);
}
