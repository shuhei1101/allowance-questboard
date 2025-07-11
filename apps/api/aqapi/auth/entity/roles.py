from sqlalchemy import Column, Integer, String, Text
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF

class RolesEntity(BaseEntity):
    """rolesエンティティ"""

    __tablename__ = "roles"

    code = Column(String(20), nullable=False, unique=True, comment="ロールコード")
    name = Column(String(50), nullable=False, comment="ロール名")
    description = Column(Text, nullable=False, comment="ロールの説明")
    
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            RolesEntity(code="developer", name="開発者", description="システム開発に関わるロール"),
            RolesEntity(code="parent", name="親", description="親のロール"),
            RolesEntity(code="child", name="子供", description="子供のロール"),
            RolesEntity(code="guest", name="ゲスト", description="ゲストユーザーのロール"),
        ]
