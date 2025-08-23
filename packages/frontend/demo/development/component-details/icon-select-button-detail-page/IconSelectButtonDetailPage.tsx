import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconSelectButtonEntry } from '@/features/shared/components/IconSelectButtonEntry';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { IconName } from '@backend/features/icon/value-objects/iconName';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';

/**
 * IconSelectButton詳細ページ
 * IconSelectButtonコンポーネント専用の詳細画面
 */
export const IconSelectButtonDetailPage: React.FC = () => {
  const { colors } = useTheme();
  
  // モックIcon作成関数
  const createMockIcon = (iconName: string): Icon => {
    return new Icon({
      id: new IconId(Math.floor(Math.random() * 1000)), // ランダムなID
      name: new IconName(iconName),
      sortOrder: new SortOrder(0),
      isActive: true
    });
  };
  
  // IconSelectButtonのプロパティ状態
  const [componentProps, setComponentProps] = useState({
    selectedIcon: createMockIcon('Home'), // Lucideアイコン名
    selectedIconName: 'Home', // 編集用のアイコン名
    error: '',
  });

  const updateIconName = (iconName: string) => {
    setComponentProps(prev => ({ 
      ...prev, 
      selectedIconName: iconName,
      selectedIcon: createMockIcon(iconName)
    }));
  };

  const updateProp = (key: string, value: any) => {
    setComponentProps(prev => ({ ...prev, [key]: value }));
  };

  const handleReflectProps = () => {
    Alert.alert('プロパティ反映', 'IconSelectButtonのプロパティが反映されました！');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🎨 IconSelectButton
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          アイコン選択用のボタンコンポーネント
        </Text>
      </View>

      {/* コンポーネントプレビュー */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 コンポーネントプレビュー
        </Text>
        <View style={[styles.componentPreview, { backgroundColor: colors.surface.elevated }]}>
          <IconSelectButtonEntry
            selectedIcon={componentProps.selectedIcon}
            onIconSelected={(icon) => {
              setComponentProps(prev => ({
                ...prev, 
                selectedIcon: icon,
                selectedIconName: icon.name.value
              }));
            }}
            error={componentProps.error}
          />
        </View>
      </View>

      {/* プロパティ設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚙️ プロパティ設定
        </Text>
        <View style={[styles.propsEditor, { backgroundColor: colors.surface.elevated }]}>
          {/* selectedIcon設定 */}
          <View style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              選択アイコン (Lucideアイコン名)
            </Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
              value={componentProps.selectedIconName}
              onChangeText={(value) => updateIconName(value)}
              placeholder="アイコン名を入力 (例: Home, User, Settings)"
            />
          </View>

          {/* error設定 */}
          <View style={styles.propRow}>
            <Text style={[styles.propLabel, { color: colors.text.primary }]}>
              エラーメッセージ (string)
            </Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary }]}
              value={componentProps.error}
              onChangeText={(value) => updateProp('error', value)}
              placeholder="エラーメッセージを入力"
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
{`<IconSelectButtonEntry
  selectedIcon={iconObject}  // Iconクラスのインスタンス
  onIconSelected={handleIconSelect}  // (icon: Icon) => void
  error={iconError}
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
