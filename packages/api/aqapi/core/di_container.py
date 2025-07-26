from typing import TypeVar, Type, Dict, Any, Callable, Optional, cast, List

T = TypeVar('T')


class DIContainer:
    """DIコンテナクラス

    各機能で共通して使用する静的インスタンスを保持する用途
    RepositoryやDAOなど、特定の機能でしか使用しないインスタンスはメモリの観点から本クラスに登録しないこと
    """

    def __init__(self):
        self._container: Dict[Type, Any] = {}

    def register(self, type: Type[T], obj: T) -> None:
        """
        インスタンスを登録する
        
        :param Type[T] type: 登録する型
        :param T obj: 登録するインスタンス
        """
        self._container[type] = obj

    def get(self, type: Type[T]) -> T:
        """
        登録されたインスタンスを取得する
        
        :param Type[T] type: 取得する型
        :return T: インスタンス
        :raises KeyError: 型が登録されていない場合
        """
        if type in self._container:
            return cast(T, self._container[type])
        
        raise KeyError(f"型 {type} は登録されていません")

    def reset(self) -> None:
        """
        すべての登録をクリアする（単体テスト用）
        """
        self._container.clear()

di_container = DIContainer()
