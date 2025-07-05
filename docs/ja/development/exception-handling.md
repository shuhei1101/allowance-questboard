# ⚠️ 例外ハンドリング

## 基本原則
- 例外処理は`router`層もしくは`service`層で行う
- `router`層でキャッチした全ての例外は、`HTTPException`を使用してHTTPステータスコードとエラーメッセージを返す
- `service`層で発生した例外は、内部で適切に処理するか、`router`層に伝播させる
- 例外メッセージは極力日本語で記述すること
- 例外発生時はloggerを使用して、エラーメッセージを出力する

## 関連コンポーネント

### app_logger（core配下）
- `aqapi/core/app_logger.py`にアプリケーション全体で使用するロガーを配置
- 例外発生時のログ出力に使用する
- 設定可能なログレベル、フォーマット、出力先を提供

### traceback_converter（util配下）
- `aqapi/util/traceback_converter.py`にトレースバック情報の変換ユーティリティを配置
- 例外発生時のスタックトレース情報を整形・変換するために使用
- デバッグ時の情報収集を効率化

### app_timer（core配下）
- `aqapi/core/app_timer.py`にアプリケーション処理時間計測機能を配置
- 例外発生時の処理時間も含めた パフォーマンス分析に使用
- 例外処理の性能監視に活用

## 実装例
```python
from aqapi.core.app_logger import build_logger
from aqapi.util.traceback_converter import TracebackConverter
from aqapi.core.app_timer import AppTimer

logger = build_logger()
timer = AppTimer.init_and_start(logger)

try:
    # 処理実行
    pass
except Exception as e:
    # トレースバック情報の変換
    converter = TracebackConverter(e)
    traceback_info = converter.get_all()
    
    # ログ出力
    logger.error(f"例外が発生しました: {str(e)}")
    logger.error(f"トレースバック: {traceback_info}")
    
    # 処理時間の記録
    timer.stop()
    
    # HTTPExceptionとして再発生
    raise HTTPException(status_code=500, detail="内部サーバーエラー")
```