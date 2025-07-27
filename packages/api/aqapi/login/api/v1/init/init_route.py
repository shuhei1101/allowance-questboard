from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from aqapi.core.config.db_config import db_config
from aqapi.language.dao.language_dao import LanguageDao
from aqapi.language.repository.language_repository import LanguageRepository, LanguageRepositoryDependencies
from aqapi.language.usecase.get_init_data.get_init_data_usecase import GetInitDataUsecase
from aqapi.language.usecase.get_init_data.get_init_data_command import GetInitDataCommand
from aqapi.login.api.v1.init.init_response import InitResponse

router = APIRouter()


@router.get("/init", response_model=InitResponse)
async def init(
    session: AsyncSession = Depends(db_config.get_session)
):
    """アプリ初期化時に必要なデータを取得する
    
    現在は言語情報のみを返します。
    
    :param AsyncSession session: データベースセッション
    :return InitResponse: アプリ初期化レスポンス
    """
    usecase = GetInitDataUsecase()
    command = GetInitDataCommand(
        language_repo=LanguageRepository(
            deps=LanguageRepositoryDependencies(
                language_dao=LanguageDao(session)
            )
        )
    )
    result = await usecase.execute(command)
    
    return InitResponse.from_result(result)
