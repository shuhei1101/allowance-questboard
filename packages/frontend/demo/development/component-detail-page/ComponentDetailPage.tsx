import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { useRoute } from '@react-navigation/native';
import { EmailInputField } from '@/features/shared/components/EmailInputField';
import { PasswordInputField } from '@/features/shared/components/PasswordInputField';
import { BirthdayInputField } from '@/features/shared/components/BirthdayInputField';
import { IconSelectButton } from '@/features/shared/components/IconSelectButton';
import { ComfirmButton } from '@/features/shared/components';

interface ComponentDetailPageProps {
  componentType: string;
}

/**
 * コンポーネントX画面
 * 個別コンポーネントの詳細表示とプロパティ設定
 */
export const ComponentDetailPage: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { componentType } = route.params as ComponentDetailPageProps;

  const componentInfo = getComponentInfo(componentType);
  const [componentProps, setComponentProps] = useState<any>(componentInfo.defaultProps);

  const updateProp = (key: string, value: any) => {
    setComponentProps((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleReflectProps = () => {
    Alert.alert('プロパティ反映', 'コンポーネントのプロパティが反映されました！');
  };

  const renderComponent = () => {
    switch (componentType) {
      case 'email-input':
        return (
          <EmailInputField
            value={componentProps.value}
            onChange={(value) => updateProp('value', value)}
            placeholder={componentProps.placeholder}
            error={componentProps.errorMessage}
          />
        );
      case 'password-input':
        return (
          <PasswordInputField
            value={componentProps.value}
            onChange={(value) => updateProp('value', value)}
            placeholder={componentProps.placeholder}
            error={componentProps.errorMessage}
          />
        );
      case 'birthday-input':
        return (
          <BirthdayInputField
            value={componentProps.value}
            onChange={(value) => updateProp('value', value)}
            error={componentProps.errorMessage}
          />
        );
      case 'save-button':
        return (
          <ComfirmButton
            onPress={() => Alert.alert('保存', 'SaveButtonが押されました！')}
            loading={componentProps.loading}
            disabled={componentProps.disabled}
          />
        );
      case 'icon-select-button':
        return (
          <IconSelectButton
            selectedIcon={componentProps.selectedIcon}
            onPress={() => Alert.alert('アイコン選択', 'IconSelectButtonが押されました！')}
          />
        );
      default:
        return (
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>
            このコンポーネントはまだ実装されていません
          </Text>
        );
    }
  };

  const renderPropsEditor = () => {
    return (
      <View style={[styles.propsEditor, { backgroundColor: colors.surface.elevated }]}>
        {componentInfo.props.map((prop) => (
          <View key={prop.name} style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              {prop.label} ({prop.type})
            </Text>
            {renderPropEditor(prop, componentProps[prop.name], (value) => updateProp(prop.name, value))}
          </View>
        ))}
      </View>
    );
  };

  const renderPropEditor = (prop: any, value: any, onChange: (value: any) => void) => {
    switch (prop.type) {
      case 'string':
        return (
          <TextInput
            style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
            value={value}
            onChangeText={onChange}
            placeholder={prop.placeholder || `${prop.label}を入力`}
          />
        );
      case 'boolean':
        return (
          <Switch
            value={value}
            onValueChange={onChange}
          />
        );
      default:
        return (
          <Text style={[styles.propValue, { color: colors.text.secondary }]}>
            {String(value)}
          </Text>
        );
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          {componentInfo.icon} {componentInfo.name}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          {componentInfo.description}
        </Text>
      </View>

      {/* コンポーネントプレビュー */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 コンポーネントプレビュー
        </Text>
        <View style={[styles.componentPreview, { backgroundColor: colors.surface.elevated }]}>
          {renderComponent()}
        </View>
      </View>

      {/* プロパティ設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚙️ プロパティ設定
        </Text>
        {renderPropsEditor()}
        
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
            {componentInfo.usage}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * コンポーネントタイプから情報を取得
 */
function getComponentInfo(componentType: string) {
  const componentInfoMap = {
    'email-input': {
      name: 'EmailInputField',
      icon: '📧',
      description: 'メールアドレス入力用のフィールドコンポーネント',
      defaultProps: {
        value: 'test@example.com',
        placeholder: 'メールアドレスを入力',
        errorMessage: '',
        disabled: false,
      },
      props: [
        { name: 'value', label: '入力値', type: 'string', placeholder: 'メールアドレス' },
        { name: 'placeholder', label: 'プレースホルダー', type: 'string' },
        { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
        { name: 'disabled', label: '無効化', type: 'boolean' },
      ],
      usage: '<EmailInputField\n  value={email}\n  onChangeText={setEmail}\n  placeholder="メールアドレスを入力"\n  errorMessage={emailError}\n/>'
    },
    'password-input': {
      name: 'PasswordInputField',
      icon: '🔒',
      description: 'パスワード入力用のフィールドコンポーネント',
      defaultProps: {
        value: 'password123',
        placeholder: 'パスワードを入力',
        errorMessage: '',
        disabled: false,
      },
      props: [
        { name: 'value', label: '入力値', type: 'string', placeholder: 'パスワード' },
        { name: 'placeholder', label: 'プレースホルダー', type: 'string' },
        { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
        { name: 'disabled', label: '無効化', type: 'boolean' },
      ],
      usage: '<PasswordInputField\n  value={password}\n  onChangeText={setPassword}\n  placeholder="パスワードを入力"\n  errorMessage={passwordError}\n/>'
    },
    'birthday-input': {
      name: 'BirthdayInputField',
      icon: '🎂',
      description: '誕生日入力用のフィールドコンポーネント',
      defaultProps: {
        value: '1990-01-01',
        errorMessage: '',
        disabled: false,
      },
      props: [
        { name: 'value', label: '入力値', type: 'string', placeholder: 'YYYY-MM-DD' },
        { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
        { name: 'disabled', label: '無効化', type: 'boolean' },
      ],
      usage: '<BirthdayInputField\n  value={birthday}\n  onChange={setBirthday}\n  errorMessage={birthdayError}\n/>'
    },
    'save-button': {
      name: 'SaveButton',
      icon: '💾',
      description: '保存処理用のボタンコンポーネント',
      defaultProps: {
        loading: false,
        disabled: false,
      },
      props: [
        { name: 'loading', label: 'ローディング状態', type: 'boolean' },
        { name: 'disabled', label: '無効化', type: 'boolean' },
      ],
      usage: '<SaveButton\n  onPress={handleSave}\n  loading={isLoading}\n  disabled={!isValid}\n/>'
    },
    'icon-select-button': {
      name: 'IconSelectButton',
      icon: '🎨',
      description: 'アイコン選択用のボタンコンポーネント',
      defaultProps: {
        selectedIcon: 'icon-001',
        disabled: false,
      },
      props: [
        { name: 'selectedIcon', label: '選択アイコン', type: 'string', placeholder: 'icon-001' },
        { name: 'disabled', label: '無効化', type: 'boolean' },
      ],
      usage: '<IconSelectButton\n  selectedIcon={icon}\n  onSelectIcon={setIcon}\n  disabled={false}\n/>'
    },
  };

  return componentInfoMap[componentType as keyof typeof componentInfoMap] || {
    name: '不明なコンポーネント',
    icon: '❓',
    description: 'コンポーネント情報が見つかりません',
    defaultProps: {},
    props: [],
    usage: 'コンポーネントが見つかりません'
  };
}

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
  propValue: {
    fontSize: 14,
    fontStyle: 'italic',
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
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
