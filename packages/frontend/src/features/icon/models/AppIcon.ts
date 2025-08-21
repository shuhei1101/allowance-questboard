import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";
import { CollectionItemProtocol } from "@backend/core/models/baseCollection";
import { Icon } from "@backend/features/icon/domain/icon";
import * as LucideIcons from 'lucide-react-native';

/**
 * アプリケーションで使用するアイコンモデル
 */
export class AppIcon implements CollectionItemProtocol<Icon> {
  /**
   * アイコン名
   */
  readonly icon: Icon;
  
  /**
   * LucideIconオブジェクト
   */
  readonly obj: React.ComponentType<LucideIcons.LucideProps>;

  constructor(icon: Icon, obj: React.ComponentType<LucideIcons.LucideProps>) {
    this.icon = icon;
    this.obj = obj;
  }
  
  get key(): Icon {
    return this.icon;
  }

  /**
   * アイコン名から生成
   */
  static fromName(icon: Icon): AppIcon {
    const obj = (LucideIcons as any)[icon.name.value];
    if (!obj) {
      throw new AppError({
        errorType: "IconNotFound",
        message: new LocaleString({
          ja: "指定されたアイコンが見つかりません",
          en: "The specified icon was not found"
        })
      })
    }
    return new AppIcon(icon, obj);
  }
}
