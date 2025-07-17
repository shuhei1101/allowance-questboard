# apiフォルダの責務

## 概要
- APIフォルダには、APIClientクラスを配置する
- APIClientクラスはAPIサーバにリクエストを送信する
- 受け取ったレスポンスはJSON形式であるため、JSONをパースしてDartのオブジェクトに変換し返す
