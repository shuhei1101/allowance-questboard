import os

CONFIG_DIR = os.path.dirname(__file__)                                  # aqapi/core/config ディレクトリのパス
CORE_DIR = os.path.dirname(CONFIG_DIR)                                  # aqapi/core ディレクトリのパス
APP_DIR = os.path.dirname(CORE_DIR)                                     # aqapi ディレクトリのパス
ROOT_DIR = os.path.dirname(APP_DIR)                                     # aqapi/ ディレクトリのパス
LOGS_DIR = os.path.join(ROOT_DIR, "logs")                               # ログファイルのパス
LOGS_FILE = os.path.join(LOGS_DIR, "aqapi.log")                         # ログファイルのフルパス

class LogConfig:
    LOGGER_NAME = "aqapi"                                               # ロガー名
    LOG_LEVEL = "INFO"                                                  # ログレベル
    OUTPUT_PATH = LOGS_FILE                                             # ログファイルのパス
    FORMAT = "%(asctime)s - %(levelname)s - %(message)s"                # ログフォーマット
    DATE_FORMAT = "%Y-%m-%d %H:%M:%S"                                   # 日付フォーマット
    WHEN = "midnight"                                                   # ログのローテーションタイミング
    INTERVAL = 1                                                        # ローテーションの間隔
    BACKUP_COUNT = 7                                                    # ログのバックアップ数
    
LOG_CONF = LogConfig()
