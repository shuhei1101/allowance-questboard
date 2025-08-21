import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { useTheme } from '@/core/theme';
import { useSessionStore } from '@/features/auth/stores/sessionStore';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { FamilyMemberTypeId } from '@backend/features/family-member/value-object/familyMemberTypeId';

/**
 * セッション設定画面
 * セッション状態の確認・変更・テスト用設定
 */
export const SessionSettingsPage: React.FC = () => {
  const { colors } = useTheme();
  const sessionStore = useSessionStore();
  
  const [customJwt, setCustomJwt] = useState(sessionStore.jwt || '');

  const handleLanguageChange = (languageId: number) => {
    try {
      const languageType = new LanguageTypeValue(new LanguageId(languageId));
      sessionStore.updateLanguageType(languageType);
      Alert.alert('成功', `言語を変更しました (ID: ${languageId})`);
    } catch (error) {
      Alert.alert('エラー', `言語変更に失敗しました: ${error}`);
    }
  };

  const handleFamilyMemberTypeChange = (typeId: number) => {
    try {
      const memberType = new FamilyMemberTypeValue(new FamilyMemberTypeId(typeId));
      sessionStore.updateFamilyMemberType(memberType);
      Alert.alert('成功', `家族メンバータイプを変更しました (ID: ${typeId})`);
    } catch (error) {
      Alert.alert('エラー', `家族メンバータイプ変更に失敗しました: ${error}`);
    }
  };

  const handleJwtUpdate = () => {
    sessionStore.updateJwt(customJwt);
    Alert.alert('成功', 'JWTトークンを更新しました');
  };

  const handleClearSession = () => {
    Alert.alert(
      '確認',
      'セッション情報をすべてクリアしますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: 'クリア',
          style: 'destructive',
          onPress: () => {
            // セッションストアの内容をクリア
            sessionStore.updateJwt('');
            sessionStore.updateLanguageType(undefined as any);
            sessionStore.updateFamilyMemberType(undefined as any);
            setCustomJwt('');
            Alert.alert('完了', 'セッション情報をクリアしました');
          },
        },
      ]
    );
  };

  const languageOptions = [
    { id: 1, name: '日本語' },
    { id: 2, name: 'English' },
  ];

  const memberTypeOptions = [
    { id: 1, name: '親' },
    { id: 2, name: '子' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          ⚙️ セッション設定
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          セッション状態の確認・変更・テスト
        </Text>
      </View>

      {/* 現在の状態 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📊 現在のセッション状態
        </Text>
        
        <View style={[styles.statusContainer, { backgroundColor: colors.surface.elevated }]}>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              JWT:
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {sessionStore.jwt ? `${sessionStore.jwt.substring(0, 20)}...` : '未設定'}
            </Text>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              言語:
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {sessionStore.languageType ? 
                `${sessionStore.languageType.code.value} (ID: ${sessionStore.languageType.id.value})` : 
                '未設定'
              }
            </Text>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              メンバータイプ:
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {sessionStore.familyMemberType ? 
                `${sessionStore.familyMemberType.tableName} (ID: ${sessionStore.familyMemberType.id.value})` : 
                '未設定'
              }
            </Text>
          </View>
        </View>
      </View>

      {/* 言語設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🌐 言語設定
        </Text>
        
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              { backgroundColor: colors.surface.elevated },
              sessionStore.languageType?.id.value === option.id && styles.selectedOption
            ]}
            onPress={() => handleLanguageChange(option.id)}
          >
            <Text style={[
              styles.optionText,
              { color: colors.text.primary },
              sessionStore.languageType?.id.value === option.id && styles.selectedOptionText
            ]}>
              {option.name} (ID: {option.id})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 家族メンバータイプ設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          👥 家族メンバータイプ
        </Text>
        
        {memberTypeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              { backgroundColor: colors.surface.elevated },
              sessionStore.familyMemberType?.id.value === option.id && styles.selectedOption
            ]}
            onPress={() => handleFamilyMemberTypeChange(option.id)}
          >
            <Text style={[
              styles.optionText,
              { color: colors.text.primary },
              sessionStore.familyMemberType?.id.value === option.id && styles.selectedOptionText
            ]}>
              {option.name} (ID: {option.id})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* JWT設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🔑 JWT トークン
        </Text>
        
        <TextInput
          style={[styles.textInput, { borderColor: colors.border.light, color: colors.text.primary, backgroundColor: colors.surface.elevated }]}
          value={customJwt}
          onChangeText={setCustomJwt}
          placeholder="JWTトークンを入力..."
          placeholderTextColor={colors.text.secondary}
          multiline
        />
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
          onPress={handleJwtUpdate}
        >
          <Text style={styles.actionButtonText}>JWT更新</Text>
        </TouchableOpacity>
      </View>

      {/* アクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚡ アクション
        </Text>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
          onPress={handleClearSession}
        >
          <Text style={styles.actionButtonText}>セッション情報をクリア</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 変更は即座に反映されます
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
  statusContainer: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  statusValue: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOption: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  textInput: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
