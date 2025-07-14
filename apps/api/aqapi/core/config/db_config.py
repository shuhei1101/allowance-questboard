import os
from dotenv import load_dotenv
from sqlalchemy import Column, DateTime, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
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
            f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        )

        self.engine = create_engine(DATABASE_URL)
        self.SessionLocal = sessionmaker(
            bind=self.engine, autocommit=False, autoflush=False
        )
        self.Base = declarative_base()
        self._reflect_auth_schema(self.Base, self.engine)

    def _reflect_auth_schema(self, base, engine):
        """auth.usersテーブルのメタデータを反映(外部キー参照のため)"""
        try:
            # 記事の方法: MetaData.reflect()を使用して既存のauth.usersテーブルを認識させる
            base.metadata.reflect(bind=engine, schema="auth", only=["users"])
        except Exception as e:
            print(f"auth.usersテーブルの反映でエラー: {e}")
            return

    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

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
    
DB_CONF = DBConfig()
