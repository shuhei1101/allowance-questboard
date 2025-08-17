import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  selectedIcon?: string;
  onPress: () => void;
  error?: string;
}

/**
 * アイコン選択エントリーコンポーネント
 * EntryFieldとFieldWithErrorでラップしたアイコン選択ボタン
 */
export const IconSelectButtonEntry: React.FC<Props> = ({ selectedIcon, onPress, error }) => {
  const { colors } = useTheme();

  return (
    <EntryField
      icon="diamond"
      title="アイコン"
      required={false}
    >
      <FieldWithError error={error}>
        <TouchableOpacity 
          style={[styles.button, { borderColor: colors.border.light }]}
          onPress={onPress}
        >
          <View style={styles.content}>
            {selectedIcon ? (
              <View style={[styles.iconContainer, { backgroundColor: colors.background.primary }]}>
                <Text style={styles.iconText}>{selectedIcon}</Text>
              </View>
            ) : (
              <View style={[styles.iconContainer, { backgroundColor: colors.background.primary }]}>
                <Text style={[styles.placeholderText, { color: colors.text.secondary }]}>
                  選択してください
                </Text>
              </View>
            )}
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.text.secondary} 
            />
          </View>
        </TouchableOpacity>
      </FieldWithError>
    </EntryField>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  placeholderText: {
    fontSize: 12,
  },
});
