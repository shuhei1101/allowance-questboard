import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';

interface EntryFieldProps {
  /** タイトルの左のアイコン */
  icon: keyof typeof Ionicons.glyphMap;
  /** タイトル部分 */
  title: string;
  /** 必須アイコン（*マーク）を表示するか */
  required?: boolean;
  /** 内部の要素（入力フィールドなど） */
  children: ReactNode;
}

/**
 * エントリーフィールド
 * アイコン付きタイトルと必須マーク、内部要素を含むフィールドコンテナ
 */
export const EntryField: React.FC<EntryFieldProps> = ({
  icon,
  title,
  required = false,
  children,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* タイトル部分 */}
      <View style={styles.titleContainer}>
        <View style={styles.titleLeft}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={colors.text.primary} 
            style={styles.titleIcon}
          />
          <Text style={[styles.titleText, { color: colors.text.primary }]}>
            {title}
          </Text>
        </View>
        {required && (
          <Text style={[styles.requiredMark, { color: colors.danger }]}>
            *
          </Text>
        )}
      </View>
      
      {/* 内部要素 */}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  requiredMark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingLeft: 28, // アイコン分のインデント
  },
});
