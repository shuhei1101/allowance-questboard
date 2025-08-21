import { BaseCollection } from "@backend/core/models/baseCollection";
import { AppIcon } from "./AppIcon";
import { Icons } from "@backend/features/icon/domain/icons";
import { AppError } from "@backend/core/errors/appError";
import { Icon } from "@backend/features/icon/domain/icon";

export class AppIcons extends BaseCollection<AppIcon, Icon> {
  protected updateCustomIndex(): void {
    // AppIconsはカスタムインデックスを持たないため、何もしない
  }

  static fromIcons(icons: Icons): AppIcons {
    const appIconList: AppIcon[] = [];
    for (const icon of icons.items) {
      try {
        appIconList.push(AppIcon.fromName(icon));
      } catch (error) {
        if (error instanceof AppError) {
          console.error(`Error creating AppIcon from Icon: ${icon.name.value}`, error);
        } else {
          throw error; // 他のエラーは再スロー
        }
      }
    }
    return new AppIcons(appIconList);
  }    
}
