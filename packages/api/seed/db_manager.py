from sqlalchemy import text

from aqapi.core.config.db_config import db_config


class DBManager:
    """データベース管理クラス"""

    async def create_tables(self):
        """すべてのテーブルを作成"""
        print("テーブルを作成中...")
        try:
            # 非同期エンジンを使ってテーブル作成
            async with db_config.engine.begin() as conn:
                await conn.run_sync(db_config.Base.metadata.create_all)
            print("テーブルの作成が完了しました")

            async with db_config.SessionLocal() as db:
                # 作成されたテーブルを確認
                result = await db.execute(
                    text(
                        """
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    ORDER BY table_name
                """
                    )
                )
                created_tables = [row[0] for row in result.fetchall()]
                print(f"作成されたテーブル数: {len(created_tables)}個")
                print("作成されたテーブル一覧:")
                for i, table in enumerate(created_tables, 1):
                    print(f"  {i:2d}. {table}")

        except Exception as e:
            print(f"テーブル作成でエラーが発生しました: {e}")
            raise

    async def drop_tables(self):
        """すべてのテーブルを削除"""
        print("テーブルを削除中... (CASCADE削除を使用)")
        async with db_config.SessionLocal() as db:
            try:
                # 削除前に既存のテーブルを確認
                print("\n=== 削除前の状態確認 ===")
                result = await db.execute(
                    text(
                        """
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    ORDER BY table_name
                """
                    )
                )
                existing_tables = [row[0] for row in result.fetchall()]
                print(f"データベース内の既存テーブル数: {len(existing_tables)}個")
                if existing_tables:
                    print("既存テーブル一覧:")
                    for i, table in enumerate(existing_tables, 1):
                        print(f"  {i:2d}. {table}")

                # メタデータから取得したテーブル名を確認
                table_names = list(db_config.Base.metadata.tables.keys())
                print(f"\n=== メタデータから取得したテーブル: {len(table_names)}個 ===")
                for i, table_name in enumerate(table_names, 1):
                    print(f"  {i:2d}. {table_name}")

                print("\n=== 削除処理開始 ===")
                deleted_count = 0
                for table_name in table_names:
                    try:
                        if table_name == "auth.users":
                            print(f"スキップ: {table_name} (auth.usersテーブル)")
                            continue

                        # より詳細なログ
                        print(f"削除実行: DROP TABLE IF EXISTS {table_name} CASCADE")
                        result = await db.execute(
                            text(f"DROP TABLE IF EXISTS {table_name} CASCADE")
                        )
                        print(f"✓ テーブル {table_name} を削除しました")
                        deleted_count += 1
                    except Exception as e:
                        print(f"✗ テーブル {table_name} の削除でエラー: {e}")
                        raise

                await db.commit()
                print(f"\n削除処理が完了しました (削除されたテーブル数: {deleted_count}個)")

                # 削除後の確認
                print("\n=== 削除後の状態確認 ===")
                result = await db.execute(
                    text(
                        """
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    ORDER BY table_name
                """
                    )
                )
                remaining_tables = [row[0] for row in result.fetchall()]
                print(f"データベース内の残存テーブル数: {len(remaining_tables)}個")
                if remaining_tables:
                    print("残存テーブル一覧:")
                    for i, table in enumerate(remaining_tables, 1):
                        print(f"  {i:2d}. {table}")
                else:
                    print("すべてのテーブルが正常に削除されました")

            except Exception as e:
                print(f"削除処理でエラーが発生しました: {e}")
                await db.rollback()
                raise

    async def show_all_info(self):
        """すべての情報を表示"""
        print("=== Entity情報 ===")
        self._show_table_info()
        print("\n=== データベース情報 ===")
        await self._show_database_info()

    def _show_table_info(self):
        """テーブル情報を表示"""
        print(f"発見されたEntityクラス: {len(db_config.Base.metadata.tables)} 個")
        print(
            f"定義されているテーブル名: {sorted(db_config.Base.metadata.tables.keys())}"
        )

    async def _show_database_info(self):
        """データベースの現在の状態を表示"""
        async with db_config.SessionLocal() as db:
            try:
                result = await db.execute(
                    text(
                        """
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    ORDER BY table_name
                """
                    )
                )
                existing_tables = [row[0] for row in result.fetchall()]

                print(f"データベース内の既存テーブル数: {len(existing_tables)}個")
                if existing_tables:
                    print("既存テーブル一覧:")
                    for i, table in enumerate(existing_tables, 1):
                        print(f"  {i:2d}. {table}")
                else:
                    print("データベースにテーブルは存在しません")

            except Exception as e:
                print(f"データベース情報の取得でエラー: {e}")

    async def force_drop_all_public_tables(self):
        """publicスキーマのすべてのテーブルを強制削除"""
        print("=== publicスキーマのすべてのテーブルを強制削除 ===")
        async with db_config.SessionLocal() as db:
            try:
                # publicスキーマのすべてのテーブルを取得
                result = await db.execute(
                    text(
                        """
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_type = 'BASE TABLE'
                    ORDER BY table_name
                """
                    )
                )
                all_public_tables = [row[0] for row in result.fetchall()]

                if not all_public_tables:
                    print("削除対象のテーブルはありません")
                    return

                print(f"削除対象テーブル数: {len(all_public_tables)}個")
                for i, table in enumerate(all_public_tables, 1):
                    print(f"  {i:2d}. {table}")

                print("\n削除処理を開始します...")
                deleted_count = 0
                for table_name in all_public_tables:
                    try:
                        print(f"削除実行: DROP TABLE IF EXISTS public.{table_name} CASCADE")
                        await db.execute(
                            text(f"DROP TABLE IF EXISTS public.{table_name} CASCADE")
                        )
                        print(f"✓ テーブル public.{table_name} を削除しました")
                        deleted_count += 1
                    except Exception as e:
                        print(f"✗ テーブル public.{table_name} の削除でエラー: {e}")
                        # エラーがあっても続行

                await db.commit()
                print(f"\n強制削除が完了しました (削除されたテーブル数: {deleted_count}個)")

                # 削除後の確認
                result = await db.execute(
                    text(
                        """
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    ORDER BY table_name
                """
                    )
                )
                remaining_tables = [row[0] for row in result.fetchall()]
                print(f"削除後の残存テーブル数: {len(remaining_tables)}個")
                if remaining_tables:
                    print("残存テーブル一覧:")
                    for i, table in enumerate(remaining_tables, 1):
                        print(f"  {i:2d}. {table}")
                else:
                    print("すべてのpublicテーブルが削除されました ✅")

            except Exception as e:
                print(f"強制削除処理でエラーが発生しました: {e}")
                await db.rollback()
