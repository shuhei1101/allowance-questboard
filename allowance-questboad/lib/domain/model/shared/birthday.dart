/// 誕生日値オブジェクト
class Birthday {
  /// ### 制約
  /// - 現在日時より過去の日付であること
  Birthday(this.value) {
    if (value.isAfter(DateTime.now())) {
      throw ArgumentError.value(value, 'birthday', 'Future date is invalid');
    }
  }
  final DateTime value;
}
