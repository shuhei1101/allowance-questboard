import { supabase } from '@/core/supabase/supabase';

export type CheckFamilyIdDuplicate = (params: {
  /** 家族表示ID */
  familyDisplayId: string;
}) => Promise<boolean>;

/** 家族IDの重複チェック
 * 
 * Supabaseに直接クエリを実行して家族表示IDの重複をチェックする */
export const checkFamilyIdDuplicate: CheckFamilyIdDuplicate = async (params) => {
  const { familyDisplayId } = params;
  
  try {
    // familiesテーブルから指定されたdisplay_idを検索
    const { data, error } = await supabase
      .from('families')
      .select('display_id')
      .eq('display_id', familyDisplayId)
      .single();

    // エラーが発生した場合の処理
    if (error) {
      // PGRST116 = レコードが見つからない（重複なし）
      if (error.code === 'PGRST116') {
        return false;
      }
      
      // その他のエラーは例外として処理
      console.error('家族ID重複チェックエラー:', error);
      throw new Error('重複チェック処理中にエラーが発生しました');
    }

    // データが存在する場合は重複あり
    return !!data;

  } catch (error) {
    console.error('家族ID重複チェック例外:', error);
    throw error;
  }
};
