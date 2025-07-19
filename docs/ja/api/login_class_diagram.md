# 🔐 Login API - クラス図

## 概要
Login APIエンドポイントの構成図です。

## クラス図

```mermaid
classDiagram
    class main.py {
        app: FastAPI
    }
    
    class login.py {
        router: APIRouter
        login(user_id: UUID, session: Session): LoginResponse
    }
    
    class LoginResponse {
        item: AuthInfoDto
        from_auth_info(auth_info: AuthInfo): LoginResponse
    }
    
    class AuthInfoDto {
        user_id: str
        parent_id: Optional[int]
        member_id: Optional[int]
        from_auth_info(auth_info: AuthInfo): AuthInfoDto
    }
    
    class LoginUsecase {
        execute(user_id: UUID): AuthInfo
    }
    
    class AuthInfo {
        user_id: UUID
        parent_id: Optional[int]
        family_member_id: Optional[int]
    }
    
    class get_user_id {
        <<dependency>>
    }
    
    class DB_CONF {
        get_session(): Session
    }

    %% 関係性
    main.py --> login.py : ルーティング定義
    login.py --> LoginResponse : 戻り値
    login.py --> LoginUsecase : 使用
    login.py --> get_user_id : 依存性注入
    login.py --> DB_CONF : 依存性注入
    
    LoginResponse --> AuthInfoDto : 保持
    LoginUsecase --> AuthInfo : 戻り値
    
    AuthInfoDto --> AuthInfo : from_auth_info
    LoginResponse --> AuthInfo : from_auth_info
```

## ファイル構成

### `/auth/api/v1/login.py`
- **役割**: ログインエンドポイント関数の定義
- **責務**: 
  - JWTトークンからユーザーIDを取得
  - LoginUsecaseの呼び出し
  - HTTPレスポンスの返却

### `/auth/api/v1/login_response.py`  
- **役割**: ログインレスポンスクラスの定義
- **責務**:
  - APIレスポンス形式の定義
  - ドメインモデルからDTOへの変換

## 処理フロー

1. **リクエスト受信**: JWTトークン付きでPOST /loginにアクセス
2. **認証**: get_user_idでJWTトークンからユーザーIDを取得
3. **業務処理**: LoginUsecaseでユーザー情報を取得
4. **レスポンス生成**: AuthInfoからLoginResponseを生成
5. **レスポンス返却**: JSONでクライアントに返却
