import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconSelectPage } from '@/features/shared/icon-select-page/IconSelectPage';

interface DemoState {
  initialSelectedIcon: string;
  showingIconSelect: boolean;
  lastSelectedIcon?: string;
}

/**
 * アイコン選択画面デモページ
 * IconSelectPageの動作確認とプロパティテスト
 */
export const IconSelectPageDetailPage: React.FC = () => {
  const { colors } = useTheme();
  
  const [demoState, setDemoState] = useState<DemoState>({
    initialSelectedIcon: 'home',
    showingIconSelect: false,
    lastSelectedIcon: undefined,
  });

  const handleShowIconSelect = () => {
    setDemoState(prev => ({ ...prev, showingIconSelect: true }));
  };

  const handleIconSelected = (iconName: string) => {
    setDemoState(prev => ({
      ...prev,
      showingIconSelect: false,
      lastSelectedIcon: iconName,
    }));
    Alert.alert('アイコンが選択されました', `選択されたアイコン: ${iconName}`);
  };

  const handleBack = () => {
    setDemoState(prev => ({ ...prev, showingIconSelect: false }));
  };

  const handleChangeInitialIcon = (iconName: string) => {
    setDemoState(prev => ({ ...prev, initialSelectedIcon: iconName }));
  };

  if (demoState.showingIconSelect) {
    return (
      <IconSelectPage
        initialSelectedIcon={demoState.initialSelectedIcon}
        onIconSelected={handleIconSelected}
        onBack={handleBack}
      />
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          🎨 アイコン選択画面デモ
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          IconSelectPageの動作確認
        </Text>
      </View>

      {/* 現在の状態 */}
      <View style={[styles.section, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📊 現在の状態
        </Text>
        <View style={styles.stateRow}>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            初期選択アイコン:
          </Text>
          <Text style={[styles.stateValue, { color: colors.text.primary }]}>
            {demoState.initialSelectedIcon}
          </Text>
        </View>
        <View style={styles.stateRow}>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            最後に選択されたアイコン:
          </Text>
          <Text style={[styles.stateValue, { color: colors.text.primary }]}>
            {demoState.lastSelectedIcon || '未選択'}
          </Text>
        </View>
      </View>

      {/* アクション */}
      <View style={[styles.section, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 アクション
        </Text>
        
        {/* アイコン選択画面を表示 */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={handleShowIconSelect}
        >
          <Text style={[styles.actionButtonText, { color: colors.text.inverse }]}>
            🎨 アイコン選択画面を表示
          </Text>
        </TouchableOpacity>
      </View>

      {/* 初期値設定 */}
      <View style={[styles.section, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚙️ 初期値設定
        </Text>
        
        <Text style={[styles.settingLabel, { color: colors.text.secondary }]}>
          初期選択アイコン:
        </Text>
        
        <View style={styles.iconButtonGrid}>
          {['home', 'user', 'star', 'heart', 'gift', 'car'].map((iconName) => (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconButton,
                {
                  backgroundColor: demoState.initialSelectedIcon === iconName 
                    ? colors.primary 
                    : colors.background.tertiary,
                  borderColor: colors.border.light,
                }
              ]}
              onPress={() => handleChangeInitialIcon(iconName)}
            >
              <Text style={[
                styles.iconButtonText,
                {
                  color: demoState.initialSelectedIcon === iconName 
                    ? colors.text.inverse 
                    : colors.text.primary
                }
              ]}>
                {iconName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 使用方法 */}
      <View style={[styles.section, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📖 使用方法
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          1. 初期選択アイコンを設定{'\n'}
          2. 「アイコン選択画面を表示」ボタンをタップ{'\n'}
          3. カテゴリを選択してアイコンを選ぶ{'\n'}
          4. 確定ボタンで選択完了
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stateLabel: {
    fontSize: 14,
  },
  stateValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  iconButtonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  iconButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  iconButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
