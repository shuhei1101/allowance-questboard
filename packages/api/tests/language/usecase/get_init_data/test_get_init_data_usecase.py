import pytest
from unittest.mock import AsyncMock
from typing import List

from aqapi.language.usecase.get_init_data.get_init_data_usecase import GetInitDataUsecase
from aqapi.language.usecase.get_init_data.get_init_data_command import GetInitDataCommand
from aqapi.language.usecase.get_init_data.get_init_data_result import GetInitDataResult
from aqapi.language.repository.language_repository import LanguageRepository
from aqapi.language.domain.language_type import LanguageType


class TestGetInitDataUsecase:
    """GetInitDataUsecaseのテストクラス"""

    @pytest.fixture
    def mock_language_repository(self) -> AsyncMock:
        return AsyncMock(spec=LanguageRepository)

    @pytest.fixture
    def get_init_data_usecase(self) -> GetInitDataUsecase:
        return GetInitDataUsecase()

    @pytest.fixture
    def command(self, mock_language_repository: AsyncMock) -> GetInitDataCommand:
        return GetInitDataCommand(language_repo=mock_language_repository)

    class Test_execute:
        """executeメソッドのテスト"""

        @pytest.mark.asyncio
        async def test_言語情報を取得してLanguageTypeを更新し結果を返すこと(
            self,
            get_init_data_usecase: GetInitDataUsecase,
            command: GetInitDataCommand,
            mock_language_repository: AsyncMock
        ) -> None:
            # 準備
            mock_language_repository.find_all = AsyncMock(return_value=None)
            
            # 実行
            result = await get_init_data_usecase.execute(command)
            
            # 検証
            assert isinstance(result, GetInitDataResult)
            assert isinstance(result.languages, list)
            # LanguageTypeの実際の値を使用（JAPANESE, ENGLISHが存在することを確認）
            assert len(result.languages) >= 2  # 最低限JAPANESEとENGLISHは存在する
            assert LanguageType.JAPANESE in result.languages
            assert LanguageType.ENGLISH in result.languages
            mock_language_repository.find_all.assert_called_once()

        @pytest.mark.asyncio
        async def test_言語リポジトリでエラーが発生した場合はエラーが伝播すること(
            self,
            get_init_data_usecase: GetInitDataUsecase,
            command: GetInitDataCommand,
            mock_language_repository: AsyncMock
        ) -> None:
            # 準備
            expected_error = Exception("Repository error")
            mock_language_repository.find_all = AsyncMock(side_effect=expected_error)
            
            # 実行・検証
            with pytest.raises(Exception) as exc_info:
                await get_init_data_usecase.execute(command)
            
            assert str(exc_info.value) == "Repository error"
            mock_language_repository.find_all.assert_called_once()

        @pytest.mark.asyncio
        async def test_正常にランナブルインタフェースが実装されていること(
            self,
            get_init_data_usecase: GetInitDataUsecase,
            command: GetInitDataCommand,
            mock_language_repository: AsyncMock
        ) -> None:
            # 準備
            mock_language_repository.find_all = AsyncMock(return_value=None)
            
            # 実行
            result = await get_init_data_usecase.execute(command)
            
            # 検証
            assert isinstance(result, GetInitDataResult)
            assert hasattr(result, 'languages')
            assert isinstance(result.languages, list)
            mock_language_repository.find_all.assert_called_once()


if __name__ == "__main__":
    pytest.main([__file__])
