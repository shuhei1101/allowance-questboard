# 

## FetchFamilyQuestSummariesAPI
### クエスト一覧に表示するクエストに関する情報を取得する

### パラメータ
- FamilyId: 家族Id

### 結合条件
- FamiliesEntity 左結合 FamilyQuestsEntity
  - FamiliesEntity.id = FamilyQuestsEntity.family_id
- FamilyQuestsEntity 左結合 QuestsEntity
  - FamilyQuestsEntity.quest_id = QuestsEntity.id
- 


### 取得データ
```json


```

