import 'package:allowance_questboard/core/state/base_state_object.dart';

/// ユーザー名のバリデーション例
class UserNameState extends BaseStateObject<String> {
  UserNameState(super.value);

  @override
  void validate() {
    // 必須チェック
    validateRequired(value, 'ユーザー名は必須です');
    
    // 文字数チェック（2文字以上）
    validateMinLength(value, 2, 'ユーザー名は2文字以上で入力してください');
    
    // 文字数チェック（20文字以下）
    validateMaxLength(value, 20, 'ユーザー名は20文字以下で入力してください');
  }
}

/// 年齢のバリデーション例
class AgeState extends BaseStateObject<int> {
  AgeState(super.value);

  @override
  void validate() {
    // 正の整数チェック
    validatePositiveInteger(value, '年齢は正の整数で入力してください');
    
    // 数値範囲チェック（1歳以上120歳以下）
    validateNumberRange(value, 1, 120, '年齢は1歳以上120歳以下で入力してください');
  }
}

/// お小遣い金額のバリデーション例
class AllowanceAmountState extends BaseStateObject<int> {
  AllowanceAmountState(super.value);

  @override
  void validate() {
    // 必須チェック
    validateRequired(value, 'お小遣い金額は必須です');
    
    // 正の整数チェック
    validatePositiveInteger(value, 'お小遣い金額は正の整数で入力してください');
    
    // 数値範囲チェック（1円以上100000円以下）
    validateNumberRange(value, 1, 100000, 'お小遣い金額は1円以上100,000円以下で入力してください');
  }
}
