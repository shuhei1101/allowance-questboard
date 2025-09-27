import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from "../theme";

interface NavigationEntryTextProps {
  /** 表示するテキスト */
  children: string;
}

/** NavigationEntryLayout内で使用するテキストコンポーネント
 * 
 * 文字色を少し薄くして表示する */
export const NavigationEntryText: React.FC<NavigationEntryTextProps> = ({
  children,
}) => {
  const { colors } = useTheme();
  
  return (
    <Text style={[styles.entryText, { color: colors.text.secondary }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  entryText: {
    fontSize: 16,
  },
});
