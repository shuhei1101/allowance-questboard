class MemberName {
  MemberName(this.value) {
    if (value == "") {
      throw ArgumentError('メンバ名は空白にできません。');
    }
  }

  late String value;
}
