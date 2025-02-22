import 'package:allowance_questboard/util/validator.dart';

/// メールアドレス値オブジェクト
///
/// ### 制約
/// - メールアドレスの形式であること
class MailAddress {
  MailAddress(this.value) {
    if (isMailAddress(value)) {
      throw ArgumentError.value(value, 'value', 'Invalid mail address');
    }
  }
  final String value;
}
