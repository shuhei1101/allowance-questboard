import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/core/i18n/useTranslation';

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
  const { t } = useTranslation();

  const handlePress = () => {
    // TODO: アイコン選択画面の実装後にonPress()に変更
    Alert.alert('アイコン選択', 'アイコン選択画面は未実装です');
  };

  return (
    <EntryField
      icon="happy"
      title={t('shared.components.iconSelectButtonEntry.fieldTitle')}
      required={false}
    >
      <FieldWithError error={error}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
        >
          <View style={styles.content}>
            {selectedIcon ? (
              <>
                <Text style={[styles.iconText, { color: colors.text.primary }]}>
                  {selectedIcon}
                </Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.text.secondary} 
                />
              </>
            ) : (
              <>
                <Text style={[styles.noSelectionText, { color: colors.text.secondary }]}>
                  設定なし
                </Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.text.secondary} 
                />
              </>
            )}
          </View>
        </TouchableOpacity>
      </FieldWithError>
    </EntryField>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    fontSize: 24,
  },
  noSelectionText: {
    fontSize: 16,
  },
});
