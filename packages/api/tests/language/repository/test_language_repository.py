import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from typing import List

# DIコンテナとRedisCacherを先にインポートしてモックを登録
from aqapi.core.di_container import di_container
from aqapi.core.cache.redis_cacher import RedisCacher

# RedisCacherのモックを作成してDIコンテナに事前登録
mock_redis_cacher = MagicMock(spec=RedisCacher)
try:
    di_container.register(RedisCacher, mock_redis_cacher)
except Exception:
    # 既に登録されている場合は無視
    pass

from aqapi.language.repository.language_repository import LanguageRepository, LanguageRepositoryDependencies
from aqapi.language.dao.language_dao import LanguageDao
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.core.domain.value_object.value_validator import ValueValidateException


class TestLanguageRepository:
    
    @pytest.fixture(autouse=True)
    def setup_di_container(self) -> None:
        """DIコンテナにモックを登録"""
        # RedisCacherのモックを作成してDIコンテナに登録
        mock_redis_cacher = MagicMock(spec=RedisCacher)
        try:
            di_container.register(RedisCacher, mock_redis_cacher)
        except Exception:
            # 既に登録されている場合は無視
            pass
    
    @pytest.fixture
    def mock_language_dao(self) -> AsyncMock:
        return AsyncMock(spec=LanguageDao)
    
    @pytest.fixture
    def deps(self, mock_language_dao: AsyncMock) -> LanguageRepositoryDependencies:
        return LanguageRepositoryDependencies(language_dao=mock_language_dao)
    
    @pytest.fixture
    def language_repository(self, deps: LanguageRepositoryDependencies) -> LanguageRepository:
        return LanguageRepository(deps)
    
    class Test_find_all:
        
        @pytest.mark.asyncio
        async def test_言語エンティティを取得してLanguageTypeのEnumを更新すること(
            self, 
            language_repository: LanguageRepository,
            mock_language_dao: AsyncMock
        ) -> None:
            # 準備
            expected_entities: List[LanguagesEntity] = [
                LanguagesEntity(id=1, code="1", name="Japanese", is_active=True, sort_order=1),
                LanguagesEntity(id=2, code="2", name="English", is_active=True, sort_order=2),
            ]
            mock_language_dao.fetch_all = AsyncMock(return_value=expected_entities)
            
            # LanguageType.update_from_entitiesメソッドをパッチ
            with patch('aqapi.language.domain.language_type.LanguageType.update_from_entities') as mock_update:
                # 実行
                result = await language_repository.find_all()
                
                # 検証
                assert result is None  # 戻り値はNone
                mock_language_dao.fetch_all.assert_called_once()
                mock_update.assert_called_once_with(expected_entities)
        
        @pytest.mark.asyncio
        async def test_言語エンティティが空の場合も正常にEnumを更新すること(
            self, 
            language_repository: LanguageRepository,
            mock_language_dao: AsyncMock
        ) -> None:
            # 準備
            expected_entities: List[LanguagesEntity] = []
            mock_language_dao.fetch_all = AsyncMock(return_value=expected_entities)
            
            # LanguageType.update_from_entitiesメソッドをパッチ
            with patch('aqapi.language.domain.language_type.LanguageType.update_from_entities') as mock_update:
                # 実行
                result = await language_repository.find_all()
                
                # 検証
                assert result is None  # 戻り値はNone
                mock_language_dao.fetch_all.assert_called_once()
                mock_update.assert_called_once_with(expected_entities)
        
        @pytest.mark.asyncio
        async def test_DAOでエラーが発生した場合はエラーが伝播すること(
            self, 
            language_repository: LanguageRepository,
            mock_language_dao: AsyncMock
        ) -> None:
            # 準備
            expected_error = Exception("Database error")
            mock_language_dao.fetch_all = AsyncMock(side_effect=expected_error)
            
            # 実行・検証
            with pytest.raises(Exception) as exc_info:
                await language_repository.find_all()
            
            assert str(exc_info.value) == "Database error"
            mock_language_dao.fetch_all.assert_called_once()

        @pytest.mark.asyncio
        async def test_無効な言語コードを含むエンティティでバリデーションエラーが発生すること(
            self, 
            language_repository: LanguageRepository,
            mock_language_dao: AsyncMock
        ) -> None:
            # 準備
            invalid_entities: List[LanguagesEntity] = [
                LanguagesEntity(id=1, code="", name="Japanese", is_active=True, sort_order=1),  # 空の言語コード
            ]
            mock_language_dao.fetch_all = AsyncMock(return_value=invalid_entities)
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                await language_repository.find_all()
            
            # エラータイプを検証
            assert exc_info.value.error_type == "required"
            mock_language_dao.fetch_all.assert_called_once()

        @pytest.mark.asyncio
        async def test_非整数の言語コードを含むエンティティでバリデーションエラーが発生すること(
            self, 
            language_repository: LanguageRepository,
            mock_language_dao: AsyncMock
        ) -> None:
            # 準備
            invalid_entities: List[LanguagesEntity] = [
                LanguagesEntity(id=1, code="abc", name="Japanese", is_active=True, sort_order=1),  # 非整数の言語コード
            ]
            mock_language_dao.fetch_all = AsyncMock(return_value=invalid_entities)
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                await language_repository.find_all()
            
            # エラータイプを検証
            assert exc_info.value.error_type == "integer_format"
            mock_language_dao.fetch_all.assert_called_once()

        @pytest.mark.asyncio
        async def test_無効な言語名を含むエンティティでバリデーションエラーが発生すること(
            self, 
            language_repository: LanguageRepository,
            mock_language_dao: AsyncMock
        ) -> None:
            # 準備
            invalid_entities: List[LanguagesEntity] = [
                LanguagesEntity(id=1, code="1", name="", is_active=True, sort_order=1),  # 空の言語名
            ]
            mock_language_dao.fetch_all = AsyncMock(return_value=invalid_entities)
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                await language_repository.find_all()
            
            # エラータイプを検証
            assert exc_info.value.error_type == "required"
            mock_language_dao.fetch_all.assert_called_once()


if __name__ == "__main__":
    pytest.main([__file__])
