import React from 'react';
import * as LucideIcons from 'lucide-react-native';

type Props = {
  /**
   * Lucideアイコン名
   */
  iconName: keyof typeof LucideIcons;
  /**
   * アイコンサイズ
   */
  size?: number;
  /**
   * アイコンカラー
   */
  color?: string;
};

/**
 * 動的Lucideアイコンコンポーネント
 * 
 * DBに保存されたアイコン名から動的にLucideのアイコンを表示する
 */
export const DynamicLucideIcon: React.FC<Props> = ({ 
  iconName, 
  size = 24, 
  color = 'black' 
}) => {
  const Icon = LucideIcons[iconName];
  
  if (!Icon) {
    // アイコンが存在しない場合はデフォルトアイコンを表示
    const DefaultIcon = LucideIcons.HelpCircle;
    return <DefaultIcon size={size} color={color} />;
  }

  return <Icon size={size} color={color} />;
};
