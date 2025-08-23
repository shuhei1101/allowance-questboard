import { fetchParentForm } from '../../../../src/features/parent/parent-edit-page/services/fetchParentForm';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentRouter, ParentResponse } from '@backend/features/parent/router/parentRouter';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { AppConstants } from '@/core/constants/appConstants';
import { AppError } from '@backend/core/errors/appError';

// AppConstantsのモック
jest.mock('@/core/constants/appConstants', () => ({
  AppConstants: {
    iconCategories: {
      getAllIcons: jest.fn()
    }
  }
}));

describe('fetchParentForm', () => {

  const mockRouter: ParentRouter = {
    query: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('正常系', () => {
    it('親情報を取得してParentFormに変換できること', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockResponse: ParentResponse = {
        parentId: 1,
        familyMemberId: 10,
        name: '山田太郎',
        iconId: 5,
        birthday: '1980-01-01'
      };
      
      const mockIcon = { id: new IconId(5), name: 'テストアイコン' };
      const mockIconsMap = new Map();
      mockIconsMap.set(new IconId(5), mockIcon);
      
      (mockRouter.query as jest.Mock).mockResolvedValue(mockResponse);
      (AppConstants.iconCategories?.getAllIcons as jest.Mock).mockReturnValue(mockIconsMap);

      // 実行
      const result = await fetchParentForm({
        parentId,
        router: mockRouter
      });

      // 検証
      expect(mockRouter.query).toHaveBeenCalledWith({ parentId: 1 });
      expect(result.name).toEqual(new ParentName('山田太郎'));
      expect(result.email).toEqual(new Email(''));
      expect(result.password).toEqual(new Password(''));
      expect(result.icon).toEqual(mockIcon);
      expect(result.birthday).toEqual(new Birthday(new Date('1980-01-01')));
    });

    it('アイコンIDがnullの場合iconもnullになること', async () => {
      // 準備
      const parentId = new ParentId(2);
      const mockResponse: ParentResponse = {
        parentId: 2,
        familyMemberId: 20,
        name: '田中花子',
        iconId: null,
        birthday: '1985-05-15'
      };
      
      (mockRouter.query as jest.Mock).mockResolvedValue(mockResponse);

      // 実行
      const result = await fetchParentForm({
        parentId,
        router: mockRouter
      });

      // 検証
      expect(result.name).toEqual(new ParentName('田中花子'));
      expect(result.icon).toBeNull();
      expect(result.birthday).toEqual(new Birthday(new Date('1985-05-15')));
    });

    it('アイコンが見つからない場合iconはnullになること', async () => {
      // 準備
      const parentId = new ParentId(3);
      const mockResponse: ParentResponse = {
        parentId: 3,
        familyMemberId: 30,
        name: '佐藤次郎',
        iconId: 999,
        birthday: '1990-12-25'
      };
      
      const mockIconsMap = new Map(); // 空のマップ
      
      (mockRouter.query as jest.Mock).mockResolvedValue(mockResponse);
      (AppConstants.iconCategories?.getAllIcons as jest.Mock).mockReturnValue(mockIconsMap);

      // 実行
      const result = await fetchParentForm({
        parentId,
        router: mockRouter
      });

      // 検証
      expect(result.name).toEqual(new ParentName('佐藤次郎'));
      expect(result.icon).toBeNull();
    });
  });

  describe('異常系', () => {
    it('API呼び出しでエラーが発生した場合AppErrorが発生すること', async () => {
      // 準備
      const parentId = new ParentId(1);
      const mockError = new Error('API Error');
      
      (mockRouter.query as jest.Mock).mockRejectedValue(mockError);

      // 実行・検証
      await expect(fetchParentForm({
        parentId,
        router: mockRouter
      })).rejects.toThrow(AppError);
    });
  });

});
