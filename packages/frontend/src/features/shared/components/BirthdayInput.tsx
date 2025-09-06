import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EntryFrame } from '@/core/components/EntryFrame';
import { EntryWithError } from '@/core/components/EntryWithError';
import { useTheme } from '@/core/theme';

interface Props {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

/**
 * 誕生日入力フィールドコンポーネント
 * DateTimePickerを使用したカレンダー式誕生日選択
 */
export const BirthdayInput: React.FC<Props> = ({ value, onChange, error }) => {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const currentDate = value ? new Date(value) : new Date();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate.toISOString());
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <EntryWithError error={error}>
      <EntryFrame
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
        
        {showPicker && (
          <DateTimePicker
            value={currentDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </EntryFrame>
    </EntryWithError>
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
