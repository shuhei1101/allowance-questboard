import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface Props {
  title: string;
  description: string;
  onPress: () => void;
  color: string;
  size?: 'medium' | 'large';
}

/**
 * メインメニューカードコンポーネント
 * メイン機能の各項目を表示するカード
 */
export const MainMenuCard: React.FC<Props> = ({ 
  title, 
  description, 
  onPress, 
  color,
  size = 'medium'
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.menuCard,
        size === 'large' && styles.largeCard,
        { backgroundColor: color }
      ]}
      onPress={onPress}
    >
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuDescription}>{description}</Text>
      <View style={styles.menuButton}>
        <Text style={styles.menuButtonText}>開く →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  largeCard: {
    padding: 32,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
