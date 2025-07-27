from typing import Optional
from pydantic.dataclasses import dataclass
from aqapi.login.domain.auth_info import AuthInfo


@dataclass
class AuthInfoDto:
    """認証情報Dto
    
    :param str user_id: ユーザーID
    :param Optional[int] parent_id: 親ID
    :param Optional[int] member_id: ファミリーメンバーID
    """
    user_id: str
    parent_id: Optional[int] = None
    member_id: Optional[int] = None

    @classmethod
    def from_auth_info(cls, auth_info: AuthInfo) -> "AuthInfoDto":
        """認証情報ドメインモデルからDtoを作成

        :param AuthInfo auth_info: 認証情報ドメインモデル
        :return AuthInfoDto: Dto
        """
        return cls(
            user_id=str(auth_info.user_id),
            parent_id=auth_info.parent_id,
            member_id=auth_info.family_member_id
        )

    @classmethod
    def from_auth_info_model(cls, auth_info_model) -> "AuthInfoDto":
        """認証情報モデルからDtoを作成

        :param auth_info_model: 認証情報モデル（AuthInfoModel）
        :return AuthInfoDto: Dto
        """
        return cls(
            user_id=str(auth_info_model.user_id),
            parent_id=auth_info_model.parent_id,
            member_id=auth_info_model.family_member_id
        )


@dataclass
class LoginResponse:
    """ログインレスポンス
    
    :param AuthInfoDto item: 認証情報
    """
    item: AuthInfoDto

    @classmethod
    def from_auth_info(cls, auth_info: AuthInfo) -> "LoginResponse":
        """認証情報ドメインモデルからレスポンスモデルを作成

        :param AuthInfo auth_info: 認証情報ドメインモデル
        :return LoginResponse: レスポンスモデル
        """
        return cls(
            item=AuthInfoDto.from_auth_info(auth_info)
        )

    @classmethod
    def from_query_result(cls, query_result) -> "LoginResponse":
        """クエリ結果からレスポンスモデルを作成

        :param query_result: ログインクエリ結果（LoginQueryResult）
        :return LoginResponse: レスポンスモデル
        """
        return cls(
            item=AuthInfoDto.from_auth_info_model(query_result.item)
        )
