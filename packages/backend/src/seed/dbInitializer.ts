import { AppDataSource } from '../core/config/dataSource';
import { seedSampleData } from './sampleSeed';
import { seedMasterData } from './masterSeed';

/**
 * データベース初期化機能
 */

/**
 * データベース接続を初期化する
 */
export async function initializeDatabase(): Promise<void> {
  console.log('=== データベース接続初期化 ===');
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('データベース接続が初期化されました ✨');
  } else {
    console.log('データベース接続は既に初期化済みです');
  }
}

/**
 * データベース情報を表示する
 */
export async function showDatabaseInfo(): Promise<void> {
  console.log('=== Allowance Questboard Database Info ===');
  
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    // テーブル一覧を取得
    const tables = await queryRunner.getTables();
    console.log(`テーブル数: ${tables.length}`);
    
    if (tables.length > 0) {
      console.log('テーブル一覧:');
      tables.forEach(table => {
        console.log(`- ${table.name}`);
      });
    } else {
      console.log('テーブルが見つかりませんでした');
    }
  } catch (error) {
    console.error('テーブル情報の取得に失敗しました:', error);
  } finally {
    await queryRunner.release();
  }
}

/**
 * テーブルを削除する
 */
export async function dropTables(): Promise<void> {
  console.log('=== テーブル削除 ===');
  try {
    await AppDataSource.dropDatabase();
    console.log('テーブルの削除が完了しました');
  } catch (error) {
    console.error('テーブル削除でエラーが発生しました:', error);
    throw error;
  }
}

/**
 * テーブルを作成する
 */
export async function createTables(): Promise<void> {
  console.log('=== テーブル作成 ===');
  try {
    await AppDataSource.synchronize();
    console.log('テーブルの作成が完了しました ✨');
  } catch (error) {
    console.error('テーブル作成でエラーが発生しました:', error);
    throw error;
  }
}

/**
 * サンプルデータを投入する
 */
export async function insertSampleData(): Promise<void> {
  console.log('=== サンプルデータ投入 ===');
  try {
    await seedSampleData(AppDataSource);
    console.log('サンプルデータの投入が完了しました ✨');
  } catch (error) {
    console.error('サンプルデータ投入でエラーが発生しました:', error);
    throw error;
  }
}

/**
 * データベースをリセットする（削除→作成→データ投入）
 */
export async function resetDatabase(): Promise<void> {
  console.log('=== データベースリセット ===');
  
  try {
    console.log('\n1. テーブル削除');
    await dropTables();
    
    console.log('\n2. テーブル作成');
    await createTables();
    
    console.log('\n3. 初期データ投入');
    await seedMasterData(AppDataSource);
    
    console.log('\n4. サンプルデータ投入');
    await seedSampleData(AppDataSource);
    
    console.log('\nデータベースリセットが完了しました 🎉');
  } catch (error) {
    console.error('データベースリセットでエラーが発生しました:', error);
    throw error;
  }
}

/**
 * すべてのpublicテーブルを強制削除する
 */
export async function forceDropAllTables(): Promise<void> {
  console.log('=== すべてのpublicテーブルを強制削除 ===');
  
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    await queryRunner.query('DROP SCHEMA public CASCADE');
    await queryRunner.query('CREATE SCHEMA public');
    console.log('すべてのテーブルの強制削除が完了しました');
  } catch (error) {
    console.error('テーブル強制削除でエラーが発生しました:', error);
    throw error;
  } finally {
    await queryRunner.release();
  }
}

/**
 * データベースを強制リセットする（強制削除→作成→データ投入）
 */
export async function forceResetDatabase(): Promise<void> {
  console.log('=== データベース強制リセット ===');
  
  try {
    console.log('\n1. すべてのpublicテーブルを強制削除');
    await forceDropAllTables();
    
    console.log('\n2. テーブル作成');
    await createTables();
    
    console.log('\n3. 初期データ投入');
    await seedMasterData(AppDataSource);
    
    console.log('\nデータベース強制リセットが完了しました 💪');
  } catch (error) {
    console.error('データベース強制リセットでエラーが発生しました:', error);
    throw error;
  }
}

/**
 * データベース接続を閉じる
 */
export async function closeDatabase(): Promise<void> {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('データベース接続を閉じました');
  }
}

/**
 * メイン実行関数
 */
export async function main(): Promise<void> {
  try {
    await initializeDatabase();
    await resetDatabase();
    // await insertSampleData();
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  } finally {
    await closeDatabase();
  }
}
// 直接実行された場合のみmainを実行
if (require.main === module) {
  main().catch(console.error);
}
