import { renderHook, waitFor } from '@testing-library/react-native';
import { useAuthenticatedRouter } from '../../../src/core/hooks/useAuthenticatedRouter';
import { JwtStorage } from '../../../src/features/auth/services/jwtStorage';
import { createAuthenticatedClient } from '../../../src/core/api/trpcClient';
import { Session } from '../../../src/core/constants/sessionVariables';

// モック設定
jest.mock('../../../src/features/auth/services/jwtStorage');
jest.mock('../../../src/core/api/trpcClient');
jest.mock('../../../src/core/constants/sessionVariables');

const mockJwtStorage = JwtStorage as jest.Mocked<typeof JwtStorage>;
const mockCreateAuthenticatedClient = createAuthenticatedClient as jest.MockedFunction<typeof createAuthenticatedClient>;
const mockSession = Session as jest.Mocked<typeof Session>;

describe('useAuthenticatedRouter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSession.languageType = 'ja';
  });

  it('正常にrouterを初期化すること', async () => {
    // 準備
    const mockToken = 'test-jwt-token';
    const mockRouter = { query: jest.fn() } as any;
    
    mockJwtStorage.getToken.mockResolvedValue(mockToken);
    mockCreateAuthenticatedClient.mockReturnValue(mockRouter);

    // 実行
    const { result } = renderHook(() => useAuthenticatedRouter());

    // 検証
    expect(result.current.isInitializing).toBe(true);
    expect(result.current.router).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isInitializing).toBe(false);
    });

    expect(result.current.router).toBe(mockRouter);
    expect(mockJwtStorage.getToken).toHaveBeenCalledTimes(1);
    expect(mockCreateAuthenticatedClient).toHaveBeenCalledWith({
      jwtToken: mockToken,
      languageType: 'ja',
    });
  });

  it('JWTStorage取得エラー時にエラーをthrowすること', async () => {
    // 準備
    const mockError = new Error('JWT取得エラー');
    mockJwtStorage.getToken.mockRejectedValue(mockError);

    // 実行と検証
    expect(() => {
      renderHook(() => useAuthenticatedRouter());
    }).toThrow();
  });
});
