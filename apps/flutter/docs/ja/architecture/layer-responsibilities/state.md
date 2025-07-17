# stateフォルダの責務

## 概要
- Stateは、Freezed Riverpodで定義された状態を配置
- Stateクラスは内部にStateObjectを持つ
- StateObjectは、Freezed Riverpodで定義された状態の値オブジェクト
- StateNotifierは、Stateクラスを管理する
- StateNotifierは各PageやScreen内で使用される
- StateNotifierはUseCaseクラスを持ち、ビジネスロジックを実行する
- StateNotifierProviderは、StateNotifierを提供する
