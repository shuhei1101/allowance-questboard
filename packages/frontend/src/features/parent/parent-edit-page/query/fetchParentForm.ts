import { supabase } from '@/core/supabase/supabase';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentForm } from '../models/parentForm';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { AppConstants } from '@/core/constants/appConstants';

/**
 * ParentIdに基づいてParentFormを取得する
 * 
 * @param parentId 親ID
 * @returns ParentFormまたはnull（見つからない場合）
 */
export const fetchParentForm = async (parentId: ParentId): Promise<ParentForm | null> => {
  try {
    // parentsテーブルとfamily_membersテーブルをJOINしてデータを取得
    const { data, error } = await supabase
      .from('parents')
      .select(`
        *,
        family_members (*)
      `)
      .eq('id', parentId.value)
      .single();

    if (error) {
      console.error('Parent form fetch error:', error);
      return null;
    }

    if (!data || !data.family_members) {
      return null;
    }

    // family_membersデータ（JOINで取得したデータ）
    // Supabaseの1対1関係でも配列として返される場合があるため、適切にアクセス
    const familyMember = Array.isArray(data.family_members) 
      ? data.family_members[0] 
      : data.family_members as {
          user_id: string;
          name: string;
          icon_id: number | null;
          birthday: string;
        };

    if (!familyMember) {
      return null;
    }

    // アイコンデータの取得（iconIdがある場合）
    let icon = null;
    if (familyMember.icon_id) {
      const allIcons = AppConstants.iconCategories?.getAllIcons();
      icon = allIcons?.get(new IconId(familyMember.icon_id)) || null;
    }

    // ParentFormインスタンスを作成
    const parentForm = new ParentForm({
      name: new ParentName(familyMember.name),
      email: new Email(''), // 編集画面では通常メールアドレスは変更しないため空文字
      password: new Password(''), // 編集画面では通常パスワードは変更しないため空文字
      icon: icon,
      birthday: new Birthday(new Date(familyMember.birthday))
    });

    return parentForm;

  } catch (error) {
    console.error('Unexpected error in fetchParentForm:', error);
    return null;
  }
};
