/**
 * スペーシング（余白）定数
 * 8の倍数ベースで統一性のあるレイアウト
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const;

/**
 * タイポグラフィ定数
 * iOS Human Interface Guidelines準拠
 */
export const typography = {
  // ヘッダー系
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    lineHeight: 26,
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    lineHeight: 24,
  },
  
  // ボディ系
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  
  // キャプション・ラベル系
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  
  // ボタン系
  button: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    lineHeight: 20,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    lineHeight: 18,
  },
} as const;

/**
 * ボーダーRadius定数
 */
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;
