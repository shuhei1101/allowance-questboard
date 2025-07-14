# 🎨 フロントエンド設計思想

## アーキテクチャ概要

**重要**: このFlutterアプリケーションでは、**DDD（ドメイン駆動設計）はフロントエンド側では使用していません**。  
**ビジネスロジックはすべてAPIサーバー側で処理され**、フロントエンド側では以下の責務のみを担当します：

- **バリデーション処理**  
- **状態管理**  
- **UI表示・操作**  
- **API通信**  

詳細な処理の流れについては、[アーキテクチャ図](../../../../../docs/ja/shared/uml/flutter_supabase_clsd.md)を参照してください。

## フロントエンドの設計パターン

### 1. 状態管理パターン

フロントエンドでは**StateNotifier + Riverpod**を使用した状態管理を採用しています。

```dart
class QuestPageStateNotifier extends StateNotifier<QuestPageState> {
  QuestPageStateNotifier() : super(QuestPageState.initial());
  
  // 入力値の設定（バリデーション付き）
  void setTitle(String title) {
    final titleState = QuestTitleState(title);
    state = state.copyWith(
      questTitleState: titleState,
      isValid: _validateForm(),
    );
  }
  
  void setDescription(String description) {
    final descriptionState = QuestDescriptionState(description);
    state = state.copyWith(
      questDescriptionState: descriptionState,
      isValid: _validateForm(),
    );
  }
  
  // フォーム送信
  Future<void> submit() async {
    if (!state.isValid) return;
    
    final useCase = ref.read(applyQuestUseCaseProvider);
    final result = await useCase.execute(/* ... */);
    // 結果処理
  }
}
```

### 2. バリデーション処理

フロントエンドでは入力値の基本的なバリデーションを行います：

```dart
mixin InputState {
  String get value;
  String? get errorMessage;
  
  bool _validate();
  bool isValid() => _validate();
}

class QuestTitleState with InputState {
  @override
  final String value;
  @override
  final String? errorMessage;
  
  QuestTitleState(this.value) : errorMessage = _validateTitle(value);
  
  @override
  bool _validate() => errorMessage == null;
  
  static String? _validateTitle(String value) {
    if (value.isEmpty) return 'タイトルを入力してください';
    if (value.length > 50) return 'タイトルは50文字以内で入力してください';
    return null;
  }
}
```

### 3. UseCase パターン

フロントエンド側のUseCaseは、APIとの通信とデータ変換を担当します：

```dart
class GetQuestsUseCase {
  final QuestQueryService _questQueryService;
  
  GetQuestsUseCase(this._questQueryService);
  
  Future<GetQuestsResult> execute(int familyId) async {
    // QueryServiceからデータ取得
    final queryModels = await _questQueryService.findByFamilyId(familyId);
    
    // DTOに変換して結果として返す
    final questDtos = queryModels
        .map((model) => QuestSummaryDto.fromQueryModel(model))
        .toList();
        
    return GetQuestsResult(quests: questDtos);
  }
}
```

### 4. API通信パターン

```dart
class QuestApiClient {
  Future<ApplyQuestResponse> applyQuest(ApplyQuestRequest request) async {
    // APIサーバーにリクエスト送信
    final response = await _httpClient.post('/api/quests/apply', 
      body: request.toJson());
    
    return ApplyQuestResponse.fromJson(response.data);
  }
}
```

## データ同期

### Supabaseリアルタイム同期

```dart
class QuestQueryService {
  Stream<List<QuestQueryModel>> watchByFamilyId(int familyId) {
    return _supabaseClient
        .from('quests')
        .stream(primaryKey: ['id'])
        .eq('family_id', familyId)
        .map((data) => data.map((json) => QuestQueryModel.fromJson(json)).toList());
  }
  
  Future<List<QuestQueryModel>> findByFamilyId(int familyId) async {
    final data = await _supabaseClient
        .from('quests')
        .select()
        .eq('family_id', familyId);
        
    return data.map((json) => QuestQueryModel.fromJson(json)).toList();
  }
}
```

## 責務の分離

### フロントエンド（Flutter）の責務
- ✅ **入力バリデーション**: フォーム入力値の基本的な検証
- ✅ **状態管理**: UI状態の管理
- ✅ **データ表示**: サーバーから取得したデータの表示
- ✅ **ユーザー操作**: ボタンクリック、フォーム入力等のUI操作
- ✅ **API通信**: サーバーとのデータ送受信
- ✅ **リアルタイム同期**: Supabaseを使ったデータ同期

### バックエンド（APIサーバー）の責務
- 🔒 **ビジネスロジック**: すべての業務ルール
- 🔒 **データ永続化**: データベースへの保存・更新
- 🔒 **セキュリティ**: 認証・認可
- 🔒 **整合性チェック**: データの整合性保証

## 設計の利点

1. **責務の明確化**: フロントエンドとバックエンドの責務が明確に分離
2. **保守性**: ビジネスロジックの変更がフロントエンドに影響しない
3. **テスト容易性**: バリデーション処理のみのテストで済む
4. **セキュリティ**: 重要な処理はすべてサーバー側で実行
