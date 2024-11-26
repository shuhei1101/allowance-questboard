class Birthday {
  final DateTime value;
  Birthday(this.value) {
    final today = DateTime.now();
    if (value.isAfter(today)) {
      throw ArgumentError('誕生日は未来の日付に設定できません。');
    }
  }
}
