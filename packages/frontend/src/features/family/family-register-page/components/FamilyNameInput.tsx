import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';
import { FamilyName } from '@backend/features/family/value-object/familyName';

export interface FamilyNameInputProps {
  /** 入力値 */
  value: BaseFamilyName;
  /** 値変更時のコールバック */
  onChange: (value: BaseFamilyName) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
}

/** 家族名入力コンポーネント
 * 
 * 入力欄の後ろに"家"の固定文字を表示する家族名入力コンポーネント */
export const FamilyNameInput: React.FC<FamilyNameInputProps> = ({
  value,
  onChange,
  placeholder = '例: 田中',
  error,
  disabled = false,
}) => {
  const { colors } = useTheme();

  /** TextInputからの文字列入力をFamilyNameに変換してonChangeに渡す */
  const handleTextChange = (text: string) => {
    const familyName = new FamilyName(text);
    onChange(familyName);
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
        <Text style={[
          styles.suffix,
          { color: colors.text.secondary },
        ]}>
          家
        </Text>
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
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  suffix: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
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
