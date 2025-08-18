import { IconCategory } from '../../../../src/features/icon-category/domain/iconCategory';
import { IconCategoryId } from '../../../../src/features/icon-category/value-objects/iconCategoryId';
import { IconCategoryNames } from '../../../../src/features/icon-category/value-objects/iconCategoryNames';
import { Version } from '../../../../src/features/shared/value-object/version';
import { Icons } from '../../../../src/features/icon/domain/icons';
import { Icon } from '../../../../src/features/icon/domain/icon';
import { IconId } from '../../../../src/features/icon/value-objects/iconId';
import { IconName } from '../../../../src/features/icon/value-objects/iconName';
import { SortOrder } from '../../../../src/features/shared/value-object/sortOrder';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../../../../src/features/icon-category/entity/iconCategoryEntity';

describe('IconCategory', () => {
  let iconCategoryId: IconCategoryId;
  let version: Version;
  let iconCategoryNames: IconCategoryNames;
  let icons: Icons;
  let icon1: Icon;
  let icon2: Icon;
  let icon3: Icon;

  beforeEach(() => {
    iconCategoryId = new IconCategoryId(1);
    version = new Version(1);
    iconCategoryNames = IconCategoryNames.fromEmpty();

    icon1 = new Icon(
      new IconId(1),
      new Version(1),
      new IconName('home'),
      new SortOrder(10),
      true,
      iconCategoryId
    );

    icon2 = new Icon(
      new IconId(2),
      new Version(1),
      new IconName('settings'),
      new SortOrder(20),
      false,
      iconCategoryId
    );

    icon3 = new Icon(
      new IconId(3),
      new Version(1),
      new IconName('user'),
      new SortOrder(5),
      true,
      iconCategoryId
    );

    icons = new Icons([icon1, icon2, icon3]);
  });

  describe('constructor', () => {
    it('正常にインスタンスを作成できること', () => {
      const iconCategory = new IconCategory(
        iconCategoryId,
        version,
        iconCategoryNames,
        10,
        true,
        icons
      );

      expect(iconCategory.id).toBe(iconCategoryId);
      expect(iconCategory.nameByLanguages).toBe(iconCategoryNames);
      expect(iconCategory.sortOrder).toBe(10);
      expect(iconCategory.isActive).toBe(true);
      expect(iconCategory.icons).toBe(icons);
    });

    it('デフォルト値で正常にインスタンスを作成できること', () => {
      const iconCategory = new IconCategory(iconCategoryId, version);

      expect(iconCategory.id).toBe(iconCategoryId);
      expect(iconCategory.sortOrder).toBe(0);
      expect(iconCategory.isActive).toBe(true);
      expect(iconCategory.icons.length).toBe(0);
    });
  });

  describe('fromEntity', () => {
    it('エンティティからドメインモデルを正常に生成できること', () => {
      const entity = new IconCategoryEntity();
      entity.id = 1;
      entity.version = 1;
      entity.sort_order = 10;
      entity.is_active = true;

      const translationDict: { [languageId: number]: IconCategoryTranslationEntity } = {};

      const iconCategory = IconCategory.fromEntity(entity, translationDict, icons);

      expect(iconCategory.id.value).toBe(1);
      expect(iconCategory.sortOrder).toBe(10);
      expect(iconCategory.isActive).toBe(true);
      expect(iconCategory.icons).toBe(icons);
    });

    it('iconsを省略した場合、空のコレクションで初期化されること', () => {
      const entity = new IconCategoryEntity();
      entity.id = 1;
      entity.version = 1;
      entity.sort_order = 10;
      entity.is_active = true;

      const translationDict: { [languageId: number]: IconCategoryTranslationEntity } = {};

      const iconCategory = IconCategory.fromEntity(entity, translationDict);

      expect(iconCategory.id.value).toBe(1);
      expect(iconCategory.sortOrder).toBe(10);
      expect(iconCategory.isActive).toBe(true);
      expect(iconCategory.icons.length).toBe(0);
    });
  });

  describe('getActiveIcons', () => {
    it('アクティブなアイコンのみを取得できること', () => {
      const iconCategory = new IconCategory(
        iconCategoryId,
        version,
        iconCategoryNames,
        10,
        true,
        icons
      );

      const activeIcons = iconCategory.getActiveIcons();

      expect(activeIcons.length).toBe(2);
      expect(activeIcons.get(icon1.id)).toBeTruthy();
      expect(activeIcons.get(icon3.id)).toBeTruthy();
      expect(activeIcons.get(icon2.id)).toBeNull();
    });
  });

  describe('getActiveSortedIcons', () => {
    it('アクティブかつソート順で並べ替えたアイコンを取得できること', () => {
      const iconCategory = new IconCategory(
        iconCategoryId,
        version,
        iconCategoryNames,
        10,
        true,
        icons
      );

      const activeSortedIcons = iconCategory.getActiveSortedIcons();
      const iconList = activeSortedIcons.items;

      expect(activeSortedIcons.length).toBe(2);
      expect(iconList[0]).toBe(icon3); // sort_order: 5
      expect(iconList[1]).toBe(icon1); // sort_order: 10
    });
  });

  describe('toEntity', () => {
    it('ドメインモデルからエンティティを正常に生成できること', () => {
      const iconCategory = new IconCategory(
        iconCategoryId,
        version,
        iconCategoryNames,
        10,
        true,
        icons
      );

      const entity = iconCategory.toEntity();

      expect(entity.id).toBe(1);
      expect(entity.version).toBe(1);
      expect(entity.sort_order).toBe(10);
      expect(entity.is_active).toBe(true);
    });
  });

  describe('getters', () => {
    let iconCategory: IconCategory;

    beforeEach(() => {
      iconCategory = new IconCategory(
        iconCategoryId,
        version,
        iconCategoryNames,
        10,
        true,
        icons
      );
    });

    it('nameByLanguagesを正常に取得できること', () => {
      expect(iconCategory.nameByLanguages).toBe(iconCategoryNames);
    });

    it('sortOrderを正常に取得できること', () => {
      expect(iconCategory.sortOrder).toBe(10);
    });

    it('isActiveを正常に取得できること', () => {
      expect(iconCategory.isActive).toBe(true);
    });

    it('iconsを正常に取得できること', () => {
      expect(iconCategory.icons).toBe(icons);
    });
  });
});
