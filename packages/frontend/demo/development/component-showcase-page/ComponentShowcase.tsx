import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/core/theme';
import { EmailInputField } from '@/features/shared/components/EmailInputField';
import { PasswordInputField } from '@/features/shared/components/PasswordInputField';
import { ComfirmButton } from '@/features/shared/components/ComfirmButton';
import { BirthdayInputField } from '@/features/shared/components/BirthdayInputField';
import { IconSelectButton } from '@/features/shared/components/IconSelectButton';

/**
 * コンポーネントショーケース
 * 共通コンポーネントの表示確認とテスト用画面
 */
export const ComponentShowcase: React.FC = () => {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [selectedIcon, setSelectedIcon] = React.useState('star'); // Ioniconsアイコン名

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🧩 共通コンポーネント
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          各コンポーネントの動作確認とテスト
        </Text>
      </View>

      {/* インプットフィールド */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📝 インプットフィールド
        </Text>
        
        <View style={[styles.componentContainer, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.componentLabel, { color: colors.text.secondary }]}>
            メールアドレス入力フィールド
          </Text>
          <EmailInputField
            value={email}
            onChange={setEmail}
            placeholder="demo@example.com"
            error=""
          />
        </View>

        <View style={[styles.componentContainer, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.componentLabel, { color: colors.text.secondary }]}>
            パスワード入力フィールド
          </Text>
          <PasswordInputField
            value={password}
            onChange={setPassword}
            placeholder="パスワードを入力"
            error=""
          />
        </View>

        <View style={[styles.componentContainer, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.componentLabel, { color: colors.text.secondary }]}>
            誕生日入力フィールド
          </Text>
          <BirthdayInputField
            value={birthday}
            onChange={setBirthday}
            error=""
          />
        </View>
      </View>

      {/* 選択コンポーネント */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 選択コンポーネント
        </Text>
        
        <View style={[styles.componentContainer, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.componentLabel, { color: colors.text.secondary }]}>
            アイコン選択ボタン
          </Text>
          <IconSelectButton
            selectedIcon={selectedIcon}
            onPress={() => {
              console.log('アイコン選択が押されました');
              setSelectedIcon('heart'); // デモ用にheartアイコンに変更
            }}
          />
        </View>
      </View>

      {/* ボタンコンポーネント */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          � ボタンコンポーネント
        </Text>
        
        <View style={[styles.componentContainer, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.componentLabel, { color: colors.text.secondary }]}>
            保存ボタン
          </Text>
          <ComfirmButton
            onPress={() => console.log('保存ボタンが押されました')}
            disabled={false}
          />
        </View>

        <View style={[styles.componentContainer, { backgroundColor: colors.surface.elevated }]}>
          <Text style={[styles.componentLabel, { color: colors.text.secondary }]}>
            無効化された保存ボタン
          </Text>
          <ComfirmButton
            onPress={() => console.log('無効化されたボタン')}
            disabled={true}
          />
        </View>
      </View>

      {/* 状態表示 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📊 現在の状態
        </Text>
        
        <View style={styles.stateContainer}>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            メール: {email || '未入力'}
          </Text>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            パスワード: {password ? '●'.repeat(password.length) : '未入力'}
          </Text>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            誕生日: {birthday || '未入力'}
          </Text>
          <Text style={[styles.stateLabel, { color: colors.text.secondary }]}>
            選択アイコン: {selectedIcon || '未選択'}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 インタラクティブに動作確認できます
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
  componentContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  componentLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  componentDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  stateContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stateLabel: {
    fontSize: 14,
    marginBottom: 4,
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
