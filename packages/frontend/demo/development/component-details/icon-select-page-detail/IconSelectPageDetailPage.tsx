import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconSelectPage } from '@/features/icon/icon-select-page/IconSelectPage';
import { AppConstants } from '@/core/constants/appConstants';
import { initMasterData } from '@/features/auth/services/initMasterData';

interface DemoState {
  initialSelectedIcon: string;
  showingIconSelect: boolean;
  lastSelectedIcon?: string;
  masterDataLoaded: boolean;
  masterDataLoading: boolean;
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
    masterDataLoaded: false,
    masterDataLoading: false,
  });

  // 初期データ取得処理
  useEffect(() => {
    const loadMasterData = async () => {
      if (demoState.masterDataLoaded || demoState.masterDataLoading) {
        return; // 既に読み込み済みまたは読み込み中の場合はスキップ
      }

      setDemoState(prev => ({ ...prev, masterDataLoading: true }));
      
      try {
        await initMasterData();
        setDemoState(prev => ({ 
          ...prev, 
          masterDataLoaded: true, 
          masterDataLoading: false 
        }));
        console.log('マスターデータの初期化が完了しました');
      } catch (error) {
        console.error('マスターデータの初期化に失敗しました:', error);
        setDemoState(prev => ({ 
          ...prev, 
          masterDataLoading: false 
        }));
        Alert.alert(
          'エラー', 
          'マスターデータの読み込みに失敗しました。ネットワーク接続を確認してください。'
        );
      }
    };

    loadMasterData();
  }, []); // 空の依存配列で初回のみ実行

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

  const handleReloadMasterData = async () => {
    setDemoState(prev => ({ ...prev, masterDataLoading: true }));
    
    try {
      await initMasterData();
      setDemoState(prev => ({ 
        ...prev, 
        masterDataLoaded: true, 
        masterDataLoading: false 
      }));
      Alert.alert('成功', 'マスターデータを再読み込みしました');
    } catch (error) {
      console.error('マスターデータの再読み込みに失敗しました:', error);
      setDemoState(prev => ({ 
        ...prev, 
        masterDataLoading: false 
      }));
      Alert.alert(
        'エラー', 
        'マスターデータの再読み込みに失敗しました。ネットワーク接続を確認してください。'
      );
    }
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
        <View style={styles.stateRow}>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            マスターデータ:
          </Text>
          <Text style={[styles.stateValue, { color: colors.text.primary }]}>
            {demoState.masterDataLoading 
              ? '読み込み中...' 
              : demoState.masterDataLoaded 
                ? '読み込み済み' 
                : '未読み込み'
            }
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

        {/* マスターデータ再読み込み */}
        <TouchableOpacity
          style={[
            styles.actionButton, 
            { 
              backgroundColor: demoState.masterDataLoading 
                ? colors.background.tertiary 
                : colors.primary,
              opacity: demoState.masterDataLoading ? 0.6 : 1
            }
          ]}
          onPress={handleReloadMasterData}
          disabled={demoState.masterDataLoading}
        >
          <Text style={[styles.actionButtonText, { color: colors.text.inverse }]}>
            🔄 マスターデータ再読み込み
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

      {/* AppConstants.iconCategories の情報 */}
      <View style={[styles.section, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📊 AppConstants.iconCategories 情報
        </Text>
        {AppConstants.iconCategories ? (
          <View>
            <Text style={[styles.settingLabel, { color: colors.text.secondary }]}>
              総カテゴリ数: {AppConstants.iconCategories.getActiveSortedCategories().length}
            </Text>
            <Text style={[styles.settingLabel, { color: colors.text.secondary }]}>
              アクティブなカテゴリ数: {AppConstants.iconCategories.getActiveCategories().length}
            </Text>
            
            <Text style={[styles.description, { color: colors.text.primary, marginTop: 12, marginBottom: 8 }]}>
              カテゴリ一覧:
            </Text>
            {AppConstants.iconCategories.getActiveSortedCategories().map((category, index) => (
              <View key={category.key.value} style={styles.stateRow}>
                <Text style={[styles.stateLabel, { color: colors.text.primary }]}>
                  {index + 1}. ID: {category.key.value}
                </Text>
                <Text style={[styles.stateValue, { color: colors.text.secondary }]}>
                  並び順: {category.sortOrder.value}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.description, { color: colors.text.secondary }]}>
            AppConstants.iconCategories が読み込まれていません
          </Text>
        )}
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
