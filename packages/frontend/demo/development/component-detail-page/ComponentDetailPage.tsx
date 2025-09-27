import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { useRoute } from '@react-navigation/native';
import { getComponentDemo } from './components/componentRegistry';
import { ComponentPropConfig } from './components/types';

interface ComponentDetailPageProps {
  componentType: string;
}

/**
 * コンポーネント詳細画面
 * 個別コンポーネントの詳細表示とプロパティ設定
 */
export const ComponentDetailPage: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { componentType } = route.params as ComponentDetailPageProps;

  // デモコンポーネントを取得
  const componentDemo = getComponentDemo(componentType);
  
  const [componentProps, setComponentProps] = useState<any>(
    componentDemo?.info.defaultProps || {}
  );

  const updateProp = (key: string, value: any) => {
    setComponentProps((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleReflectProps = () => {
    Alert.alert('プロパティ反映', 'コンポーネントのプロパティが反映されました！');
  };

  // コンポーネントが見つからない場合
  if (!componentDemo) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.header}>
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>
            ❓ このコンポーネントはまだ実装されていません
          </Text>
        </View>
      </View>
    );
  }

  const renderPropsEditor = () => {
    return (
      <View style={[styles.propsEditor, { backgroundColor: colors.surface.elevated }]}>
        {componentDemo.info.props.map((prop) => (
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

  const renderPropEditor = (prop: ComponentPropConfig, value: any, onChange: (value: any) => void) => {
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
      case 'number':
        return (
          <TextInput
            style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
            value={String(value)}
            onChangeText={(text) => onChange(Number(text) || 0)}
            placeholder={prop.placeholder || `${prop.label}を入力`}
            keyboardType="numeric"
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
          {componentDemo.info.icon} {componentDemo.info.name}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          {componentDemo.info.description}
        </Text>
      </View>

      {/* コンポーネントプレビュー */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 コンポーネントプレビュー
        </Text>
        <View style={[styles.componentPreview, { backgroundColor: colors.surface.elevated }]}>
          {componentDemo.renderComponent({ componentProps, updateProp })}
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
            {componentDemo.info.usage}
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
