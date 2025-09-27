import React, { ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';

interface NavigationEntryLayoutProps {
  /** 現在の設定値（右側の矢印の左に表示される内容） */
  children: ReactNode;
  /** タップ時のコールバック */
  onPress: () => void;
  /** 無効状態 */
  disabled?: boolean;
}

/** ナビゲーション用エントリーレイアウト
 * 
 * 右端に矢印アイコンを表示し、タップで画面遷移を行うためのレイアウトコンポーネント
 * EntryLayoutの子要素として使用することを前提とする */
export const NavigationEntryLayout: React.FC<NavigationEntryLayoutProps> = ({
  children,
  onPress,
  disabled = false,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.background.secondary,
          borderColor: colors.border.light,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {/* 現在の値（右側の矢印の左に表示） */}
      <View style={styles.valueContainer}>
        {children}
      </View>
      
      {/* 右側の矢印アイコン */}
      <View style={styles.arrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={disabled ? colors.text.disabled : colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
    
  },
  arrowContainer: {
    flexShrink: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


interface NavigationEntryTextProps {
  /** 表示するテキスト */
  children: string;
}

/** NavigationEntryLayout内で使用するテキストコンポーネント
 * 
 * 文字色を少し薄くして表示する */
export const NavigationEntryText: React.FC<NavigationEntryTextProps> = ({
  children,
}) => {
  const { colors } = useTheme();
  
  return (
    <Text style={[{ fontSize: 16, color: colors.text.secondary }]}>
      {children}
    </Text>
  );
};
