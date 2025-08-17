import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

interface SubEntryFieldProps {
  /** 左側のタイトル */
  title: string;
  /** 必須アイコン（*マーク）を表示するか */
  required?: boolean;
  /** 右側部分（ドロップダウン、テキストフィールドなど） */
  children: ReactNode;
}

/**
 * サブエントリーフィールド
 * 左側にタイトル、右側に入力要素を配置する横並びレイアウトコンポーネント
 */
export const SubEntryField: React.FC<SubEntryFieldProps> = ({
  title,
  required = false,
  children,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* 左側のタイトル部分 */}
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: colors.text.primary }]}>
          {title}
        </Text>
        {required && (
          <Text style={[styles.requiredMark, { color: colors.danger }]}>
            *
          </Text>
        )}
      </View>
      
      {/* 右側の入力要素 */}
      <View style={styles.inputContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  requiredMark: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  inputContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
});
