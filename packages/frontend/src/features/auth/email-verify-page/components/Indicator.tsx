import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { EmailVerifyStatus } from '../stores/emailVerifyPageStore';

interface Props {
  /** 現在の認証ステータス */
  status: EmailVerifyStatus;
  /** カスタムメッセージ（オプション） */
  customMessage?: string;
}

/**
 * 認証ステータス表示コンポーネント
 * 
 * 認証チェック中のローディング表示、認証完了時のチェックマーク表示
 * ステータス変化のアニメーション対応
 */
export const Indicator: React.FC<Props> = ({ 
  status, 
  customMessage 
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const getStatusConfig = () => {
    switch (status) {
      case 'WAITING':
        return {
          icon: 'hourglass-outline' as keyof typeof Ionicons.glyphMap,
          message: customMessage || t('emailVerify.status.waiting', '認証を確認中...'),
          color: colors.text.secondary,
          showSpinner: false,
        };
      case 'CHECKING':
        return {
          icon: null,
          message: customMessage || t('emailVerify.status.checking', '認証状態を確認しています...'),
          color: colors.primary,
          showSpinner: true,
        };
      case 'VERIFIED':
        return {
          icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
          message: customMessage || t('emailVerify.status.verified', '認証完了！自動ログインしています...'),
          color: colors.success,
          showSpinner: false,
        };
      case 'FAILED':
        return {
          icon: 'close-circle' as keyof typeof Ionicons.glyphMap,
          message: customMessage || t('emailVerify.status.failed', 'エラーが発生しました'),
          color: colors.danger,
          showSpinner: false,
        };
      default:
        return {
          icon: 'hourglass-outline' as keyof typeof Ionicons.glyphMap,
          message: t('emailVerify.status.waiting', '認証を確認中...'),
          color: colors.text.secondary,
          showSpinner: false,
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        {statusConfig.showSpinner ? (
          <ActivityIndicator 
            size="small" 
            color={statusConfig.color}
          />
        ) : statusConfig.icon ? (
          <Ionicons
            name={statusConfig.icon}
            size={20}
            color={statusConfig.color}
          />
        ) : null}
        <Text style={[styles.statusMessage, { color: statusConfig.color }]}>
          {statusConfig.message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusMessage: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    textAlign: 'center',
  },
});
