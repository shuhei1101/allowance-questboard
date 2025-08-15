import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

/**
 * ローディング画面コンポーネント
 * アプリ初期化中に表示される
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "アプリを初期化しています..." 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator 
          size="large" 
          color="#007AFF" 
          style={styles.spinner}
        />
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subMessage}>
          しばらくお待ちください 🌟
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
