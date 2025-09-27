import { ComponentDemo } from './types';

// Inputs
import { EmailInputDemo } from './inputs/EmailInputDemo';
import { PasswordInputDemo } from './inputs/PasswordInputDemo';
import { BirthdayInputDemo } from './inputs/BirthdayInputDemo';
import { FamilyNameInputDemo } from './inputs/FamilyNameInputDemo';

// Buttons
import { SaveButtonDemo } from './buttons/SaveButtonDemo';
import { IconSelectButtonDemo } from './buttons/IconSelectButtonDemo';

// Layouts
import { NavigationEntryLayoutDemo } from './layouts/NavigationEntryLayoutDemo';

/** コンポーネントデモのレジストリ */
export const COMPONENT_DEMO_REGISTRY: Record<string, ComponentDemo> = {
  // Input系
  'email-input': EmailInputDemo,
  'password-input': PasswordInputDemo,
  'birthday-input': BirthdayInputDemo,
  'family-name-input': FamilyNameInputDemo,
  
  // Button系
  'save-button': SaveButtonDemo,
  'icon-select-button': IconSelectButtonDemo,
  
  // Layout系
  'navigation-entry-layout': NavigationEntryLayoutDemo,
};

/** コンポーネントデモを取得する関数 */
export const getComponentDemo = (componentType: string): ComponentDemo | undefined => {
  return COMPONENT_DEMO_REGISTRY[componentType];
};

/** すべてのコンポーネント一覧を取得する関数 */
export const getAllComponentTypes = (): string[] => {
  return Object.keys(COMPONENT_DEMO_REGISTRY);
};
