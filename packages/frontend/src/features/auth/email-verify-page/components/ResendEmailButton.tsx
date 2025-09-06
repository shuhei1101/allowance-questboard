import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import type { SetResending, SetResendCooldown, IncrementResendCount, UpdateLastResendTime } from '../stores/emailVerifyPageStore';

interface Props {
  /** 再送処理中かどうか */
  isResending: boolean;
  /** 再送までの残り秒数 */
  resendCooldown: number;
  /** 本日の再送回数 */
  resendCount: number;
  /** 1日の最大再送回数 */
  maxResendCount: number;
  /** 最後の再送時刻 */
  lastResendTime: Date | undefined;
  /** 再送状態設定 */
  setResending: SetResending;
  /** 再送クールダウン設定 */
  setResendCooldown: SetResendCooldown;
  /** 再送回数増加 */
  incrementResendCount: IncrementResendCount;
  /** 最後の再送時刻更新 */
  updateLastResendTime: UpdateLastResendTime;
  /** 実際の再送処理を行う関数 */
  onResend: () => void;
}

/**
 * 確認メール再送ボタンコンポーネント
 * 
 * 再送ボタン（クールダウン機能付き）
 * ローディング状態表示、再送回数制限機能
 */
export const ResendEmailButton: React.FC<Props> = ({
  isResending,
  resendCooldown,
  resendCount,
  maxResendCount,
  lastResendTime,
  setResending,
  setResendCooldown,
  incrementResendCount,
  updateLastResendTime,
  onResend,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(resendCooldown);

  useEffect(() => {
    setCountdown(resendCooldown);
  }, [resendCooldown]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setResendCooldown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, setResendCooldown]);

  const remainingCount = maxResendCount - resendCount;
  const isButtonDisabled = isResending || countdown > 0 || remainingCount <= 0;

  const getButtonText = () => {
    if (isResending) {
      return t('emailVerify.resend.sending', '送信中...');
    }
    if (countdown > 0) {
      return t('emailVerify.resend.cooldown', `{seconds}秒後に利用可能`, { seconds: countdown });
    }
    if (remainingCount <= 0) {
      return t('emailVerify.resend.limitReached', '本日の上限に達しました');
    }
    return t('emailVerify.resend.button', '確認メールを再送する');
  };

  const getSubText = () => {
    if (remainingCount > 0) {
      return t('emailVerify.resend.remaining', '残り{count}回', { count: remainingCount });
    }
    if (countdown > 0) {
      return t('emailVerify.resend.cooldownInfo', 'しばらくお待ちください');
    }
    return null;
  };

  const handleResend = async () => {
    if (isButtonDisabled) return;
    
    try {
      setResending(true);
      await onResend();
      incrementResendCount();
      updateLastResendTime();
      setResendCooldown(60); // 60秒のクールダウン
      setCountdown(60);
    } catch (error) {
      console.error('再送エラー:', error);
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { 
            backgroundColor: isButtonDisabled ? colors.surface.secondary : colors.surface.elevated,
            borderColor: isButtonDisabled ? colors.border.light : colors.primary,
          }
        ]}
        onPress={handleResend}
        disabled={isButtonDisabled}
      >
        <View style={styles.buttonContent}>
          {isResending ? (
            <ActivityIndicator 
              size="small" 
              color={colors.primary}
              style={styles.icon}
            />
          ) : (
            <Ionicons
              name="mail-outline"
              size={20}
              color={isButtonDisabled ? colors.text.disabled : colors.primary}
              style={styles.icon}
            />
          )}
          <Text style={[
            styles.buttonText, 
            { 
              color: isButtonDisabled ? colors.text.disabled : colors.primary,
            }
          ]}>
            {getButtonText()}
          </Text>
        </View>
      </TouchableOpacity>
      {getSubText() && (
        <Text style={[styles.subText, { color: colors.text.secondary }]}>
          {getSubText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
