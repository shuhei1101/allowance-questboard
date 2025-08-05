# 🎛️ Flutter Enum

## 概要
- FlutterのマスタデータをEnumで管理する方法(疑似Enum)
- ほとんどAPサーバと同様なため、そちらを参考にすること
  - [APサーバのEnum](../api/Enum-ap_server_enum.md)
  - 違う部分: 
    - Enumの値を更新するときメソッド`update_from_entities`ではなく、
    `updateFromDtoList`を使用すること
    - フロント側はAPサーバから受け取ったDTOを元にEnumの値を更新するため

## クラス図
### Enum

```mermaid
classDiagram
    BaseEnumValue {
        +id: BaseId
        +name: String
    }

    EnumValueProtocol {
        +id: BaseId
        +name: String
    }

    BaseEnum {
        BaseEnumValue<IdType> value;
        fromId(id: EnumType): BaseEnumValue<EnumType>
    }

    EnumMixin {
        updateFromDtoList
    }

    Enum具象
    EnumValue具象
    
    BaseEnumValue <|-- EnumValue具象
    EnumValueProtocol <|-- EnumValue具象
    
    BaseEnum <|-- Enum具象
    EnumMixin <|-- Enum具象

    Enum具象 --> EnumValue具象 : 保持
```

## 配置場所
- BaseEnumValue: `core/enum/enum_value/base_enum_value.dart`
- EnumValueProtocol: `core/enum/enum_value/enum_value_protocol.dart`
- BaseEnum: `core/enum/base_enum.dart`
- EnumMixin: `core/enum/enum_mixin.dart`
