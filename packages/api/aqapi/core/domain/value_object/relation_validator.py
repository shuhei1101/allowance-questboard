from typing import Any, Union, Optional
from datetime import datetime, date
from aqapi.core.constants.error_messages import error_messages

class RelationValidateException(Exception):
    """カスタム例外クラス"""
    def __init__(self, error_type: str, message: str):
        super().__init__(message)
        self.error_type = error_type
        self.message = message

class RelationValidator:
    """関連バリデーションを提供するクラス（BaseModelで使用）"""
    
    def validate_confirmation(self, value: str, confirmation_value: str, field_name: str = "値", option_message: Optional[str] = None) -> None:
        """確認一致チェック（パスワード確認など）"""
        if value != confirmation_value:
            raise RelationValidateException(
                error_type="confirmation_mismatch",
                message=error_messages.confirmation_mismatch(field_name) if option_message is None else option_message
            )

    def validate_date_range(self, start_date: Union[datetime, date], end_date: Union[datetime, date], 
                           start_field_name: str = "開始日", end_field_name: str = "終了日", 
                           option_message: Optional[str] = None) -> None:
        """日付範囲チェック（開始日 <= 終了日）"""
        if start_date > end_date:
            raise RelationValidateException(
                error_type="date_range_invalid",
                message=error_messages.date_range_invalid(start_field_name, end_field_name) if option_message is None else option_message
            )
    
    def validate_datetime_range(self, start_datetime: datetime, end_datetime: datetime,
                               start_field_name: str = "開始日時", end_field_name: str = "終了日時", 
                               option_message: Optional[str] = None) -> None:
        """日時範囲チェック（開始日時 <= 終了日時）"""
        if start_datetime > end_datetime:
            raise RelationValidateException(
                error_type="datetime_range_invalid",
                message=error_messages.datetime_range_invalid(start_field_name, end_field_name) if option_message is None else option_message
            )
    
    def validate_greater_than(self, value: Union[int, float], compare_value: Union[int, float],
                             value_field_name: str = "値", compare_field_name: str = "比較値", 
                             option_message: Optional[str] = None) -> None:
        """より大きい値チェック"""
        if value <= compare_value:
            raise RelationValidateException(
                error_type="greater_than_invalid",
                message=error_messages.greater_than_invalid(value_field_name, compare_field_name) if option_message is None else option_message
            )
    
    def validate_greater_than_or_equal(self, value: Union[int, float], compare_value: Union[int, float],
                                      value_field_name: str = "値", compare_field_name: str = "比較値", 
                                      option_message: Optional[str] = None) -> None:
        """以上チェック"""
        if value < compare_value:
            raise RelationValidateException(
                error_type="greater_than_or_equal_invalid",
                message=error_messages.greater_than_or_equal_invalid(value_field_name, compare_field_name) if option_message is None else option_message
            )
    
    def validate_less_than(self, value: Union[int, float], compare_value: Union[int, float],
                          value_field_name: str = "値", compare_field_name: str = "比較値", 
                          option_message: Optional[str] = None) -> None:
        """より小さい値チェック"""
        if value >= compare_value:
            raise RelationValidateException(
                error_type="less_than_invalid",
                message=error_messages.less_than_invalid(value_field_name, compare_field_name) if option_message is None else option_message
            )
    
    def validate_less_than_or_equal(self, value: Union[int, float], compare_value: Union[int, float],
                                   value_field_name: str = "値", compare_field_name: str = "比較値", 
                                   option_message: Optional[str] = None) -> None:
        """以下チェック"""
        if value > compare_value:
            raise RelationValidateException(
                error_type="less_than_or_equal_invalid",
                message=error_messages.less_than_or_equal_invalid(value_field_name, compare_field_name) if option_message is None else option_message
            )
    
    def validate_not_equal(self, value: Any, compare_value: Any,
                          value_field_name: str = "値", compare_field_name: str = "比較値", 
                          option_message: Optional[str] = None) -> None:
        """不一致チェック"""
        if value == compare_value:
            raise RelationValidateException(
                error_type="not_equal_invalid",
                message=error_messages.not_equal_invalid(value_field_name, compare_field_name) if option_message is None else option_message
            )
    
    def validate_age_consistency(self, birth_date: Union[datetime, date], 
                                age: int, field_name: str = "年齢", 
                                option_message: Optional[str] = None) -> None:
        """年齢と生年月日の整合性チェック"""
        today = datetime.now().date() if isinstance(birth_date, datetime) else date.today()
        if isinstance(birth_date, datetime):
            birth_date = birth_date.date()
        
        calculated_age = today.year - birth_date.year
        if today < birth_date.replace(year=today.year):
            calculated_age -= 1
        
        if calculated_age != age:
            raise RelationValidateException(
                error_type="age_consistency_invalid",
                message=error_messages.age_consistency_invalid(field_name) if option_message is None else option_message
            )
    
    def validate_dependency(self, dependent_value: Any, required_value: Any,
                           dependent_field_name: str = "依存フィールド", 
                           required_field_name: str = "必須フィールド", 
                           option_message: Optional[str] = None) -> None:
        """依存関係チェック（Aが設定されている場合、Bも必須）"""
        if dependent_value is not None and required_value is None:
            raise RelationValidateException(
                error_type="dependency_invalid",
                message=error_messages.dependency_invalid(dependent_field_name, required_field_name) if option_message is None else option_message
            )
    
    def validate_mutual_exclusion(self, value1: Any, value2: Any,
                                 field1_name: str = "フィールド1", field2_name: str = "フィールド2", 
                                 option_message: Optional[str] = None) -> None:
        """相互排他チェック（どちらか一方のみ設定可能）"""
        if value1 is not None and value2 is not None:
            raise RelationValidateException(
                error_type="mutual_exclusion_invalid",
                message=error_messages.mutual_exclusion_invalid(field1_name, field2_name) if option_message is None else option_message
            )
    
    def validate_quantity_consistency(self, total: Union[int, float], *parts: Union[int, float],
                                     total_field_name: str = "合計", part_field_names: str = "内訳", 
                                     option_message: Optional[str] = None) -> None:
        """数量の整合性チェック（合計と内訳の一致）"""
        calculated_total = sum(parts)
        if abs(total - calculated_total) > 0.01:  # 浮動小数点の誤差を考慮
            raise RelationValidateException(
                error_type="quantity_consistency_invalid",
                message=error_messages.quantity_consistency_invalid(total_field_name, part_field_names) if option_message is None else option_message
            )
