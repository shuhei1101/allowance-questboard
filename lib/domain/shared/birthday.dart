/// 誕生日値オブジェクト
class Birthday {
  Birthday(this.value) {
    if (value.isAfter(DateTime.now())) {
      // 誕生日が未来の日付の場合はエラー
      throw ArgumentError.value(value, 'birthday', 'Future date is invalid');
    }
  }
  final DateTime value;
}
