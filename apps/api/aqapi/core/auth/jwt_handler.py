import os
import jwt
from typing import Optional
from uuid import UUID
from fastapi import HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends
from dotenv import load_dotenv

load_dotenv()

class JWTHandler:
    """JWTトークンの検証を行うハンドラー"""
    
    def __init__(self):
        """JWTハンドラーの初期化"""
        # SupabaseのJWT秘密鍵を環境変数から取得
        jwt_secret = os.getenv("SUPABASE_JWT_SECRET")
        if not jwt_secret:
            raise ValueError("SUPABASE_JWT_SECRET environment variable is required")
        self.jwt_secret: str = jwt_secret
        
        # JWTの発行者（Supabase）を設定
        self.issuer = "supabase"
        
        # Bearerトークンスキーマ
        self.security = HTTPBearer()

    def verify_token(self, token: str) -> dict:
        """JWTトークンを検証する
        
        :param str token: JWTトークン
        :return dict: デコードされたペイロード
        :raises HTTPException: トークンが無効な場合
        """
        try:
            # JWTトークンをデコード・検証
            payload = jwt.decode(
                token,
                self.jwt_secret,
                algorithms=["HS256"],
                issuer=self.issuer,
                options={"verify_exp": True}  # 有効期限をチェック
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="トークンの有効期限が切れています"
            )
        except jwt.InvalidTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="無効なトークンです"
            )

    def get_user_id_from_token(self, token: str) -> UUID:
        """JWTトークンからユーザーIDを取得する
        
        :param str token: JWTトークン
        :return UUID: ユーザーID
        :raises HTTPException: トークンが無効またはユーザーIDが取得できない場合
        """
        payload = self.verify_token(token)
        
        # Supabaseの場合、ユーザーIDは 'sub' フィールドに格納される
        user_id = payload.get('sub')
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="トークンにユーザーIDが含まれていません"
            )
        
        try:
            return UUID(user_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="無効なユーザーIDフォーマットです"
            )


# グローバルインスタンス
jwt_handler = JWTHandler()


def get_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())
) -> UUID:
    """認証されたユーザーのIDを取得する依存性注入関数
    
    :param HTTPAuthorizationCredentials credentials: Bearerトークン
    :return UUID: ユーザーID
    :raises HTTPException: 認証に失敗した場合
    """
    return jwt_handler.get_user_id_from_token(credentials.credentials)


def get_user_id_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False))
) -> Optional[UUID]:
    """オプショナルな認証のためのユーザーID取得関数
    
    :param Optional[HTTPAuthorizationCredentials] credentials: Bearerトークン（オプション）
    :return Optional[UUID]: ユーザーID（認証されていない場合はNone）
    """
    if not credentials:
        return None
    
    try:
        return jwt_handler.get_user_id_from_token(credentials.credentials)
    except HTTPException:
        return None
