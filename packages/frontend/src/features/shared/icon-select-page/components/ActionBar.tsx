import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  /**
   * 戻るボタンが押された時のコールバック
   */
  onBack: () => void;
  /**
   * 確定ボタンが押された時のコールバック
   */
  onConfirm: () => void;
  /**
   * 確定ボタンの有効状態
   */
  isConfirmEnabled: boolean;
}

/**
 * アイコン選択画面のアクションバー
 * 戻るボタン、タイトル、確定ボタンを表示
 */
export const ActionBar: React.FC<Props> = ({
  onBack,
  onConfirm,
  isConfirmEnabled,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.elevated }]}>
      {/* 戻るボタン */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        testID="icon-select-back-button"
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={colors.text.primary}
        />
      </TouchableOpacity>

      {/* タイトル */}
      <Text style={[styles.title, { color: colors.text.primary }]}>
        アイコン選択画面
      </Text>

      {/* 確定ボタン */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          !isConfirmEnabled && styles.confirmButtonDisabled,
        ]}
        onPress={onConfirm}
        disabled={!isConfirmEnabled}
        testID="icon-select-confirm-button"
      >
        <Ionicons
          name="checkmark"
          size={24}
          color={isConfirmEnabled ? colors.text.primary : colors.text.disabled}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40, // ステータスバー分のpadding
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: 8,
    minWidth: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  confirmButton: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
});
