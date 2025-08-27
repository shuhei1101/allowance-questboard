import { parentQuery, ParentQueryParams, ParentQueryResult } from '../../../../src/features/parent/query/parentQuery';
import { ParentEntity } from '../../../../src/features/parent/entity/parentEntity';
import { FamilyMemberEntity } from '../../../../src/features/family-member/entity/familyMemberEntity';

describe('parentQuery', () => {

  // mockSessionの作成
  const createMockSession = () => ({
    createQueryBuilder: jest.fn()
  });

  describe('正常系', () => {
    it('親IDから親情報と家族メンバー情報を取得できること', async () => {
      // 準備
      const mockSession = createMockSession();
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          parent_id: 1,
          family_member_id: 10,
          name: '山田太郎',
          icon_id: 5,
          birthday: '1980-01-01'
        })
      };
      
      mockSession.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      
      const params: ParentQueryParams = {
        session: mockSession as any,
        parentId: 1
      };

      // 実行
      const result = await parentQuery(params);

      // 検証
      expect(mockSession.createQueryBuilder).toHaveBeenCalledWith(ParentEntity, 'p');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(FamilyMemberEntity, 'fm', 'p.family_member_id = fm.id');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'p.id as parent_id',
        'p.family_member_id as family_member_id',
        'fm.name as name',
        'fm.icon_id as icon_id',
        'fm.birthday as birthday'
      ]);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('p.id = :parentId', { parentId: 1 });
      
      const expected: ParentQueryResult = {
        parentId: 1,
        familyMemberId: 10,
        name: '山田太郎',
        iconId: 5,
        birthday: '1980-01-01'
      };
      expect(result).toEqual(expected);
    });

    it('アイコンIDがundefinedの場合もundefinedで返却できること', async () => {
      // 準備
      const mockSession = createMockSession();
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          parent_id: 2,
          family_member_id: 20,
          name: '田中花子',
          icon_id: undefined,
          birthday: '1985-05-15'
        })
      };
      
      mockSession.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      
      const params: ParentQueryParams = {
        session: mockSession as any,
        parentId: 2
      };

      // 実行
      const result = await parentQuery(params);

      // 検証
      const expected: ParentQueryResult = {
        parentId: 2,
        familyMemberId: 20,
        name: '田中花子',
        iconId: undefined,
        birthday: '1985-05-15'
      };
      expect(result).toEqual(expected);
    });
  });

  describe('異常系', () => {
    it('親IDが見つからない場合エラーが発生すること', async () => {
      // 準備
      const mockSession = createMockSession();
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(undefined)
      };
      
      mockSession.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      
      const params: ParentQueryParams = {
        session: mockSession as any,
        parentId: 999
      };

      // 実行・検証
      await expect(parentQuery(params)).rejects.toThrow('親ID 999 が見つかりません');
    });
  });

});
