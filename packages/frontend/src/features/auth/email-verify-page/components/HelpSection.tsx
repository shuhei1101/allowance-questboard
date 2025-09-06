import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import type { ToggleHelpSection } from '../stores/emailVerifyPageStore';

interface Props {
  /** ヘルプセクションが展開されているか */
  isHelpSectionExpanded: boolean;
  /** ヘルプセクション開閉 */
  toggleHelpSection: ToggleHelpSection;
}

/**
 * ヘルプ・トラブルシュート表示コンポーネント
 * 
 * 「メールが届かない場合は？」等のヘルプ情報
 * 折りたたみ式表示、スパムフォルダ確認等のアドバイス表示
 */
export const HelpSection: React.FC<Props> = ({
  isHelpSectionExpanded,
  toggleHelpSection,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const helpItems = [
    {
      icon: 'folder-outline' as keyof typeof Ionicons.glyphMap,
      title: t('emailVerify.help.spam.title', 'スパムフォルダを確認'),
      description: t(
        'emailVerify.help.spam.description', 
        '確認メールが迷惑メールフォルダに振り分けられている可能性があります。'
      ),
    },
    {
      icon: 'settings-outline' as keyof typeof Ionicons.glyphMap,
      title: t('emailVerify.help.settings.title', 'メール設定を確認'),
      description: t(
        'emailVerify.help.settings.description', 
        'メールアプリの受信設定や、ドメイン拒否設定をご確認ください。'
      ),
    },
    {
      icon: 'time-outline' as keyof typeof Ionicons.glyphMap,
      title: t('emailVerify.help.wait.title', '少し時間を置いて確認'),
      description: t(
        'emailVerify.help.wait.description', 
        'メール配信に時間がかかる場合があります。5-10分お待ちください。'
      ),
    },
    {
      icon: 'help-circle-outline' as keyof typeof Ionicons.glyphMap,
      title: t('emailVerify.help.support.title', 'サポートに連絡'),
      description: t(
        'emailVerify.help.support.description', 
        '上記を試してもメールが届かない場合は、サポートまでお問い合わせください。'
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.header, { backgroundColor: colors.surface.elevated }]}
        onPress={toggleHelpSection}
      >
        <View style={styles.headerContent}>
          <Ionicons
            name="help-circle-outline"
            size={20}
            color={colors.text.secondary}
            style={styles.headerIcon}
          />
          <Text style={[styles.headerText, { color: colors.text.secondary }]}>
            {t('emailVerify.help.title', 'メールが届かない場合は？')}
          </Text>
        </View>
        <Ionicons
          name={isHelpSectionExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text.secondary}
        />
      </TouchableOpacity>

      {isHelpSectionExpanded && (
        <View style={[styles.content, { backgroundColor: colors.surface.elevated }]}>
          {helpItems.map((item, index) => (
            <View key={index} style={styles.helpItem}>
              <View style={styles.helpItemHeader}>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={colors.primary}
                  style={styles.helpItemIcon}
                />
                <Text style={[styles.helpItemTitle, { color: colors.text.primary }]}>
                  {item.title}
                </Text>
              </View>
              <Text style={[styles.helpItemDescription, { color: colors.text.secondary }]}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  helpItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  helpItemIcon: {
    marginRight: 8,
  },
  helpItemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  helpItemDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 26,
  },
});
