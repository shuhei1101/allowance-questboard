from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Generic, TypeVar

@dataclass(frozen=True)
class BaseQueryCommand(ABC):
    """クエリコマンドの基底クラス"""
    pass

CommandType = TypeVar("CommandType", bound=BaseQueryCommand)

class BaseQueryService(ABC, Generic[CommandType]):
    """クエリサービスの基底クラス"""
    
    def __init__(self, session):
        """コンストラクタ

        :param session: SQLAlchemyのセッション
        """
        self.session = session

    @abstractmethod
    def execute(self, command: CommandType) -> Any:
        """クエリを実行するメソッド
        
        :param command: クエリコマンド
        :return: クエリ実行結果
        """
        raise NotImplementedError("Subclasses must implement this method.")
