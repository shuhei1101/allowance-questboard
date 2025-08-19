import React from 'react';
import { View, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { jest } from '@jest/globals';

// Mock dependencies
jest.mock('@/features/auth/services/initMasterData', () => ({
  initMasterData: jest.fn(() => Promise.resolve())
}));

jest.mock('@/features/auth/stores/sessionStore', () => ({
  useSessionStore: jest.fn(() => ({
    setLanguageType: jest.fn()
  }))
}));

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'ja' }])
}));

jest.mock('./src/features/auth/utils/localeToLanguageType', () => ({
  localeToLanguageType: jest.fn(() => ({
    name: { value: 'Japanese' },
    sortOrder: 1
  }))
}));

jest.mock('i18next', () => ({
  changeLanguage: jest.fn(() => Promise.resolve())
}));

jest.mock('@/core/theme', () => ({
  useTheme: jest.fn(() => ({
    colors: {
      background: { primary: '#ffffff' },
      text: { primary: '#000000' },
      primary: '#000000',
      surface: { elevated: '#ffffff' },
      border: { light: '#cccccc' },
      danger: '#ff0000'
    },
    colorScheme: 'light'
  }))
}));

jest.mock('@/core/theme/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children
}));

jest.mock('./src/features/shared/loading-page/LoadingPage', () => ({
  LoadingPage: ({ message }: { message: string }) => (
    <View testID="loading-page">
      <Text>{message}</Text>
    </View>
  )
}));

jest.mock('./src/core/errors/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children
}));

jest.mock('@/features/auth/login-page/LoginPage', () => ({
  LoginPage: () => (
    <View testID="login-page">
      <Text>Login Page</Text>
    </View>
  )
}));

jest.mock('@/features/demo/DemoNavigator', () => ({
  DemoNavigator: () => (
    <View testID="demo-navigator">
      <Text>Demo Navigator</Text>
    </View>
  )
}));

// Navigation mocks
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ component: Component }: { component: React.ComponentType }) => <Component />
  })
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null
}));

describe('App Initialization', () => {
  it('should show loading screen during initialization', async () => {
    // This test verifies that the loading screen is shown initially
    // when the app starts, demonstrating that initialization logic
    // has been moved to AppContent level
    
    const App = require('../App.tsx').default;
    const { getByTestId } = render(<App />);
    
    // Should show loading page initially during initialization
    expect(getByTestId('loading-page')).toBeTruthy();
  });
});