/// メールアドレスの形式かどうかを判定する
bool isMailAddress(String value) {
  return RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').hasMatch(value);
}
