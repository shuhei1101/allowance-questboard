import 'package:allowance_questboard/shared/state/state_object.dart';

class StateObjectBuilder {
  static S build<T, S extends StateObject<T>>({
    required T value,
    required bool Function(T) validate,
    required String errorMessageContent,
    required S Function(T, String?) constructor,
  }) {
    final error = validate(value) ? null : errorMessageContent;
    return constructor(value, error);
  }
}
