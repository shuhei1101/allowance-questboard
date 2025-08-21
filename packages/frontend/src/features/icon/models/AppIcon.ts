import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";
import { CollectionItemProtocol } from "@backend/core/models/baseCollection";
import { IconName } from "@backend/features/icon/value-objects/iconName";
import * as LucideIcons from 'lucide-react-native';

/**
 * アプリケーションで使用するアイコンモデル
 */
export class AppIcon implements CollectionItemProtocol<IconName> {
  /**
   * アイコン名
   */
  readonly name: IconName;
  
  /**
   * LucideIconオブジェクト
   */
  readonly icon: React.ComponentType<LucideIcons.LucideProps>;

  constructor(name: IconName, icon: React.ComponentType<LucideIcons.LucideProps>) {
    this.name = name;
    this.icon = icon;
  }
  
  get key(): IconName {
    return this.name;
  }

  /**
   * アイコン名から生成
   */
  static fromName(iconName: IconName): AppIcon {
    const icon = (LucideIcons as any)[iconName.value];
    if (!icon) {
      throw new AppError({
        errorType: "IconNotFound",
        message: new LocaleString({
          ja: "指定されたアイコンが見つかりません",
          en: "The specified icon was not found"
        })
      })
    }
    return new AppIcon(iconName, icon);
  }
}
