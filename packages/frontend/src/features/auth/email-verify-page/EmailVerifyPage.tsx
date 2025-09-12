import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useAppNavigation } from '../../../../AppNavigator';
import { useEmailVerifyPageStore } from './stores/emailVerifyPageStore';
import { createPageHandlers } from './hooks/createPageHandlers';
import { EmailIcon } from './components/EmailIcon';
import { DescriptionText } from './components/DescriptionText';
import { EmailView } from './components/EmailView';
import { Indicator } from './components/Indicator';
import { ResendEmailButton } from './components/ResendEmailButton';
import { HelpSection } from './components/HelpSection';
import { Email } from '../../../../../backend/src/features/auth/value-object/email';
import { useSessionStore } from '../../../core/constants/sessionStore';

/** メール認証画面
 *
 * 新規登録後のメール認証フローを提供するメインページ
 * - メール認証待ち状態の表示
 * - AppState監視による認証状態の自動チェック
 * - 認証完了時の自動ログインとホーム画面遷移
 * - メール再送機能
 * - ヘルプセクションによるトラブルシューティング */
export interface EmailVerifyPageProps {
  email: string; // 認証対象のメールアドレス
}

export const EmailVerifyPage: React.FC<EmailVerifyPageProps> = ({
  email: registeredEmailString,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const store = useEmailVerifyPageStore();
  const sessionStore = useSessionStore();

  // コンポーネント初期化処理
  useEffect(() => {
    // メールアドレスをストアに設定
    if (registeredEmailString) {
      try {
        const emailValue = new Email(registeredEmailString);
        store.setEmail(emailValue);
      } catch (error) {
        console.error('Invalid email format:', registeredEmailString);
        // 無効なメールアドレスの場合は前の画面に戻る
        navigation.goBack();
        return;
      }
    }

    // ページ状態をリセット
    store.reset();
  }, [registeredEmailString, store, navigation]);

  // ページハンドラーの統合設定
  const handlers = createPageHandlers({
    store,
    languageType: sessionStore.languageType,
    onVerificationComplete: () => {
      // 認証完了時に自動ログインハンドラーを呼び出し
      handlers.autoLoginHandler.handleAutoLogin();
    },
    onResendSuccess: () => {
      console.log('Email resend successful');
    },
    onAutoLoginSuccess: (session, user) => {
      console.log('Auto login successful:', { session, user });
      // TODO: 適切なホーム画面への遷移実装
      // navigation.navigate('Parent', { screen: 'ParentEdit' });
    },
    onAutoLoginError: (error) => {
      console.error('Auto login failed:', error);
    },
  });

  // AppStateイベントリスナーとライフサイクル管理
  useEffect(() => {
    // 初回認証チェックを実行
    handlers.emailVerificationChecker.checkEmailVerification();

    // クリーンアップは各ハンドラーのuseEffectで自動実行される
  }, [handlers.emailVerificationChecker]);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background.primary }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* メインコンテンツエリア（上部） - メールアイコン */}
      <View style={styles.iconSection}>
        <EmailIcon animated={true} />
      </View>

      {/* メインコンテンツエリア（中央） - 説明テキストとステータス */}
      <View style={styles.contentSection}>
        {/* 説明テキスト */}
        <DescriptionText 
          status={store.emailVerifyStatus}
          userEmail={store.email}
        />

        {/* 送信先メールアドレス表示 */}
        <EmailView 
          userEmail={store.email}
          masked={false}
        />

        {/* 認証ステータス表示 */}
        <Indicator 
          status={store.emailVerifyStatus}
          customMessage={store.errorMessage}
        />
      </View>

      {/* アクションエリア（下部） - 再送ボタン */}
      <View style={styles.actionSection}>
        <ResendEmailButton
          isResending={store.isResending}
          resendCooldown={store.resendCooldown}
          resendCount={store.resendCount}
          maxResendCount={store.maxResendCount}
          lastResendTime={store.lastResendTime}
          setResending={store.setResending}
          setResendCooldown={store.setResendCooldown}
          incrementResendCount={store.incrementResendCount}
          updateLastResendTime={store.updateLastResendTime}
          onResend={handlers.resendEmailHandler.handleResendEmail}
        />
      </View>

      {/* ヘルプエリア（最下部） - トラブルシューティング */}
      <View style={styles.helpSection}>
        <HelpSection
          isHelpSectionExpanded={store.isHelpSectionExpanded}
          toggleHelpSection={store.toggleHelpSection}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  iconSection: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  contentSection: {
    alignItems: 'center',
    marginBottom: 40,
    gap: 20,
  },
  actionSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  helpSection: {
    marginTop: 20,
  },
});
