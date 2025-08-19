import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { ParentEditPage } from '@/features/parent/parent-edit-page/ParentEditPage';
import { SelectIconPage } from '@/features/shared/select-icon-page/SelectIconPage';
import { LoadingPage } from '@/features/shared/loading-page/LoadingPage';
import { DemoNavigator } from '@demo/DemoNavigator';
import { useTheme } from '@/core/theme';

// Navigation types
export type AppStackParamList = {
  // 認証系
  Login: undefined;
  PasswordReset: undefined;
  TermsOfService: undefined;
  
  // 家族管理系
  CreateFamily: undefined;
  ParentEdit: { onConfirm: (parentData: any) => void };
  IconSelect: { 
    initialSelectedIcon?: string;
    onIconSelected: (iconName: string) => void;
    onBack: () => void;
  };
  
  // ホーム系
  ParentHome: undefined;
  ChildHome: undefined;
  
  // クエスト系
  FamilyQuestList: undefined;
  ChildQuestList: undefined;
  OnlineQuestList: undefined;
  TemplateQuestList: undefined;
  QuestDetail: { questId: string };
  QuestEdit: { questId?: string };
  Search: undefined;
  
  // その他
  Notifications: undefined;
  Settings: undefined;
  
  // 共通
  Loading: { message?: string };
  
  // デモ
  Demo: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

/**
 * プレースホルダーページ: パスワードリセット画面
 */
const PasswordResetPage: React.FC = () => {
  return <LoadingPage message="パスワードリセット画面（未実装）" />;
};

/**
 * プレースホルダーページ: 利用規約画面
 */
const TermsOfServicePage: React.FC = () => {
  return <LoadingPage message="利用規約画面（未実装）" />;
};

/**
 * プレースホルダーページ: 新規家族作成画面
 */
const CreateFamilyPage: React.FC = () => {
  return <LoadingPage message="新規家族作成画面（未実装）" />;
};

/**
 * プレースホルダーページ: 親ホーム画面
 */
const ParentHomePage: React.FC = () => {
  return <LoadingPage message="親ホーム画面（未実装）" />;
};

/**
 * プレースホルダーページ: 子供ホーム画面
 */
const ChildHomePage: React.FC = () => {
  return <LoadingPage message="子供ホーム画面（未実装）" />;
};

/**
 * プレースホルダーページ: 家族クエスト一覧画面
 */
const FamilyQuestListPage: React.FC = () => {
  return <LoadingPage message="家族クエスト一覧画面（未実装）" />;
};

/**
 * プレースホルダーページ: 子供クエスト一覧画面
 */
const ChildQuestListPage: React.FC = () => {
  return <LoadingPage message="子供クエスト一覧画面（未実装）" />;
};

/**
 * プレースホルダーページ: オンラインクエスト一覧画面
 */
const OnlineQuestListPage: React.FC = () => {
  return <LoadingPage message="オンラインクエスト一覧画面（未実装）" />;
};

/**
 * プレースホルダーページ: テンプレートクエスト一覧画面
 */
const TemplateQuestListPage: React.FC = () => {
  return <LoadingPage message="テンプレートクエスト一覧画面（未実装）" />;
};

/**
 * プレースホルダーページ: クエスト詳細画面
 */
const QuestDetailPage: React.FC = () => {
  return <LoadingPage message="クエスト詳細画面（未実装）" />;
};

/**
 * プレースホルダーページ: クエスト編集画面
 */
const QuestEditPage: React.FC = () => {
  return <LoadingPage message="クエスト編集画面（未実装）" />;
};

/**
 * プレースホルダーページ: 検索画面
 */
const SearchPage: React.FC = () => {
  return <LoadingPage message="検索画面（未実装）" />;
};

/**
 * プレースホルダーページ: 通知画面
 */
const NotificationsPage: React.FC = () => {
  return <LoadingPage message="通知画面（未実装）" />;
};

/**
 * プレースホルダーページ: 設定画面
 */
const SettingsPage: React.FC = () => {
  return <LoadingPage message="設定画面（未実装）" />;
};

/**
 * アイコン選択画面のラッパー
 */
const IconSelectPageWrapper: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { initialSelectedIcon } = route.params || {};

  const handleIconSelected = (iconName: string) => {
    // TODO: 実際の実装では適切な処理を行う
    Alert.alert('アイコン選択', `${iconName} が選択されました`);
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SelectIconPage
      initialSelectedIcon={initialSelectedIcon}
      onIconSelected={handleIconSelected}
      onBack={handleBack}
    />
  );
};

/**
 * ローディング画面のラッパー
 */
const LoadingPageWrapper: React.FC<{ route: any }> = ({ route }) => {
  const { message } = route.params || {};
  return <LoadingPage message={message} />;
};

