import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { ParentLoginButton } from './ParentLoginButton';
import { ChildLoginButton } from './ChildLoginButton';
import { CancelButton } from './CancelButton';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface SelectFamilyDialogProps {
  /** ダイアログ表示状態 */
  isVisible: boolean;
  /** 家族名 */
  familyName?: string;
  /** 親IDが存在するか（親ログインボタン表示制御） */
  hasParentId?: boolean;
  /** 子供IDが存在するか（子供ログインボタン表示制御） */
  hasChildId?: boolean;
  /** 親ログインタップ時のコールバック */
  onParentLogin: () => void;
  /** 子供ログインタップ時のコールバック */
  onChildLogin: () => void;
  /** ダイアログを閉じるコールバック */
  onClose: () => void;
}

/**
 * 家族選択ダイアログ
 * 認証後に表示される家族選択モーダル
 */
export const SelectFamilyDialog: React.FC<SelectFamilyDialogProps> = ({
  isVisible,
  familyName,
  hasParentId = true,
  hasChildId = true,
  onParentLogin,
  onChildLogin,
  onClose,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.dialogContainer, { backgroundColor: colors.background.secondary }]}>
          <Text style={[styles.title, { color: colors.text.primary }]}>{t('login.selectLoginType')}</Text>
          
          {familyName && (
            <Text style={[styles.familyName, { color: colors.text.secondary }]}>
              {t('login.familyLabel', { familyName })}
            </Text>
          )}
          
          <View style={styles.buttonContainer}>
            {hasParentId && (
              <ParentLoginButton onPress={onParentLogin} />
            )}
            
            {hasChildId && (
              <ChildLoginButton onPress={onChildLogin} />
            )}
          </View>
          
          <CancelButton onClick={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  familyName: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 8,
  },
});
