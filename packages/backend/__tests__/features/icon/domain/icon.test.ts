import { Icon } from '../../../../src/features/icon/domain/icon';
import { IconId } from '../../../../src/features/icon/value-objects/iconId';
import { IconName } from '../../../../src/features/icon/value-objects/iconName';
import { SortOrder } from '../../../../src/features/shared/value-object/sortOrder';
import { Version } from '../../../../src/features/shared/value-object/version';
import { IconCategoryId } from '../../../../src/features/icon-category/value-objects/iconCategoryId';
import { IconEntity } from '../../../../src/features/icon/entity/iconEntity';

describe('Icon', () => {
  let iconId: IconId;
  let version: Version;
  let iconName: IconName;
  let sortOrder: SortOrder;
  let iconCategoryId: IconCategoryId;

  beforeEach(() => {
    iconId = new IconId(1);
    version = new Version(1);
    iconName = new IconName('home');
    sortOrder = new SortOrder(10);
    iconCategoryId = new IconCategoryId(1);
  });

  describe('constructor', () => {
    it('正常にインスタンスを作成できること', () => {
      const icon = new Icon(iconId, version, iconName, sortOrder, true, iconCategoryId);
      
      expect(icon.id).toBe(iconId);
      expect(icon.name).toBe(iconName);
      expect(icon.sortOrder).toBe(sortOrder);
      expect(icon.isActive).toBe(true);
      expect(icon.iconCategoryId).toBe(iconCategoryId);
    });

    it('デフォルト値で正常にインスタンスを作成できること', () => {
      const icon = new Icon(iconId, version, iconName);
      
      expect(icon.id).toBe(iconId);
      expect(icon.name).toBe(iconName);
      expect(icon.sortOrder.value).toBe(0);
      expect(icon.isActive).toBe(true);
      expect(icon.iconCategoryId).toBeUndefined();
    });
  });

  describe('fromEntity', () => {
    it('エンティティからドメインモデルを正常に生成できること', () => {
      const entity = new IconEntity();
      entity.id = 1;
      entity.version = 1;
      entity.name = 'home';
      entity.sort_order = 10;
      entity.is_active = true;
      entity.category_id = 1;

      const icon = Icon.fromEntity(entity);

      expect(icon.id.value).toBe(1);
      expect(icon.name.value).toBe('home');
      expect(icon.sortOrder.value).toBe(10);
      expect(icon.isActive).toBe(true);
      expect(icon.iconCategoryId?.value).toBe(1);
    });

    it('カテゴリIDがnullの場合、undefinedで設定されること', () => {
      const entity = new IconEntity();
      entity.id = 1;
      entity.version = 1;
      entity.name = 'bell';
      entity.sort_order = 20;
      entity.is_active = false;
      entity.category_id = undefined;

      const icon = Icon.fromEntity(entity);

      expect(icon.id.value).toBe(1);
      expect(icon.name.value).toBe('bell');
      expect(icon.sortOrder.value).toBe(20);
      expect(icon.isActive).toBe(false);
      expect(icon.iconCategoryId).toBeUndefined();
    });
  });

  describe('toEntity', () => {
    it('ドメインモデルからエンティティを正常に生成できること', () => {
      const icon = new Icon(iconId, version, iconName, sortOrder, true, iconCategoryId);

      const entity = icon.toEntity();

      expect(entity.id).toBe(1);
      expect(entity.version).toBe(1);
      expect(entity.name).toBe('home');
      expect(entity.sort_order).toBe(10);
      expect(entity.is_active).toBe(true);
      expect(entity.category_id).toBe(1);
    });

    it('アイコンカテゴリIDがundefinedの場合、undefinedで設定されること', () => {
      const icon = new Icon(iconId, version, iconName, sortOrder, false);

      const entity = icon.toEntity();

      expect(entity.id).toBe(1);
      expect(entity.version).toBe(1);
      expect(entity.name).toBe('home');
      expect(entity.sort_order).toBe(10);
      expect(entity.is_active).toBe(false);
      expect(entity.category_id).toBeUndefined();
    });
  });

  describe('getters', () => {
    let icon: Icon;

    beforeEach(() => {
      icon = new Icon(iconId, version, iconName, sortOrder, true, iconCategoryId);
    });

    it('iconCategoryIdを正常に取得できること', () => {
      expect(icon.iconCategoryId).toBe(iconCategoryId);
    });

    it('nameを正常に取得できること', () => {
      expect(icon.name).toBe(iconName);
    });

    it('sortOrderを正常に取得できること', () => {
      expect(icon.sortOrder).toBe(sortOrder);
    });

    it('isActiveを正常に取得できること', () => {
      expect(icon.isActive).toBe(true);
    });
  });
});
