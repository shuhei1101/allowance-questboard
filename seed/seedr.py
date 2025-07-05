#!/usr/bin/env python3
"""
データベースセットアップのファサード
各機能を別モジュールに委譲し、統合インターフェースを提供
"""
import sys

from aqapi.core.config.db_config import DB_CONF
from db_manager import DBManager
from master_seedr import MasterSeedr

# from sample_seedr import SampleSeedr


class Seedr:

    def __init__(self):
        # エンティティを明示的にインポート

        DB_CONF.import_all_entities()

        self.db_manager = DBManager()
        self.master_seedr = MasterSeedr()
        # self.sample_seedr = SampleSeedr()

    def main(self, action: str = "help"):
        try:
            if action == "info":
                self._show_info()
            elif action == "drop":
                self._drop_table()
            elif action == "force-drop":
                self._force_drop_all()
            elif action == "create":
                self._create_table()
            elif action == "seed":
                self._insert_seed()
            elif action == "reset":
                self._reset_db()
            elif action == "force-reset":
                self._force_reset_db()
            elif action == "help":
                self._show_usage()
            else:
                print(f"不明なアクション: {action}")
                self._show_usage()
                return

            print("\n処理が完了しました ✅")

        except Exception as e:
            print(f"\nエラーが発生しました: {e}")
            print("処理が中断されました ❌")

    def _show_usage(self):
        """使用方法を表示"""
        print("使用方法:")
        print("  python seed/seedr.py [action]")
        print("")
        print("利用可能なアクション:")
        print("  info        - テーブル情報を表示")
        print("  drop        - メタデータベースのテーブルを削除")
        print("  force-drop  - publicスキーマのすべてのテーブルを強制削除")
        print("  create      - テーブルを作成")
        print("  seed        - 初期データを投入")
        print("  reset       - テーブルを削除→作成→初期データ投入")
        print("  force-reset - 強制削除→作成→初期データ投入")
        print("")

    def _show_info(self):
        """情報表示を実行"""
        print("=== Allowance Questboard Database Info ===")
        self.db_manager.show_all_info()

    def _drop_table(self):
        """テーブル削除を実行"""
        print("=== テーブル削除 ===")
        self.db_manager.drop_tables()

    def _create_table(self):
        """テーブル作成を実行"""
        print("=== テーブル作成 ===")
        self.db_manager.create_tables()

    def _insert_seed(self):
        """初期データ投入を実行"""
        print("=== 初期データ投入 ===")
        self.master_seedr.seed()

    def _reset_db(self):
        """リセット(削除→作成→データ投入)を実行"""
        print("=== データベースリセット ===")
        print("\n1. テーブル削除")
        self.db_manager.drop_tables()
        print("\n2. テーブル作成")
        self.db_manager.create_tables()
        print("\n3. 初期データ投入")
        self.master_seedr.seed()

    def _force_drop_all(self):
        """すべてのpublicテーブルを強制削除"""
        print("=== すべてのpublicテーブルを強制削除 ===")
        self.db_manager.force_drop_all_public_tables()

    def _force_reset_db(self):
        """強制リセット(強制削除→作成→データ投入)を実行"""
        print("=== データベース強制リセット ===")
        print("\n1. すべてのpublicテーブルを強制削除")
        self.db_manager.force_drop_all_public_tables()
        print("\n2. テーブル作成")
        self.db_manager.create_tables()
        print("\n3. 初期データ投入")
        self.master_seedr.seed()


if __name__ == "__main__":
    seedr = Seedr()
    try:
        action = sys.argv[1].lower() if len(sys.argv) > 1 else None
        seedr.main(action)  # type: ignore
    except Exception:
        seedr._drop_table()
        # Seedr()._reset_db()
