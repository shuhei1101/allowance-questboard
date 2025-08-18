import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';

interface Props {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

/**
 * 誕生日入力フィールドコンポーネント
 * 一旦はメッセージ表示のみ（DateTimePicker未インストールのため）
 */
export const BirthdayInputField: React.FC<Props> = ({ value, onChange, error }) => {
  const { colors } = useTheme();

  const showDatePicker = () => {
    Alert.alert('誕生日選択', 'DateTimePickerを実装予定です');
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <FieldWithError error={error}>
      <EntryField
        icon="diamond"
        title="誕生日"
        required={true}
      >
        <TouchableOpacity 
          style={[styles.input, { 
            borderColor: error ? colors.danger : colors.border.light,
            backgroundColor: colors.background.secondary 
          }]}
          onPress={showDatePicker}
        >
          <Text style={[
            styles.text, 
            { color: value ? colors.text.primary : colors.text.secondary }
          ]}>
            {value ? formatDisplayDate(value) : 'YYYY/MM/DD'}
          </Text>
        </TouchableOpacity>
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
    minHeight: 48,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});
