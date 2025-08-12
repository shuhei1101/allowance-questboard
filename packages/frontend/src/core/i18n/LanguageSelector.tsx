import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@frontend/core/theme';
import { useTranslation } from './useTranslation';
import { supportedLanguages, languageNames, SupportedLanguage } from './index';

interface LanguageSelectorProps {
  /** コンパクト表示（アイコンのみ） */
  compact?: boolean;
  /** 選択時のコールバック */
  onLanguageChange?: (language: SupportedLanguage) => void;
}

/**
 * 言語切り替えコンポーネント
 * システム言語の切り替えを行うUI
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  onLanguageChange,
}) => {
  const { colors } = useTheme();
  const { currentLanguage, changeLanguage } = useTranslation();
  
  const handleLanguageChange = async (language: SupportedLanguage) => {
    await changeLanguage(language);
    onLanguageChange?.(language);
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    button: {
      paddingHorizontal: compact ? 8 : 12,
      paddingVertical: compact ? 4 : 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    activeButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    inactiveButton: {
      backgroundColor: colors.background.secondary,
    },
    buttonText: {
      fontSize: compact ? 12 : 14,
      fontWeight: '500',
    },
    activeButtonText: {
      color: colors.text.inverse,
    },
    inactiveButtonText: {
      color: colors.text.secondary,
    },
  });
  
  return (
    <View style={styles.container}>
      {supportedLanguages.map((language) => {
        const isActive = language === currentLanguage;
        
        return (
          <TouchableOpacity
            key={language}
            style={[
              styles.button,
              isActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => handleLanguageChange(language)}
            disabled={isActive}
          >
            <Text
              style={[
                styles.buttonText,
                isActive ? styles.activeButtonText : styles.inactiveButtonText,
              ]}
            >
              {compact ? language.toUpperCase() : languageNames[language]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/**
 * シンプルな言語表示コンポーネント
 * 現在の言語を表示するだけ
 */
export const LanguageIndicator: React.FC = () => {
  const { colors } = useTheme();
  const { currentLanguageName, currentLanguage } = useTranslation();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: colors.surface.base,
      borderRadius: 4,
    },
    text: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
    language: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text.secondary,
      marginLeft: 4,
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lang:</Text>
      <Text style={styles.language}>{currentLanguage.toUpperCase()}</Text>
    </View>
  );
};
