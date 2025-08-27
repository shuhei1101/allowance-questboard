// import Redis from 'ioredis';
import * as dotenv from 'dotenv';

// .envファイルを読み込み
dotenv.config();

// 型定義（ioredisがインストールされていない場合の代替）
interface RedisInterface {
  get(key: string): Promise<string | undefined>;
  setex(key: string, ttl: number, value: string): Promise<string>;
  del(key: string): Promise<number>;
  on(event: string, callback: Function): void;
}

/**
 * Redis接続クライアントの設定
 */
const createRedisClient = (): RedisInterface => {
  // モック実装（実際の使用時はioredisをインストールしてコメントアウトを削除）
  return {
    async get(key: string): Promise<string | undefined> {
      console.log(`[MOCK] Redis GET: ${key}`);
      return undefined;
    },
    async setex(key: string, ttl: number, value: string): Promise<string> {
      console.log(`[MOCK] Redis SETEX: ${key} TTL:${ttl}`);
      return 'OK';
    },
    async del(key: string): Promise<number> {
      console.log(`[MOCK] Redis DEL: ${key}`);
      return 1;
    },
    on(event: string, callback: Function): void {
      console.log(`[MOCK] Redis event: ${event}`);
      // 接続成功を模擬
      if (event === 'connect') {
        setTimeout(callback, 100);
      }
    }
  };

  /* 実際のRedis実装（ioredis使用時）
  const redisUrl = process.env.REDIS_URL;
  
  if (redisUrl) {
    // REDIS_URLが設定されている場合（本番環境など）
    return new Redis(redisUrl);
  }

  // ローカル開発環境用のデフォルト設定
  return new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0'),
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
  });
  */
};

// Redisクライアントのシングルトンインスタンス
export const redisClient = createRedisClient();

// 接続確認
redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redisClient.on('error', (error: any) => {
  console.error('❌ Redis connection error:', error);
});

export default redisClient;
