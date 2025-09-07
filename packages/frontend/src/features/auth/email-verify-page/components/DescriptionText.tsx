import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { EmailVerifyStatus } from '../stores/emailVerifyPageStore';
import { Email } from '../../../../../../backend/src/features/auth/value-object/email';

interface Props {
  /** 現在のステップ表示 */
  status: EmailVerifyStatus;
  /** ユーザーのメールアドレス */
  userEmail?: Email;
}

/**
 * メール認証説明テキストコンポーネント
 * 
 * 「確認メールを送信しました」等の説明テキストを表示
 * 多言語対応および段階的な説明表示に対応
 */
export const DescriptionText: React.FC<Props> = ({ 
  status: verificationStatus,
  userEmail,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const getMainMessage = () => {
    switch (verificationStatus) {
      case EmailVerifyStatus.CHECKING:
        return t('emailVerify.instruction.checking', '認証状態を確認しています...');
      case EmailVerifyStatus.VERIFIED:
        return t('emailVerify.instruction.verified', '認証完了！自動ログインしています...');
      case EmailVerifyStatus.FAILED:
        return t('emailVerify.instruction.failed', '認証に失敗しました。');
      default:
        return t('emailVerify.instruction.main', '確認メールを送信しました。');
    }
  };

  const getSubMessage = () => {
    switch (verificationStatus) {
      case EmailVerifyStatus.CHECKING:
        return t('emailVerify.instruction.checkingSub', 'しばらくお待ちください');
      case EmailVerifyStatus.VERIFIED:
        return t('emailVerify.instruction.verifiedSub', 'ホーム画面へ移動します');
      case EmailVerifyStatus.FAILED:
        return t('emailVerify.instruction.failedSub', '再度お試しいただくか、サポートにお問い合わせください');
      default:
        const emailText = userEmail?.value ? ` (${userEmail.value})` : '';
        return t(
          'emailVerify.instruction.sub', 
          `メール内のリンクをクリックして登録を完了してください。${emailText}`
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.mainMessage, { color: colors.text.primary }]}>
        {getMainMessage()}
      </Text>
      <Text style={[styles.subMessage, { color: colors.text.secondary }]}>
        {getSubMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  mainMessage: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
