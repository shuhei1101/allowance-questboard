import { Icons } from '../../../../src/features/icon/domain/icons';
import { Icon } from '../../../../src/features/icon/domain/icon';
import { IconId } from '../../../../src/features/icon/value-objects/iconId';
import { IconName } from '../../../../src/features/icon/value-objects/iconName';
import { SortOrder } from '../../../../src/features/shared/value-object/sortOrder';
import { Version } from '../../../../src/features/shared/value-object/version';
import { IconCategoryId } from '../../../../src/features/icon-category/value-objects/iconCategoryId';

describe('Icons', () => {
  let icon1: Icon;
  let icon2: Icon;
  let icon3: Icon;
  let icon4: Icon;
  let icons: Icons;

  beforeEach(() => {
    icon1 = new Icon(
      new IconId(1),
      new Version(1),
      new IconName('home'),
      new SortOrder(10),
      true,
      new IconCategoryId(1)
    );

    icon2 = new Icon(
      new IconId(2),
      new Version(1),
      new IconName('settings'),
      new SortOrder(20),
      false,
      new IconCategoryId(1)
    );

    icon3 = new Icon(
      new IconId(3),
      new Version(1),
      new IconName('user'),
      new SortOrder(5),
      true,
      new IconCategoryId(2)
    );

    icon4 = new Icon(
      new IconId(4),
      new Version(1),
      new IconName('bell'),
      new SortOrder(30),
      true
      // category_id is undefined
    );

    icons = new Icons([icon1, icon2, icon3, icon4]);
  });

  describe('getActiveIcons', () => {
    it('アクティブなアイコンのみを取得できること', () => {
      const activeIcons = icons.getActiveIcons();
      
      expect(activeIcons).toHaveLength(3);
      expect(activeIcons).toContain(icon1);
      expect(activeIcons).toContain(icon3);
      expect(activeIcons).toContain(icon4);
      expect(activeIcons).not.toContain(icon2);
    });
  });

  describe('getSortedIcons', () => {
    it('ソート順で並べ替えたアイコンを取得できること', () => {
      const sortedIcons = icons.getSortedIcons();
      
      expect(sortedIcons).toHaveLength(4);
      expect(sortedIcons[0]).toBe(icon3); // sort_order: 5
      expect(sortedIcons[1]).toBe(icon1); // sort_order: 10
      expect(sortedIcons[2]).toBe(icon2); // sort_order: 20
      expect(sortedIcons[3]).toBe(icon4); // sort_order: 30
    });
  });

  describe('getActiveSortedIcons', () => {
    it('アクティブかつソート順で並べ替えたアイコンを取得できること', () => {
      const activeSortedIcons = icons.getActiveSortedIcons();
      
      expect(activeSortedIcons).toHaveLength(3);
      expect(activeSortedIcons[0]).toBe(icon3); // sort_order: 5, active: true
      expect(activeSortedIcons[1]).toBe(icon1); // sort_order: 10, active: true
      expect(activeSortedIcons[2]).toBe(icon4); // sort_order: 30, active: true
    });
  });

  describe('getByCategory', () => {
    it('指定したカテゴリのアイコンを取得できること', () => {
      const categoryId = new IconCategoryId(1);
      const categoryIcons = icons.getByCategory(categoryId);
      
      expect(categoryIcons).toHaveLength(2);
      expect(categoryIcons).toContain(icon1);
      expect(categoryIcons).toContain(icon2);
    });

    it('該当するカテゴリのアイコンがない場合は空配列を返すこと', () => {
      const categoryId = new IconCategoryId(999);
      const categoryIcons = icons.getByCategory(categoryId);
      
      expect(categoryIcons).toHaveLength(0);
    });
  });

  describe('getUncategorizedIcons', () => {
    it('カテゴリが未設定のアイコンを取得できること', () => {
      const uncategorizedIcons = icons.getUncategorizedIcons();
      
      expect(uncategorizedIcons).toHaveLength(1);
      expect(uncategorizedIcons).toContain(icon4);
    });
  });

  describe('getActiveByCategoryId', () => {
    it('指定したカテゴリのアクティブなアイコンを取得できること', () => {
      const categoryId = new IconCategoryId(1);
      const activeIcons = icons.getActiveByCategoryId(categoryId);
      
      expect(activeIcons).toHaveLength(1);
      expect(activeIcons).toContain(icon1);
      expect(activeIcons).not.toContain(icon2); // inactive
    });
  });

  describe('searchByName', () => {
    it('アイコン名で部分一致検索ができること', () => {
      const searchResults = icons.searchByName('se');
      
      expect(searchResults).toHaveLength(2);
      expect(searchResults).toContain(icon2); // 'settings'
      expect(searchResults).toContain(icon3); // 'user'
    });

    it('大文字小文字を区別せずに検索できること', () => {
      const searchResults = icons.searchByName('HOME');
      
      expect(searchResults).toHaveLength(1);
      expect(searchResults).toContain(icon1);
    });

    it('該当するアイコンがない場合は空配列を返すこと', () => {
      const searchResults = icons.searchByName('notfound');
      
      expect(searchResults).toHaveLength(0);
    });
  });
});
