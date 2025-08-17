import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

interface ErrorIconProps {
  /** アイコンの表示内容（デフォルト: ⚠️） */
  icon?: string;
  /** アイコンのサイズ（デフォルト: 80） */
  size?: number;
}

/**
 * エラーアイコンコンポーネント
 * 
 * エラー画面で表示される警告アイコン
 */
export const ErrorIcon: React.FC<ErrorIconProps> = ({
  icon = '⚠️',
  size = 80,
}) => {
  const { colors } = useTheme();

  const iconContainerSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const iconFontSize = {
    fontSize: size / 2,
  };

  return (
    <View style={[styles.iconContainer, iconContainerSize, { backgroundColor: colors.danger }]}>
      <Text style={[styles.iconText, iconFontSize]}>
        {icon}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    textAlign: 'center',
  },
});
