import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { EntryLayout } from '@/core/components/EntryLayout';
import { EntryWithError } from '@/core/components/EntryWithError';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { ParentName } from '@backend/features/parent/value-object/parentName';

interface Props {
  value: ParentName;
  onChange: (value: ParentName) => void;
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
    <EntryLayout
      icon="person"
      title={t('parent.parentEditPage.components.parentNameInputFieldEntry.fieldTitle')}
      required={true}
    >
      <EntryWithError error={error}>
        <TextInput
          style={[styles.input, { 
            borderColor: error ? colors.danger : colors.border.light,
            backgroundColor: colors.background.secondary,
            color: colors.text.primary
          }]}
          value={value.value}
          onChangeText={(text) => onChange(new ParentName(text))}
          placeholder={t('parent.parentEditPage.components.parentNameInputFieldEntry.placeholder')}
          placeholderTextColor={colors.text.secondary}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </EntryWithError>
    </EntryLayout>
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
