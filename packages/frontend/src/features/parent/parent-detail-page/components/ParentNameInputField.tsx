import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';

interface Props {
  value: string;
  onChange: (text: string) => void;
  error?: string;
}

/**
 * 親の名前入力フィールドコンポーネント
 */
export const ParentNameInputField: React.FC<Props> = ({ value, onChange, error }) => {
  const { colors } = useTheme();

  return (
    <FieldWithError error={error}>
      <EntryField
        icon="diamond"
        title="名前"
        required={true}
      >
        <TextInput
          style={[styles.input, { 
            borderColor: error ? colors.danger : colors.border.light,
            backgroundColor: colors.background.secondary,
            color: colors.text.primary
          }]}
          value={value}
          onChangeText={onChange}
          placeholder="名前を入力してください"
          placeholderTextColor={colors.text.secondary}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </EntryField>
    </FieldWithError>
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
