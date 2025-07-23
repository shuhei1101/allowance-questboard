from sqlalchemy.ext.asyncio import AsyncSession
from aqapi.language.usecase.get_init_data_command import GetInitDataCommand
from aqapi.language.usecase.get_init_data_result import GetInitDataResult
from aqapi.language.repository.language_repository import LanguageRepository
from aqapi.language.domain.language_type import LanguageType


class GetInitDataUsecase:
    """アプリ初期化データ取得ユースケース"""

    async def execute(self, cmd: GetInitDataCommand) -> GetInitDataResult:
        """アプリ初期化データを取得する
        
        :param GetInitDataCommand command: 実行コマンド
        :return GetInitDataResult: 初期化データ結果
        """
        # 言語情報を取得してLanguageTypeのEnumを更新
        await cmd.language_repo.find_all()
        
        # 更新されたLanguageTypeの全ての値を取得
        languages = list(LanguageType.__members__.values())
        
        return GetInitDataResult(languages=languages)
