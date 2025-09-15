import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyName } from '@backend/features/family/value-object/familyName';

interface Props {
  /** 表示する家族名 */
  familyName: FamilyName;
}

/** 家族名表示ラベルコンポーネント
 * 
 * 家族名を美しく表示するためのラベル */
export const FamilyNameLabel: React.FC<Props> = ({ familyName }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.elevated }]}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>
        家族名
      </Text>
      <Text style={[styles.familyName, { color: colors.text.primary }]}>
        {familyName.value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  familyName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
