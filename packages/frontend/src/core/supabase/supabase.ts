import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabaseプロジェクトの設定
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

/**
 * Supabaseクライアントのインスタンス
 * React Native用にAsyncStorageを使用してセッション管理を行う
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // React NativeでセッションをAsyncStorageに保存
    storage: AsyncStorage,
    // セッションの自動リフレッシュを有効化
    autoRefreshToken: true,
    // セッションの永続化を有効化
    persistSession: true,
    // セッション検出のコールバック
    detectSessionInUrl: false,
  },
});
