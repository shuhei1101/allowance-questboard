import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';

export interface FamilyIdInputProps {
  /** 入力値 */
  value: FamilyDisplayId;
  /** 値変更時のコールバック */
  onChange: (value: FamilyDisplayId) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
}

/** 家族ID入力コンポーネント
 * 
 * 入力欄の前に"@"マークを表示する家族ID入力コンポーネント */
export const FamilyIdInput: React.FC<FamilyIdInputProps> = ({
  value,
  onChange,
  placeholder = 'tanaka_family',
  error,
  disabled = false,
}) => {
  const { colors } = useTheme();

  /** TextInputからの文字列入力をFamilyDisplayIdに変換してonChangeに渡す */
  const handleTextChange = (text: string) => {
    const familyDisplayId = new FamilyDisplayId(text);
    onChange(familyDisplayId);
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        {
          backgroundColor: colors.background.secondary,
          borderColor: error ? colors.danger : colors.border.light,
        },
        disabled && styles.disabled,
      ]}>
        <Text style={[
          styles.prefix,
          { color: colors.text.secondary },
        ]}>
          @
        </Text>
        <TextInput
          style={[
            styles.textInput,
            { color: colors.text.primary },
          ]}
          value={value.value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          editable={!disabled}
        />
      </View>
      {error && (
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  prefix: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