/**
 * 親編集画面のラッパー
 */
const ParentEditPageWrapper: React.FC<{ route: any }> = ({ route }) => {
  const { onConfirm } = route.params || {};

  const handleConfirm = (parentData: any) => {
    if (onConfirm) {
      onConfirm(parentData);
    } else {
      Alert.alert('確定', '親情報が保存されました');
    }
  };

  return <ParentEditPage onConfirm={handleConfirm} />;
};

export interface AppNavigatorProps {
  /**
   * グローバルエラーハンドリング関数
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * アプリケーションのナビゲーション設定
 * React Navigationを使用したルーティング管理
 */
export function AppNavigator(props: AppNavigatorProps) {
  const { colors, colorScheme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: colorScheme === 'dark',
        colors: {
          primary: colors.primary,
          background: colors.background.primary,
          card: colors.surface.elevated,
          text: colors.text.primary,
          border: colors.border.light,
          notification: colors.danger,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: 'bold',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <AppStack.Navigator
        id={undefined}
        initialRouteName="Demo"
        screenOptions={{
          headerShown: false,
          cardStyle: [styles.content, { backgroundColor: colors.background.primary }],
        }}
      >
        {/* 認証系 */}
        <AppStack.Screen 
          name="Login" 
          component={LoginPage}
          options={{
            headerShown: true,
            title: 'ログイン',
          }}
        />
        <AppStack.Screen 
          name="PasswordReset" 
          component={PasswordResetPage}
          options={{
            headerShown: true,
            title: 'パスワードリセット',
          }}
        />
        <AppStack.Screen 
          name="TermsOfService" 
          component={TermsOfServicePage}
          options={{
            headerShown: true,
            title: '利用規約',
          }}
        />

        {/* 家族管理系 */}
        <AppStack.Screen 
          name="CreateFamily" 
          component={CreateFamilyPage}
          options={{
            headerShown: true,
            title: '新規家族作成',
          }}
        />
        <AppStack.Screen 
          name="ParentEdit" 
          component={ParentEditPageWrapper}
          options={{
            headerShown: true,
            title: '親情報編集',
          }}
        />
        <AppStack.Screen 
          name="IconSelect" 
          component={IconSelectPageWrapper}
          options={{
            headerShown: false,
          }}
        />

        {/* ホーム系 */}
        <AppStack.Screen 
          name="ParentHome" 
          component={ParentHomePage}
          options={{
            headerShown: true,
            title: '親ホーム',
          }}
        />
        <AppStack.Screen 
          name="ChildHome" 
          component={ChildHomePage}
          options={{
            headerShown: true,
            title: '子供ホーム',
          }}
        />

        {/* クエスト系 */}
        <AppStack.Screen 
          name="FamilyQuestList" 
          component={FamilyQuestListPage}
          options={{
            headerShown: true,
            title: '家族クエスト一覧',
          }}
        />
        <AppStack.Screen 
          name="ChildQuestList" 
          component={ChildQuestListPage}
          options={{
            headerShown: true,
            title: '子供クエスト一覧',
          }}
        />
        <AppStack.Screen 
          name="OnlineQuestList" 
          component={OnlineQuestListPage}
          options={{
            headerShown: true,
            title: 'オンラインクエスト一覧',
          }}
        />
        <AppStack.Screen 
          name="TemplateQuestList" 
          component={TemplateQuestListPage}
          options={{
            headerShown: true,
            title: 'テンプレートクエスト一覧',
          }}
        />
        <AppStack.Screen 
          name="QuestDetail" 
          component={QuestDetailPage}
          options={{
            headerShown: true,
            title: 'クエスト詳細',
          }}
        />
        <AppStack.Screen 
          name="QuestEdit" 
          component={QuestEditPage}
          options={{
            headerShown: true,
            title: 'クエスト編集',
          }}
        />
        <AppStack.Screen 
          name="Search" 
          component={SearchPage}
          options={{
            headerShown: true,
            title: '検索',
          }}
        />

        {/* その他 */}
        <AppStack.Screen 
          name="Notifications" 
          component={NotificationsPage}
          options={{
            headerShown: true,
            title: '通知',
          }}
        />
        <AppStack.Screen 
          name="Settings" 
          component={SettingsPage}
          options={{
            headerShown: true,
            title: '設定',
          }}
        />

        {/* 共通 */}
        <AppStack.Screen 
          name="Loading" 
          component={LoadingPageWrapper}
          options={{
            headerShown: false,
          }}
        />

        {/* デモ */}
        <AppStack.Screen 
          name="Demo" 
          component={DemoNavigator}
          options={{
            headerShown: false,
            title: 'デモ',
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
