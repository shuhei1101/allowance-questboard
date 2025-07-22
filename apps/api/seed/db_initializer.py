#!/usr/bin/env python3

import asyncio
from aqapi.core.config.db_config import DB_CONF
from db_manager import DBManager
from master_seedr import MasterSeedr
from sample_seedr import SampleSeedr


class DBInitializer:
    def __init__(self):
        self.db_manager = DBManager()
        self.master_seedr = MasterSeedr()
        self.sample_seedr = SampleSeedr()

    async def initialize(self):
        """非同期初期化"""
        # エンティティを明示的にインポート
        DB_CONF.import_all_entities()
        
        # 非同期初期化
        await DB_CONF.initialize_async()

    async def show_info(self):
        """情報表示を実行"""
        print("=== Allowance Questboard Database Info ===")
        await self.db_manager.show_all_info()

    async def drop_table(self):
        """テーブル削除を実行"""
        print("=== テーブル削除 ===")
        await self.db_manager.drop_tables()

    async def create_table(self):
        """テーブル作成を実行"""
        print("=== テーブル作成 ===")
        await self.db_manager.create_tables()

    async def insert_sample_seed(self):
        """サンプルデータ投入を実行"""
        print("=== サンプルデータ投入 ===")
        await self.sample_seedr.seed()

    async def reset_db(self):
        """リセット(削除→作成→データ投入)を実行"""
        print("=== データベースリセット ===")
        print("\n1. テーブル削除")
        await self.db_manager.drop_tables()
        print("\n2. テーブル作成")
        await self.db_manager.create_tables()
        print("\n3. 初期データ投入")
        await self.master_seedr.seed()
        print("\n4. サンプルデータ投入")
        await self.sample_seedr.seed()

    async def force_drop_all(self):
        """すべてのpublicテーブルを強制削除"""
        print("=== すべてのpublicテーブルを強制削除 ===")
        await self.db_manager.force_drop_all_public_tables()

    async def force_reset_db(self):
        """強制リセット(強制削除→作成→データ投入)を実行"""
        print("=== データベース強制リセット ===")
        print("\n1. すべてのpublicテーブルを強制削除")
        await self.db_manager.force_drop_all_public_tables()
        print("\n2. テーブル作成")
        await self.db_manager.create_tables()
        print("\n3. 初期データ投入")
        await self.master_seedr.seed()

async def main():
    """メイン関数"""
    initializer = DBInitializer()
    await initializer.initialize()
    await initializer.reset_db()
    # await initializer.insert_sample_seed()

if __name__ == "__main__":
    asyncio.run(main())
