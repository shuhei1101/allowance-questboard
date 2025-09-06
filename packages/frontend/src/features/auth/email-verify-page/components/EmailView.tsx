import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';
import { Email } from '../../../../../../backend/src/features/auth/value-object/email';

interface Props {
  /** 表示するメールアドレス */
  userEmail?: Email;
  /** 一部をマスク表示するか */
  masked?: boolean;
}

/**
 * 送信先メールアドレス表示コンポーネント
 * 
 * 登録したメールアドレスをハイライト表示
 * セキュリティ考慮で一部マスク表示機能付き
 */
export const EmailView: React.FC<Props> = ({ 
  userEmail, 
  masked = false 
}) => {
  const { colors } = useTheme();

  const getMaskedEmail = (email: string): string => {
    const [localPart, domain] = email.split('@');
    if (!domain) return email;

    // ローカル部の最初の文字と最後の文字以外を*でマスク
    if (localPart.length <= 2) {
      return `${localPart[0]}*@${domain}`;
    }
    
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  };

  const displayEmail = userEmail && masked ? getMaskedEmail(userEmail.value) : userEmail?.value || '';

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.elevated }]}>
      <Ionicons
        name="mail-outline"
        size={20}
        color={colors.primary}
        style={styles.icon}
      />
      <Text style={[styles.emailText, { color: colors.text.primary }]}>
        {displayEmail}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 24,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
