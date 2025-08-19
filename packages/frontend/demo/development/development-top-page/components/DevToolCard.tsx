import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  description: string;
  onPress: () => void;
  color: string;
  disabled?: boolean;
}

/**
 * 開発ツールカードコンポーネント
 * 開発ツールの各項目を表示するカード
 */
export const DevToolCard: React.FC<Props> = ({ 
  title, 
  description, 
  onPress, 
  color,
  disabled = false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.toolCard, 
        { backgroundColor: color },
        disabled && styles.disabled
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={[styles.toolTitle, disabled && styles.disabledText]}>
        {title}
      </Text>
      <Text style={[styles.toolDescription, disabled && styles.disabledText]}>
        {description}
      </Text>
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
  disabled: {
    opacity: 0.6,
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
  disabledText: {
    opacity: 0.7,
  },
});
