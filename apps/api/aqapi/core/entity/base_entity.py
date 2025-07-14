from abc import abstractmethod
from datetime import datetime
from typing import List
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF


class BaseEntity(DB_CONF.Base):
    """全エンティティの基底クラス"""

    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    version: Mapped[int] = mapped_column(Integer, nullable=False, default=1, comment="バージョン")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="作成日時")
    created_by: Mapped[int] = mapped_column(
        ForeignKey("family_members.id", ondelete="SET NULL", use_alter=True, name="fk_created_by"),
        nullable=True,
        comment="作成者ID(外部キー)"
    )
    created_from: Mapped[int] = mapped_column(
        ForeignKey("screens.id", ondelete="SET NULL", use_alter=True, name="fk_created_from"),
        nullable=True,
        comment="作成元スクリーンID(外部キー)"
    )
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now(), comment="更新日時")
    updated_by: Mapped[int] = mapped_column(
        ForeignKey("family_members.id", ondelete="SET NULL", use_alter=True, name="fk_updated_by"),
        nullable=True,
        comment="更新者ID(外部キー)"
    )
    updated_from: Mapped[int] = mapped_column(
        ForeignKey("screens.id", ondelete="SET NULL", use_alter=True, name="fk_updated_from"),
        nullable=True,
        comment="更新元スクリーンID(外部キー)"
    )

    @classmethod
    def create_table(cls):
        table = cls.__table__
        try:
            DB_CONF.Base.metadata.create_all(DB_CONF.engine, tables=[table])
            print(f"{table.name}テーブルを作成しました")
        except Exception as e:
            print(f"{table.name}テーブルの作成でエラー: {e}")

    @classmethod
    def drop_table(cls, session):
        table_name = cls.__tablename__
        try:
            session.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
            print(f"{table_name}テーブルを削除しました")
        except Exception as e:
            print(f"{table_name}テーブルの削除でエラー: {e}")

    @classmethod
    @abstractmethod
    def _seed_data(cls) -> List['BaseEntity']:
        """シードデータを返す抽象メソッド"""
        return []

    @classmethod
    @abstractmethod
    def from_model(cls, model) -> 'BaseEntity':
        """ドメインモデルからエンティティを作成する"""
        pass

    @classmethod
    def seed(cls, session):
        if session.query(cls).count() != 0:
            print(f"{cls.__tablename__}データはすでに存在します")
            return

        seed_data = cls._seed_data()
        session.add_all(seed_data)
        print(f"{cls.__tablename__}の初期データを投入しました")
