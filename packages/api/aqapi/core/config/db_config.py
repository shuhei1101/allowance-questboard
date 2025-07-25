import os
from dotenv import load_dotenv
from sqlalchemy import Column, DateTime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

load_dotenv()

class DBConfig:
    def __init__(self):
        """DB_CONFIGの初期化"""
        print("DBConfigの初期化を開始します...")

        DB_USER = os.getenv("DB_USER")
        DB_PASSWORD = os.getenv("DB_PASSWORD")
        DB_HOST = os.getenv("DB_HOST")
        DB_PORT = os.getenv("DB_PORT")
        DB_NAME = os.getenv("DB_NAME")

        DATABASE_URL = (
            f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        )

        self.engine = create_async_engine(DATABASE_URL)
        self.SessionLocal = async_sessionmaker(
            bind=self.engine,
            autocommit=False, 
            autoflush=False
        )
        self.Base = declarative_base()
        # 非同期初期化は別メソッドで行う

    async def initialize_async(self):
        """非同期初期化（アプリケーション起動時に呼び出す）"""
        await self._reflect_auth_schema(self.Base, self.engine)

    async def _reflect_auth_schema(self, base, engine):
        """auth.usersテーブルのメタデータを反映(外部キー参照のため)"""
        try:
            # 記事の方法: MetaData.reflect()を使用して既存のauth.usersテーブルを認識させる
            async with engine.begin() as conn:
                await conn.run_sync(base.metadata.reflect, schema="auth", only=["users"])
        except Exception as e:
            print(f"auth.usersテーブルの反映でエラー: {e}")
            return

    async def get_session(self):
        async with self.SessionLocal() as session:
            yield session

    def import_all_entities(self):
        """すべてのEntityクラスをインポートして初期化"""
        import importlib
        import glob
        import os

        # 各Entityモジュールを動的にインポート
        base_path = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # aqapi/ディレクトリ
        entity_pattern = os.path.join(base_path, "*", "entity", "*.py")
        entity_files = glob.glob(entity_pattern)

        imported_modules = []

        for entity_file in entity_files:
            # __init__.py は除外
            if entity_file.endswith("__init__.py"):
                continue

            # ファイルパスからモジュール名を構築
            # 例: /path/to/aqapi/api/v1/child/entity/children_entity.py
            # -> aqapi.api.v1.child.entity.children_entity
            relative_path = os.path.relpath(entity_file, base_path)
            module_path = relative_path.replace(os.path.sep, ".").replace(".py", "")
            full_module_name = f"aqapi.{module_path}"

            try:
                # モジュールを動的インポート
                module = importlib.import_module(full_module_name)
                imported_modules.append(full_module_name)
                print(f"✓ インポート成功: {full_module_name}")
            except Exception as e:
                print(f"✗ インポートエラー {full_module_name}: {e}")
                raise

        print(
            f"すべてのEntityクラスの初期化が完了しました (成功: {len(imported_modules)}件)"
        )
        return True
    
db_config = DBConfig()
