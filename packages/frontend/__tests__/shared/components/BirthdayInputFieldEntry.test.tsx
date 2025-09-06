import React from 'react';
import { render } from '@testing-library/react-native';
import { BirthdayInputWithTitle } from '../../../src/features/shared/components/BirthdayInputWithTitle';

// モック設定
jest.mock('../../../src/core/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../../src/core/theme', () => ({
  useTheme: () => ({
    colors: {
      text: {
        primary: '#000000',
        secondary: '#666666',
      },
      background: {
        secondary: '#f5f5f5',
      },
      border: {
        light: '#e0e0e0',
      },
      danger: '#ff0000',
    },
  }),
}));

describe('BirthdayInputFieldEntry', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('プレースホルダーテキストが表示される', () => {
    const { getByText } = render(<BirthdayInputWithTitle {...defaultProps} />);
    expect(getByText('YYYY/MM/DD')).toBeTruthy();
  });

  it('日付が設定されている場合、フォーマット済みの日付が表示される', () => {
    const testDate = '2000-01-15T00:00:00.000Z';
    const { getByText } = render(<BirthdayInputWithTitle {...defaultProps} value={testDate} />);
    expect(getByText('2000/01/15')).toBeTruthy();
  });
});
