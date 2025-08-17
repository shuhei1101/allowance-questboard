import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { ErrorIcon } from './components/ErrorIcon';
import { ErrorMessage } from './components/ErrorMessage';
import { ErrorDetails } from './components/ErrorDetails';
import { RetryButton } from './components/RetryButton';
import { HelpText } from './components/HelpText';

interface ErrorScreenProps {
  /** 発生したエラー */
  error?: Error;
  /** 再試行ボタンがタップされた時のコールバック */
  onRetry?: () => void;
  /** エラータイトル（カスタム） */
  title?: string;
  /** エラーメッセージ（カスタム） */
  message?: string;
}

/**
 * エラー画面コンポーネント
 * 
 * アプリで予期しないエラーが発生した際に表示される画面
 * ユーザーフレンドリーなエラー表示と復旧操作を提供
 */
export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error,
  onRetry,
  title,
  message,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  // エラータイトルの決定
  const errorTitle = title || t('error.unexpected.title', '予期しないエラーが発生しました');
  
  // エラーメッセージの決定
  const errorMessage = message || 
    t('error.unexpected.message', 'アプリで問題が発生しました。再試行ボタンをタップして、もう一度お試しください。');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* エラーアイコン */}
        <ErrorIcon />

        {/* エラーメッセージ */}
        <ErrorMessage 
          title={errorTitle}
          message={errorMessage}
        />

        {/* エラー詳細（開発環境のみ） */}
        {error && <ErrorDetails error={error} />}

        {/* 再試行ボタン */}
        {onRetry && <RetryButton onRetry={onRetry} />}

        {/* ヘルプテキスト */}
        <HelpText />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
});
