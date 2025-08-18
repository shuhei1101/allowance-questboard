import { useState } from 'react';

/**
 * アイコン選択モーダルを管理するカスタムフック
 */
export const useIconSelectModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | undefined>(undefined);

  /**
   * モーダルを表示
   * @param initialIcon 初期選択するアイコン名
   */
  const openModal = (initialIcon?: string) => {
    setSelectedIcon(initialIcon);
    setIsVisible(true);
  };

  /**
   * モーダルを閉じる
   */
  const closeModal = () => {
    setIsVisible(false);
  };

  /**
   * アイコンが選択された時の処理
   * @param iconName 選択されたアイコン名
   */
  const handleIconSelected = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  return {
    isVisible,
    selectedIcon,
    openModal,
    closeModal,
    handleIconSelected,
  };
};
