import { ReactNode } from 'react';

/** プロパティ設定項目の型定義 */
export interface ComponentPropConfig {
  /** プロパティ名 */
  name: string;
  /** 表示ラベル */
  label: string;
  /** プロパティの型 */
  type: 'string' | 'boolean' | 'number';
  /** プレースホルダー */
  placeholder?: string;
}

/** コンポーネント情報の型定義 */
export interface ComponentInfo {
  /** コンポーネント名 */
  name: string;
  /** アイコン */
  icon: string;
  /** 説明文 */
  description: string;
  /** デフォルトプロパティ */
  defaultProps: Record<string, any>;
  /** プロパティ設定項目一覧 */
  props: ComponentPropConfig[];
  /** 使用例コード */
  usage: string;
}

/** デモコンポーネントの共通プロパティ */
export interface ComponentDemoProps {
  /** 現在のプロパティ値 */
  componentProps: Record<string, any>;
  /** プロパティ更新関数 */
  updateProp: (key: string, value: any) => void;
}

/** デモコンポーネントの型定義 */
export interface ComponentDemo {
  /** コンポーネント情報 */
  info: ComponentInfo;
  /** コンポーネントレンダー関数 */
  renderComponent: (props: ComponentDemoProps) => ReactNode;
}
