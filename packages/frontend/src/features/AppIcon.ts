import * as LucideIcons from "lucide-react-native";

export class Icon {
  readonly id: number;
  readonly name: string;
  readonly component: React.ComponentType<{ size?: number; color?: string }>;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.component = (LucideIcons as any)[name] ?? LucideIcons.HelpCircle;
  }
}