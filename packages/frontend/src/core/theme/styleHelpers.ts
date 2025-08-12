import { TextStyle, ViewStyle } from 'react-native';
import { useTheme } from './useTheme';
import { typography, spacing, borderRadius } from './spacing';

/**
 * よく使うスタイルのヘルパーフック
 */
export const useStyleHelpers = () => {
  const { colors, isDark } = useTheme();

  return {
    // カードスタイル
    card: {
      backgroundColor: colors.surface.elevated,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      ...(isDark 
        ? { borderWidth: 1, borderColor: colors.border.light } 
        : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }
      ),
    } as ViewStyle,

    // ボタンスタイル
    primaryButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center' as const,
    } as ViewStyle,

    secondaryButton: {
      backgroundColor: colors.surface.base,
      borderWidth: 1,
      borderColor: colors.border.medium,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center' as const,
    } as ViewStyle,

    // テキストスタイル
    primaryButtonText: {
      ...typography.button,
      color: colors.text.inverse,
    } as TextStyle,

    secondaryButtonText: {
      ...typography.button,
      color: colors.text.primary,
    } as TextStyle,

    bodyText: {
      ...typography.body,
      color: colors.text.primary,
    } as TextStyle,

    captionText: {
      ...typography.caption,
      color: colors.text.tertiary,
    } as TextStyle,

    // 入力フィールドスタイル
    inputField: {
      borderWidth: 1,
      borderColor: colors.border.light,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: typography.body.fontSize,
      backgroundColor: colors.surface.elevated,
      color: colors.text.primary,
    } as ViewStyle & TextStyle,

    inputFieldError: {
      borderColor: colors.danger,
    } as ViewStyle,
  };
};
