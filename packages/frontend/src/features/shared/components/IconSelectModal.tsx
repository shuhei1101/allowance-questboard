import React, { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet } from 'react-native';
import { IconSelectPage } from '../../icon/icon-select-page/IconSelectPage';
import { IconName } from '@backend/features/icon/value-objects/iconName';

interface Props {
  /**
   * モーダルの表示状態
   */
  visible: boolean;
  /**
   * 初期選択されたアイコン名
   */
  initialSelectedIcon?: IconName;
  /**
   * アイコンが選択された時のコールバック
   * @param iconName 選択されたアイコン名
   */
  onIconSelected: (iconName: IconName) => void;
  /**
   * モーダルを閉じる時のコールバック
   */
  onClose: () => void;
}

/**
 * アイコン選択画面をモーダルで表示するコンポーネント
 */
export const IconSelectModal: React.FC<Props> = ({
  visible,
  initialSelectedIcon,
  onIconSelected,
  onClose,
}) => {
  const handleIconSelected = (iconName: IconName) => {
    onIconSelected(iconName);
    onClose();
  };

  const handleBack = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <IconSelectPage
          initialSelectedIcon={initialSelectedIcon}
          onIconSelected={handleIconSelected}
          onBack={handleBack}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
