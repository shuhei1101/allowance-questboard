from dataclasses import dataclass
from typing import Optional
from uuid import UUID


@dataclass
class AuthInfo:
    """認証情報ドメインモデル
    
    ユーザーIDに基づいて取得される認証関連の情報を表すドメインモデル
    """
    
    user_id: UUID
    """ユーザーID（Supabase認証のユーザーID）"""
    
    family_member_id: int
    """家族メンバーID"""
    
    family_id: int
    """家族ID"""
    
    parent_id: Optional[int] = None
    """親ID（親の場合のみ設定される）"""
    
    child_id: Optional[int] = None
    """子供ID（子供の場合のみ設定される）"""
    
    def is_parent(self) -> bool:
        """親かどうかを判定する
        
        :return bool: 親の場合True、そうでなければFalse
        """
        return self.parent_id is not None
    
    def is_child(self) -> bool:
        """子供かどうかを判定する
        
        :return bool: 子供の場合True、そうでなければFalse
        """
        return self.child_id is not None
    
    def get_role_id(self) -> int:
        """ロール固有のIDを取得する
        
        親の場合は親ID、子供の場合は子供IDを返す
        
        :return int: ロール固有のID
        :raises ValueError: 親でも子供でもない場合
        """
        if self.is_parent() and self.parent_id is not None:
            return self.parent_id
        elif self.is_child() and self.child_id is not None:
            return self.child_id
        else:
            raise ValueError("ユーザーは親でも子供でもありません")
