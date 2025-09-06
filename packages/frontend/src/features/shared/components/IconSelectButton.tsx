import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { EntryFrame } from '@/core/components/EntryFrame';
import { EntryWithError } from '@/core/components/EntryWithError';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  selectedIcon?: string; // Ioniconsのアイコン名 (例: "home", "person", "settings")
  onPress: () => void;
  error?: string;
}

/**
 * アイコン選択ボタンコンポーネント
 * 右側に`>`アイコンがあり、アイコン選択画面へ遷移する
 * react-native-vector-icons (Ionicons) を使用してアイコンを表示
 */
export const IconSelectButton: React.FC<Props> = ({ selectedIcon, onPress, error }) => {
  const { colors } = useTheme();

  return (
    <EntryWithError error={error}>
      <EntryFrame
        icon="diamond"
        title="アイコン"
        required={false}
      >
        <TouchableOpacity 
          style={[styles.button, { borderColor: colors.border.light }]}
          onPress={onPress}
        >
          <View style={styles.content}>
            {selectedIcon ? (
              <View style={[styles.iconContainer, { backgroundColor: colors.surface.secondary }]}>
                <Ionicons 
                  name={selectedIcon as any}
                  size={24} 
                  color={colors.text.primary} 
                />
              </View>
            ) : (
              <View style={[styles.iconContainer, { backgroundColor: colors.surface.secondary }]}>
                <Text style={[styles.placeholderText, { color: colors.text.secondary }]}>
                  選択してください
                </Text>
              </View>
            )}
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={colors.text.secondary} 
            />
          </View>
        </TouchableOpacity>
      </EntryFrame>
    </EntryWithError>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  placeholderText: {
    fontSize: 12,
  },
});
