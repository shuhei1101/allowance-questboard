import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  description: string;
  onPress: () => void;
  color: string;
}

/**
 * 開発ツールカードコンポーネント
 * 開発ツールの各項目を表示するカード
 */
export const DevToolCard: React.FC<Props> = ({ 
  title, 
  description, 
  onPress, 
  color 
}) => {
  return (
    <TouchableOpacity
      style={[styles.toolCard, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toolCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  toolDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 16,
  },
});
