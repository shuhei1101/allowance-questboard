import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useNavigation } from '@react-navigation/native';

interface Props {
  selectedIcon?: string; // Ioniconsのアイコン名 (例: "home", "person", "settings")
  onIconSelected: (iconName: string) => void;
  error?: string;
}

/**
 * アイコン選択エントリーコンポーネント
 * EntryFieldとFieldWithErrorでラップしたアイコン選択ボタン
 * react-native-vector-icons (Ionicons) を使用してアイコンを表示
 */
export const IconSelectButtonEntry: React.FC<Props> = ({ selectedIcon, onIconSelected, error }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePress = () => {
    // アイコン選択画面に遷移
    (navigation as any).navigate('IconSelectPage', {
      initialSelectedIcon: selectedIcon,
    });
  };

  return (
    <EntryField
      icon="happy"
      title={t('shared.components.iconSelectButtonEntry.fieldTitle')}
      required={false}
    >
      <FieldWithError error={error}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
        >
          <View style={styles.content}>
            {selectedIcon ? (
              <>
                <View style={styles.leftSpacer} />
                <View style={[styles.iconContainer, { backgroundColor: colors.surface.secondary }]}>
                  <Ionicons 
                    name={selectedIcon as any}
                    size={24} 
                    color={colors.text.primary} 
                  />
                </View>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.text.secondary} 
                />
              </>
            ) : (
              <>
                <View style={styles.leftSpacer} />
                <Text style={[styles.noSelectionText, { color: colors.text.secondary }]}>
                  {t('shared.components.iconSelectButtonEntry.noSelection')}
                </Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.text.secondary} 
                />
              </>
            )}
          </View>
        </TouchableOpacity>
      </FieldWithError>
    </EntryField>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSpacer: {
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 24,
    marginRight: 8,
  },
  noSelectionText: {
    fontSize: 16,
    marginRight: 8,
  },
});
