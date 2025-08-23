import { fetchParentForm } from '@/features/parent/parent-edit-page/query/fetchParentForm';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { supabase } from '@/core/supabase/supabase';
import { AppConstants } from '@/core/constants/appConstants';

// Supabaseクライアントをモック化
jest.mock('@/core/supabase/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

// AppConstantsをモック化
jest.mock('@/core/constants/appConstants', () => ({
  AppConstants: {
    iconCategories: {
      getAllIcons: jest.fn()
    }
  }
}));

describe('fetchParentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('正常系', () => {
    test('ParentIdが存在する場合、ParentFormを返すこと', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockData = {
        id: 1,
        family_id: 1,
        family_member_id: 1,
        family_members: {
          user_id: 'test-user-id',
          name: 'テスト親',
          icon_id: 1,
          birthday: '1990-01-01'
        }
      };

      const mockIcon = {
        id: new IconId(1),
        name: 'テストアイコン'
      };

      const mockSupabaseResponse = {
        data: mockData,
        error: null
      };

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockSupabaseResponse)
        })
      });

      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect
      });

      const mockGetAllIcons = jest.fn().mockReturnValue({
        get: jest.fn().mockReturnValue(mockIcon)
      });

      (AppConstants.iconCategories as any).getAllIcons = mockGetAllIcons;

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).not.toBeNull();
      expect(result?.name.value).toBe('テスト親');
      expect(result?.email.value).toBe(''); // 編集画面では空
      expect(result?.password.value).toBe(''); // 編集画面では空
      expect(result?.icon).toBe(mockIcon);
      expect(result?.birthday.value).toEqual(new Date('1990-01-01'));

      expect(supabase.from).toHaveBeenCalledWith('parents');
      expect(mockSelect).toHaveBeenCalledWith(expect.stringContaining('family_members'));
    });

    test('アイコンがない場合でもParentFormを返すこと', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockData = {
        id: 1,
        family_id: 1,
        family_member_id: 1,
        family_members: {
          user_id: 'test-user-id',
          name: 'テスト親',
          icon_id: null,
          birthday: '1990-01-01'
        }
      };

      const mockSupabaseResponse = {
        data: mockData,
        error: null
      };

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockSupabaseResponse)
        })
      });

      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect
      });

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).not.toBeNull();
      expect(result?.name.value).toBe('テスト親');
      expect(result?.icon).toBeNull();
    });
  });

  describe('異常系', () => {
    test('Supabaseエラーが発生した場合、nullを返すこと', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockSupabaseResponse = {
        data: null,
        error: { message: 'Database error' }
      };

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockSupabaseResponse)
        })
      });

      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect
      });

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).toBeNull();
    });

    test('データが見つからない場合、nullを返すこと', async () => {
      // 準備
      const parentId = new ParentId(999);
      const mockSupabaseResponse = {
        data: null,
        error: null
      };

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockSupabaseResponse)
        })
      });

      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect
      });

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).toBeNull();
    });

    test('family_membersデータがない場合、nullを返すこと', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockData = {
        id: 1,
        family_id: 1,
        family_member_id: 1,
        family_members: null
      };

      const mockSupabaseResponse = {
        data: mockData,
        error: null
      };

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockSupabaseResponse)
        })
      });

      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect
      });

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).toBeNull();
    });

    test('予期しないエラーが発生した場合、nullを返すこと', async () => {
      // 準備
      const parentId = new ParentId(1);

      (supabase.from as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).toBeNull();
    });
  });

  describe('配列データの処理', () => {
    test('family_membersが配列として返された場合でも正しく処理すること', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockData = {
        id: 1,
        family_id: 1,
        family_member_id: 1,
        family_members: [{
          user_id: 'test-user-id',
          name: 'テスト親',
          icon_id: null,
          birthday: '1990-01-01'
        }]
      };

      const mockSupabaseResponse = {
        data: mockData,
        error: null
      };

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(mockSupabaseResponse)
        })
      });

      (supabase.from as jest.Mock).mockReturnValue({
        select: mockSelect
      });

      // 実行
      const result = await fetchParentForm(parentId);

      // 検証
      expect(result).not.toBeNull();
      expect(result?.name.value).toBe('テスト親');
    });
  });
});
