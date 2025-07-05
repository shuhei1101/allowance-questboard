import 'package:allowance_questboard/shared/util/validator.dart';

/// メールアドレス値オブジェクト
class MailAddress {
  /// ### 制約
  /// - メールアドレスの形式であること
  MailAddress(this.value) {
    if (isMailAddress(value)) {
      throw ArgumentError.value(value, 'value', 'Invalid mail address');
    }
  }
  final String value;
}
