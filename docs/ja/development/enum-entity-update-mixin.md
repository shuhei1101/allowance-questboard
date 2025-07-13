# Enum エンティティ更新システム

## 概要 📚
Enumの値をエンティティから更新する共通処理をインターフェース + Mixinの組み合わせで提供します！✨

## アーキテクチャ 🏗️

### インターフェース層
値オブジェクトが実装すべき契約を定義します。

#### 1. UpdatableFromEntityProtocol
翻訳テーブルがない値オブジェクト用のインターフェース

```python
from aqapi.core.domain.value_object.updatable_from_entity_protocol import UpdatableFromEntityProtocol

class YourValueObject(BaseEnumValue, UpdatableFromEntityProtocol):
    def set_from_entity(self, entity: BaseEntity) -> None:
        # 実装
        pass
```

#### 2. UpdatableFromEntityWithTranslationProtocol
翻訳テーブルがある値オブジェクト用のインターフェース

```python
from aqapi.core.domain.value_object.updatable_from_entity_with_translation_protocol import UpdatableFromEntityWithTranslationProtocol

class YourValueObject(BaseEnumValue, UpdatableFromEntityWithTranslationProtocol):
    def set_from_entity(self, entity: BaseEntity, translation_dict: Mapping[int, BaseTranslationEntity]) -> None:
        # 実装
        pass
```

### Mixin層
Enumクラスに更新機能を提供します。

#### 1. UpdatableFromEntities
翻訳テーブルがない普通のマスタテーブル用のmixin

```python
from aqapi.core.domain.updatable_from_entities import UpdatableFromEntities

class LanguageType(BaseEnum, UpdatableFromEntities):
    _id_type = LanguageId
    
    JAPANESE = LanguageTypeValue(_id_type(1))
    ENGLISH = LanguageTypeValue(_id_type(2))

# 使用方法
entities = [...] # LanguagesEntityのリスト
LanguageType.update_from_entities(entities)
```

#### 2. UpdatableFromEntitiesWithTranslation  
翻訳テーブルありのマスタテーブル用のmixin

```python
from aqapi.core.domain.updatable_from_entities_with_translation import UpdatableFromEntitiesWithTranslation

class IconCategory(BaseEnum, UpdatableFromEntitiesWithTranslation):
    _id_type = IconCategoryId
    
    ACTION = IconCategoryValue(_id_type(1))
    NAVIGATION = IconCategoryValue(_id_type(2))
    COMMUNICATION = IconCategoryValue(_id_type(3))

# 使用方法
entities = [...] # IconCategoriesEntityのリスト
translations = IconCategoriesTranslationEntities([...])
IconCategory.update_from_entities(entities, translations)
```

## 実装例 🌟

### 翻訳なしの値オブジェクト
```python
class LanguageTypeValue(BaseEnumValue, UpdatableFromEntityProtocol):
    def set_from_entity(self, entity: LanguagesEntity) -> None:
        self._code = LanguageCode(entity.code)
        self._name = LanguageName(entity.name)
        self._is_active = entity.is_active
        self._sort_order = SortOrder(entity.sort_order)
```

### 翻訳ありの値オブジェクト
```python
class IconCategoryValue(BaseEnumValue, UpdatableFromEntityWithTranslationProtocol):
    def set_from_entity(self, entity: IconCategoriesEntity, translation_dict: Mapping[int, IconCategoriesTranslationEntity]) -> None:
        # MappingをdictにキャストしてIconCategoryNames.from_entityに渡す
        self._name_by_languages = IconCategoryNames.from_entity(dict(translation_dict))
        self._description = IconCategoryDescription(entity.description)
```

## 型安全性のポイント 💡

### インターフェースの効果
- コンパイル時に値オブジェクトが正しいメソッドを実装しているか検証
- `cast(Any, enum_val.value)` から `cast(Protocol, enum_val.value)` で型安全性向上
- IDEの補完とエラー検出が向上

### Mapping vs Dict
- インターフェースでは `Mapping` を使用（共変性のため）
- 実装では具体的な型に合わせて `dict(translation_dict)` でキャスト

### 継承の注意点
- `BaseEnum` と一緒に多重継承で使用
- メタクラスの競合を避けるため、インターフェースは `ABC` ベース

## ファイル構成 📁
### インターフェース
- `aqapi/core/domain/value_object/updatable_from_entity_protocol.py` - 翻訳なしインターフェース
- `aqapi/core/domain/value_object/updatable_from_entity_with_translation_protocol.py` - 翻訳ありインターフェース

### Mixin
- `aqapi/core/domain/updatable_from_entities.py` - 翻訳なしMixin
- `aqapi/core/domain/updatable_from_entities_with_translation.py` - 翻訳ありMixin

### 実装例
- `aqapi/icon/domain/icon_category.py` + `icon_category_value.py` - 翻訳ありの例
- `aqapi/language/domain/language_type.py` + `language_type_value.py` - 翻訳なしの例

## メリット 🌟
- **型安全性** - インターフェースによる契約の強制
- **DRY原則** - 共通処理の一元化
- **保守性向上** - 一貫したパターンによる理解しやすさ
- **拡張性** - 新しいEnum型への簡単な適用
- **エラー防止** - コンパイル時の型チェック強化

新しいEnum型を作る場合は、適切なインターフェースを実装した値オブジェクトを作り、対応するmixinを使って共通化しましょう〜！😊✨
