// import Redis from 'ioredis';
import { createHash } from 'crypto';

// 型定義（ioredisがインストールされていない場合の代替）
interface RedisInterface {
  get(key: string): Promise<string | undefined>;
  setex(key: string, ttl: number, value: string): Promise<string>;
  del(key: string): Promise<number>;
}

// Redisクライアントのインスタンス（外部から設定）
let redisClient: RedisInterface | undefined = undefined;

/**
 * Redisクライアントを設定する
 */
export function setRedisClient(client: RedisInterface): void {
  redisClient = client;
}

/**
 * Redisクライアントを取得する
 */
function getRedisClient(): RedisInterface {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call setRedisClient() first.');
  }
  return redisClient;
}

/**
 * キャッシュキーを作成する
 * @param keyTemplate - キーテンプレート（例: "quests:all", "quests:{id}"）
 * @param func - デコレータ対象の関数
 * @param args - 関数の引数
 * @returns キャッシュキー文字列
 */
function makeCacheKey(
  keyTemplate: string,
  func: Function,
  args: any[]
): string {
  if (keyTemplate) {
    // テンプレートパラメータを置換
    // 例: "quests:{id}" → "quests:123"
    let key = keyTemplate;
    
    // 引数名を推測（簡易版）
    const funcStr = func.toString();
    const paramNames = funcStr
      .slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')'))
      .match(/([^\s,]+)/g) || [];

    // selfやthisを除外した引数でパラメータ置換
    const filteredArgs = args.slice(1); // 最初の引数（通常はthis）を除外
    
    paramNames.forEach((paramName, index) => {
      if (paramName !== 'this' && filteredArgs[index] !== undefined) {
        key = key.replace(new RegExp(`\\{${paramName}\\}`, 'g'), String(filteredArgs[index]));
      }
    });

    // エンティティのプロパティもサポート（例: {entity.id}）
    filteredArgs.forEach(arg => {
      if (arg && typeof arg === 'object' && arg.id !== undefined) {
        key = key.replace(/\{entity\.id\}/g, String(arg.id));
      }
    });

    return key;
  } else {
    // テンプレートなしの場合はハッシュ生成
    const filteredArgs = args.slice(1);
    const rawKey = `${func.name}:${JSON.stringify(filteredArgs)}`;
    return createHash('sha256').update(rawKey).digest('hex');
  }
}

/**
 * 手動でキャッシュを取得
 */
export async function getCacheValue(key: string): Promise<any | undefined> {
  try {
    const cached = await getRedisClient().get(key);
    if (cached) {
      console.log(`✨ HIT: ${key}`);
      return JSON.parse(cached);
    }
    return undefined;
  } catch (error) {
    console.warn(`⚠️ Cache get failed for ${key}:`, error);
    return undefined;
  }
}

/**
 * 手動でキャッシュを設定
 */
export async function setCacheValue(key: string, value: any, ttl: number = 60 * 60 * 24 * 7): Promise<void> {
  try {
    await getRedisClient().setex(key, ttl, JSON.stringify(value));
    console.log(`💾 Cached: ${key}`);
  } catch (error) {
    console.warn(`⚠️ Cache set failed for ${key}:`, error);
  }
}

/**
 * 手動でキャッシュを削除
 */
export async function deleteCacheValue(key: string): Promise<void> {
  try {
    await getRedisClient().del(key);
    console.log(`🧹 Deleted cache: ${key}`);
  } catch (error) {
    console.warn(`⚠️ Cache delete failed for ${key}:`, error);
  }
}

/**
 * キャッシュデコレータ
 * @param key - キーテンプレート
 * @param ttl - TTL（秒）、デフォルト1週間
 */
export function cache(key: string, ttl: number = 60 * 60 * 24 * 7) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = makeCacheKey(key, method, [this, ...args]);
      
      // キャッシュから取得
      const cachedResult = await getCacheValue(cacheKey);
      if (cachedResult !== undefined) {
        return cachedResult;
      }

      // キャッシュになければ実行
      const result = await method.apply(this, args);
      
      // 結果をキャッシュに保存
      await setCacheValue(cacheKey, result, ttl);

      return result;
    };
  };
}

/**
 * キャッシュ削除デコレータ
 * @param keys - 削除するキーのテンプレート（複数可）
 */
export function evict(...keys: string[]) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await method.apply(this, args);

      for (const keyTemplate of keys) {
        const cacheKey = makeCacheKey(keyTemplate, method, [this, ...args]);
        await deleteCacheValue(cacheKey);
      }

      return result;
    };
  };
}

/**
 * 外部からキャッシュキー生成にアクセスするためのヘルパー
 */
export function generateCacheKey(keyTemplate: string, func: Function, args: any[]): string {
  return makeCacheKey(keyTemplate, func, args);
}
