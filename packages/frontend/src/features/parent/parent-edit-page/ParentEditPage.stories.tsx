import type { Meta, StoryObj } from '@storybook/react';
import { ParentEditPage } from './ParentEditPage';
import React from 'react';
import { View } from 'react-native';

// モックされたストア
const mockParentDetailPageStore = {
  parentForm: {
    name: { value: 'テスト親' },
    email: { value: 'test@example.com' },
    password: { value: 'password123' },
    icon: { value: 'default-icon' },
    birthday: { value: '1990-01-01' },
    isValid: true,
  },
  nameError: null,
  emailError: null,
  passwordError: null,
  birthdayError: null,
  isLoading: false,
  updateParentForm: () => {},
  setNameError: () => {},
  setEmailError: () => {},
  setPasswordError: () => {},
  setBirthdayError: () => {},
  setLoading: () => {},
  clearErrors: () => {},
};

const mockSessionStore = {
  languageType: 'ja' as const,
  jwt: 'mock-jwt-token',
  updateLanguageType: () => {},
  updateJwt: () => {},
  updateFamilyMemberType: () => {},
};

// ストアをモック
jest.mock('./stores/parentDetailPageStore', () => ({
  useParentDetailPageStore: () => mockParentDetailPageStore,
}));

jest.mock('@/features/auth/stores/sessionStore', () => ({
  useSessionStore: () => mockSessionStore,
}));

// テーマプロバイダーのモック
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }}>{children}</View>
);

jest.mock('@/core/theme', () => ({
  useTheme: () => ({
    colors: {
      background: { primary: '#ffffff' },
      text: { primary: '#000000' },
      primary: '#007AFF',
    },
  }),
}));

const meta: Meta<typeof ParentEditPage> = {
  title: 'Features/Parent/ParentEditPage',
  component: ParentEditPage,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ width: 375, height: 812, padding: 20 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ParentEditPage>;

export const Default: Story = {
  args: {
    onConfirm: (parentData) => {
      console.log('親情報が確定されました:', parentData);
      alert(`親情報: ${JSON.stringify(parentData, null, 2)}`);
    },
  },
};

export const WithErrors: Story = {
  args: {
    onConfirm: (parentData) => console.log('親情報:', parentData),
  },
  decorators: [
    (Story) => {
      // エラー状態のモック
      const mockStoreWithErrors = {
        ...mockParentDetailPageStore,
        nameError: '名前は必須です',
        emailError: 'メールアドレスの形式が正しくありません',
        passwordError: 'パスワードは8文字以上である必要があります',
        birthdayError: '誕生日は必須です',
        parentForm: {
          ...mockParentDetailPageStore.parentForm,
          isValid: false,
        },
      };
      
      jest.doMock('./stores/parentDetailPageStore', () => ({
        useParentDetailPageStore: () => mockStoreWithErrors,
      }));
      
      return (
        <ThemeProvider>
          <View style={{ width: 375, height: 812, padding: 20 }}>
            <Story />
          </View>
        </ThemeProvider>
      );
    },
  ],
};

export const Loading: Story = {
  args: {
    onConfirm: (parentData) => console.log('親情報:', parentData),
  },
  decorators: [
    (Story) => {
      // ローディング状態のモック
      const mockStoreLoading = {
        ...mockParentDetailPageStore,
        isLoading: true,
      };
      
      jest.doMock('./stores/parentDetailPageStore', () => ({
        useParentDetailPageStore: () => mockStoreLoading,
      }));
      
      return (
        <ThemeProvider>
          <View style={{ width: 375, height: 812, padding: 20 }}>
            <Story />
          </View>
        </ThemeProvider>
      );
    },
  ],
};
