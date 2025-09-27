import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EntryLayout } from '@/core/components/EntryLayout';
import { EntryWithError } from '@/core/components/EntryWithError';
import { NavigationEntryLayout, NavigationEntryText } from '@/core/components/NavigationEntryLayout';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/core/i18n/useTranslation';
import { Icon } from '@backend/features/icon/domain/icon';
import { AppIcon } from '@/features/icon/models/AppIcon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CommonStackMeta } from '../CommonNavigator';
import { AppStackParamList } from '../../../../AppNavigator';
import { OnIconSelected } from '../../icon/icon-select-page/hooks/handlers/useConfirmHandler';

interface Props {
  title: string;
  selectedIcon?: Icon;
  onIconSelected: OnIconSelected;
  error?: string;
}

/** アイコン選択ボタンコンポーネント（タイトル付き）
 * 
 * EntryLayoutでラップしたTouchableOpacityボタン */
export const IconSelectButtonEntry: React.FC<Props> = ({ title, selectedIcon, onIconSelected, error }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handlePress = () => {
    navigation.navigate(CommonStackMeta.name, { 
      screen: CommonStackMeta.screens.iconSelect,
      params: {
        initialSelectedIcon: selectedIcon,
        onIconSelected: onIconSelected,
      }
    });
  };

  return (
    <EntryLayout
      icon="happy"
      title={title}
      required={false}
    >
      <EntryWithError error={error}>
        <NavigationEntryLayout onPress={handlePress}>
          {selectedIcon ? (
            <View style={styles.content}>
              <View style={[styles.iconContainer, { backgroundColor: colors.surface.secondary }]}>
                {(() => {
                  try {
                    const appIcon = AppIcon.fromName(selectedIcon);
                    const IconComponent = appIcon.obj;
                    return (
                      <IconComponent 
                        size={24} 
                        color={colors.text.primary} 
                      />
                    );
                  } catch (error) {
                    // アイコンが見つからない場合はデフォルトアイコンを表示
                    return (
                      <Ionicons 
                        name="help-circle-outline"
                        size={24} 
                        color={colors.text.primary} 
                      />
                    );
                  }
                })()}
              </View>
            </View>
          ) : (
            <NavigationEntryText>
              {t('shared.components.iconSelectButtonEntry.noSelection')}
            </NavigationEntryText>
          )}
        </NavigationEntryLayout>
      </EntryWithError>
    </EntryLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSelectionText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
