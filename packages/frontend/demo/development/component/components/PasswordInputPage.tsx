import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { PasswordInputField } from '@/features/shared/components/PasswordInput';

/**
 * PasswordInputコンポーネント詳細ページ
 */
export const PasswordInputPage: React.FC = () => {
  const { colors } = useTheme();

  // プロパティの状態管理
  const [value, setValue] = useState('password123');
  const [placeholder, setPlaceholder] = useState('パスワードを入力');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleReflectProps = () => {
    Alert.alert('プロパティ反映', 'PasswordInputのプロパティが反映されました！');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🔒 PasswordInputField
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          パスワード入力用のフィールドコンポーネント
        </Text>
      </View>

      {/* コンポーネントプレビュー */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 コンポーネントプレビュー
        </Text>
        <View style={[styles.componentPreview, { backgroundColor: colors.surface.elevated }]}>
          <PasswordInputField
            value={value}
            onChange={setValue}
            placeholder={placeholder}
            error={errorMessage}
          />
        </View>
      </View>

      {/* プロパティ設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚙️ プロパティ設定
        </Text>
        <View style={[styles.propsEditor, { backgroundColor: colors.surface.elevated }]}>
          <View style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              入力値 (string)
            </Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
              value={value}
              onChangeText={setValue}
              placeholder="パスワード"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              プレースホルダー (string)
            </Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
              value={placeholder}
              onChangeText={setPlaceholder}
              placeholder="プレースホルダーを入力"
            />
          </View>

          <View style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              エラーメッセージ (string)
            </Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
              value={errorMessage}
              onChangeText={setErrorMessage}
              placeholder="エラーメッセージを入力"
            />
          </View>

          <View style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              無効化 (boolean)
            </Text>
            <Switch
              value={disabled}
              onValueChange={setDisabled}
            />
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.reflectButton, { backgroundColor: colors.primary }]}
          onPress={handleReflectProps}
        >
          <Text style={[styles.reflectButtonText, { color: colors.text.inverse }]}>
            プロパティを反映
          </Text>
        </TouchableOpacity>
      </View>

      {/* 使用例 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          💡 使用例
        </Text>
        <View style={[styles.codeBlock, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.codeText, { color: colors.text.secondary }]}>
            {`<PasswordInputField
  value={password}
  onChange={setPassword}
  placeholder="パスワードを入力"
  error={passwordError}
  disabled={false}
/>`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  componentPreview: {
    borderRadius: 12,
    padding: 24,
    alignItems: 'stretch',
    width: '100%',
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propsEditor: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  propRow: {
    marginBottom: 16,
  },
  propLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  reflectButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  reflectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  codeBlock: {
    borderRadius: 8,
    padding: 16,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 12,
    lineHeight: 18,
  },
});
