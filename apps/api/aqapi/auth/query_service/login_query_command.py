from dataclasses import dataclass
from uuid import UUID
from aqapi.core.query_service.base_query_service import BaseQueryCommand


@dataclass(frozen=True)
class LoginQueryCommand(BaseQueryCommand):
    """ログインクエリコマンド
    
    :param UUID user_id: ユーザーID
    """
    user_id: UUID
