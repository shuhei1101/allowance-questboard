import pytest
import sys
from typing import List
from unittest.mock import AsyncMock, MagicMock, patch
from sqlalchemy.ext.asyncio import AsyncSession

# DIコンテナとRedisClientのモックを事前に設定
mock_redis_client = MagicMock()
mock_redis_client.cache = lambda key, ttl=None: lambda func: func
mock_redis_client.evict = lambda *keys: lambda func: func

mock_di_container = MagicMock()
mock_di_container.get.return_value = mock_redis_client

# モジュールをパッチしてからインポート
sys.modules['aqapi.core.di_container'] = MagicMock(di_container=mock_di_container)

from aqapi.language.dao.language_dao import LanguageDao
from aqapi.language.entity.languages_entity import LanguagesEntity


class TestLanguageDao:
    
    @pytest.fixture
    def mock_session(self) -> AsyncMock:
        return AsyncMock(spec=AsyncSession)
    
    @pytest.fixture
    def language_dao(self, mock_session: AsyncMock) -> LanguageDao:
        return LanguageDao(mock_session)
    
    class Test_entity_class:
        
        def test_エンティティクラスを返すこと(self, language_dao: LanguageDao) -> None:
            # 実行
            result = language_dao.entity_class
            
            # 検証
            assert result == LanguagesEntity # pyright: ignore[reportOperatorIssue]
    
    class Test_fetch_all:
        
        @pytest.mark.asyncio
        async def test_全ての言語エンティティを取得できること(self, language_dao: LanguageDao, mock_session: AsyncMock) -> None:
            # 準備
            expected_entities: List[LanguagesEntity] = [
                LanguagesEntity(id=1, code="ja", name="Japanese", is_active=True, sort_order=1),
                LanguagesEntity(id=2, code="en", name="English", is_active=True, sort_order=2),
            ]
            
            # モックの設定
            mock_result = MagicMock()
            mock_result.scalars.return_value.all.return_value = expected_entities
            mock_session.execute.return_value = mock_result
            
            # 実行
            result = await language_dao.fetch_all()
            
            # 検証
            assert result == expected_entities
            assert mock_session.execute.called
        
        @pytest.mark.asyncio
        async def test_言語が存在しない場合は空リストを返すこと(self, language_dao: LanguageDao, mock_session: AsyncMock) -> None:
            # 準備
            mock_result = MagicMock()
            mock_result.scalars.return_value.all.return_value = []
            mock_session.execute.return_value = mock_result
            
            # 実行
            result = await language_dao.fetch_all()
            
            # 検証
            assert result == []
            assert mock_session.execute.called
