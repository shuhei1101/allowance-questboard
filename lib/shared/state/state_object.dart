abstract class StateObject<T> {
  final T value;
  late String? errorMessage;

  StateObject(this.value) {
    errorMessage = validate(value);
  }

  bool get isValid => errorMessage == null;

  /// 継承先で定義：検証ロジック
  String? validate(T value);
}
