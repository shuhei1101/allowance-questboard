from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from aqapi.core.config.db_config import DB_CONF
from aqapi.language.query_service.fetch_init_data_query import FetchInitDataQuery
from aqapi.language.query_service.fetch_init_data_query_command import FetchInitDataQueryCommand
from aqapi.language.api.v1.init_response import InitResponse

router = APIRouter()


@router.get("/init", response_model=InitResponse)
async def init(
    session: Session = Depends(DB_CONF.get_session)
):
    """アプリ初期化時に必要なデータを取得する
    
    現在は言語情報のみを返します。
    
    :param Session session: データベースセッション
    :return InitResponse: アプリ初期化レスポンス
    """
    query_service = FetchInitDataQuery(session)
    command = FetchInitDataQueryCommand()
    query_result = query_service.execute(command)
    
    return InitResponse.from_query_result(query_result)
