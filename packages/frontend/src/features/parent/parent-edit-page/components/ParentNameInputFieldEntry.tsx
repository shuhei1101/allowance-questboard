import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface Props {
  value: string;
  onChange: (text: string) => void;
  error?: string;
}

/**
 * 親の名前入力エントリーコンポーネント
 * EntryFieldとFieldWithErrorでラップした親の名前入力フィールド
 */
export const ParentNameInputFieldEntry: React.FC<Props> = ({ value, onChange, error }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <EntryField
      icon="person"
      title={t('parent.parentEditPage.components.parentNameInputFieldEntry.fieldTitle')}
      required={true}
    >
      <FieldWithError error={error}>
        <TextInput
          style={[styles.input, { 
            borderColor: error ? colors.danger : colors.border.light,
            backgroundColor: colors.background.secondary,
            color: colors.text.primary
          }]}
          value={value}
          onChangeText={onChange}
          placeholder={t('parent.parentEditPage.components.parentNameInputFieldEntry.placeholder')}
          placeholderTextColor={colors.text.secondary}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </FieldWithError>
    </EntryField>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
});
