import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconSelectButton } from '@/features/shared/components/IconSelectButton';

/**
 * IconSelectButtonコンポーネント詳細ページ
 */
export const IconSelectButtonPage: React.FC = () => {
  const { colors } = useTheme();

  // プロパティの状態管理
  const [selectedIcon, setSelectedIcon] = useState('icon-001');
  const [disabled, setDisabled] = useState(false);

  const handlePress = () => {
    Alert.alert('アイコン選択', 'IconSelectButtonが押されました！');
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
          <IconSelectButton
            selectedIcon={selectedIcon}
            onPress={handlePress}
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
              選択アイコン (string)
            </Text>
            <View style={styles.iconSelector}>
              {['icon-001', 'icon-002', 'icon-003', 'icon-004'].map((iconId) => (
                <TouchableOpacity
                  key={iconId}
                  style={[
                    styles.iconOption,
                    { 
                      backgroundColor: selectedIcon === iconId ? colors.primary : colors.background.secondary,
                      borderColor: colors.border.light,
                    }
                  ]}
                  onPress={() => setSelectedIcon(iconId)}
                >
                  <Text style={[
                    styles.iconOptionText,
                    { 
                      color: selectedIcon === iconId ? colors.text.inverse : colors.text.primary 
                    }
                  ]}>
                    {iconId}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
            {`<IconSelectButton
  selectedIcon={icon}
  onPress={handleIconSelect}
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
  iconSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  iconOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  iconOptionText: {
    fontSize: 12,
    fontWeight: '500',
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
