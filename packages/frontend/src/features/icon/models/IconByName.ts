import { BaseCollection } from "@backend/core/models/baseCollection";
import { AppIcon } from "./AppIcon";
import { IconName } from "@backend/features/icon/value-objects/iconName";
import { Icons } from "@backend/features/icon/domain/icons";
import { AppError } from "@backend/core/errors/appError";

export class IconByName extends BaseCollection<AppIcon, IconName> {
  protected updateCustomIndex(): void {
    // AppIconsはカスタムインデックスを持たないため、何もしない
  }

  static fromIcons(icons: Icons): IconByName {
    const appIcons: AppIcon[] = [];
    for (const icon of icons.items) {
      try {
        appIcons.push(AppIcon.fromName(icon.name));
      } catch (error) {
        if (error instanceof AppError) {
          console.error(`Error creating AppIcon from Icon: ${icon.name.value}`, error);
        } else {
          throw error; // 他のエラーは再スロー
        }
      }
    }
    return new IconByName(appIcons);
  }    
}
