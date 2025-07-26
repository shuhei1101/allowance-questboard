from uuid import UUID
from fastapi import Depends, Header
from sqlalchemy.orm import Session
from aqapi.core.cache.redis_client import RedisClient
from aqapi.core.di_container import di_container
from aqapi.core.config.db_config import db_config
from aqapi.core.auth.jwt_handler import get_user_id
from aqapi.core.constants.error_messages import error_messages
from aqapi.language.domain.language_type import LanguageType
from aqapi.language.domain.value_object.language_id import LanguageId

class CommonDependencies:
    """ログイン時の共通の依存関係をまとめたクラス"""
    
    def __init__(
        self,
        user_id: UUID = Depends(get_user_id),
        session: Session = Depends(db_config.get_session),
        raw_language_id: int = Header(default=1, alias="LanguageId")
    ):
        self.user_id = user_id
        self.session = session
        language_type = LanguageType.from_id(LanguageId(raw_language_id))
        
        error_messages.set_language_type(language_type)

        # DIコンテナの設定
        di_container.register(RedisClient, RedisClient())
