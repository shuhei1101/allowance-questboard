import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { useSessionStore } from '@/features/session/store/sessionStore';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import { FamilyMemberTypeId } from '@backend/features/family-member/value-object/familyMemberTypeId';

// localStorageのモック
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// globalオブジェクトにlocalStorageを設定
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// モック用のFamilyMemberTypeValueを作成
const createMockFamilyMemberTypeValue = (id: number): FamilyMemberTypeValue => {
  return new FamilyMemberTypeValue(new FamilyMemberTypeId(id));
};

describe('useSessionStore', () => {
  // テスト前にストアをリセット
  beforeEach(() => {
    useSessionStore.getState().clearAuthInfo();
  });

  // テスト後にlocalStorageをクリア
  afterEach(() => {
    localStorage.clear();
  });

  describe('初期状態', () => {
    test('authInfoがnullであること', () => {
      const { authInfo } = useSessionStore.getState();
      expect(authInfo).toBeNull();
    });

    test('未認証状態であること', () => {
      const { isAuthenticated } = useSessionStore.getState();
      expect(isAuthenticated()).toBe(false);
    });

    test('家族メンバータイプがnullであること', () => {
      const { getFamilyMemberType } = useSessionStore.getState();
      expect(getFamilyMemberType()).toBeNull();
    });
  });

  describe('updateJwt', () => {
    test('JWTトークンを正しく設定できること', () => {
      const testJwt = 'test-jwt-token';

      const { updateJwt } = useSessionStore.getState();
      updateJwt(testJwt);

      const { authInfo } = useSessionStore.getState();
      expect(authInfo).toEqual({ jwt: testJwt });
    });

    test('JWT設定後に認証済み状態になること', () => {
      const testJwt = 'test-jwt-token';

      const { updateJwt, isAuthenticated } = useSessionStore.getState();
      updateJwt(testJwt);

      expect(isAuthenticated()).toBe(true);
    });
  });

  describe('updateFamilyMemberType', () => {
    test('家族メンバータイプを正しく設定できること', () => {
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(2);

      const { updateFamilyMemberType } = useSessionStore.getState();
      updateFamilyMemberType(mockFamilyMemberType);

      const { authInfo } = useSessionStore.getState();
      expect(authInfo).toEqual({ familyMemberType: mockFamilyMemberType });
    });

    test('家族メンバータイプが取得できること', () => {
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(2);

      const { updateFamilyMemberType, getFamilyMemberType } = useSessionStore.getState();
      updateFamilyMemberType(mockFamilyMemberType);

      expect(getFamilyMemberType()).toEqual(mockFamilyMemberType);
    });

    test('JWTと家族メンバータイプを組み合わせて設定できること', () => {
      const testJwt = 'test-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      const { authInfo } = useSessionStore.getState();
      expect(authInfo).toEqual({
        jwt: testJwt,
        familyMemberType: mockFamilyMemberType
      });
    });
  });

  describe('clearAuthInfo', () => {
    test('認証情報をクリアできること', () => {
      // まず認証情報を設定
      const testJwt = 'test-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType, clearAuthInfo } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      // 認証情報をクリア
      clearAuthInfo();

      const { authInfo } = useSessionStore.getState();
      expect(authInfo).toBeNull();
    });

    test('クリア後に未認証状態になること', () => {
      // まず認証情報を設定
      const testJwt = 'test-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType, clearAuthInfo, isAuthenticated } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      // 認証情報をクリア
      clearAuthInfo();

      expect(isAuthenticated()).toBe(false);
    });

    test('クリア後に家族メンバータイプがnullになること', () => {
      // まず認証情報を設定
      const testJwt = 'test-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType, clearAuthInfo, getFamilyMemberType } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      // 認証情報をクリア
      clearAuthInfo();

      expect(getFamilyMemberType()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    test('JWTトークンが存在する場合はtrueを返すこと', () => {
      const testJwt = 'valid-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType, isAuthenticated } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      expect(isAuthenticated()).toBe(true);
    });

    test('JWTトークンが空の場合はfalseを返すこと', () => {
      const { updateJwt, isAuthenticated } = useSessionStore.getState();
      updateJwt('');

      expect(isAuthenticated()).toBe(false);
    });

    test('authInfoがnullの場合はfalseを返すこと', () => {
      const { clearAuthInfo, isAuthenticated } = useSessionStore.getState();
      clearAuthInfo();

      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('getFamilyMemberType', () => {
    test('認証済みの場合は家族メンバータイプを返すこと', () => {
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(2);
      const testJwt = 'test-jwt-token';

      const { updateJwt, updateFamilyMemberType, getFamilyMemberType } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      expect(getFamilyMemberType()).toEqual(mockFamilyMemberType);
    });

    test('未認証の場合はnullを返すこと', () => {
      const { clearAuthInfo, getFamilyMemberType } = useSessionStore.getState();
      clearAuthInfo();

      expect(getFamilyMemberType()).toBeNull();
    });
  });

  describe('永続化', () => {
    test('認証情報がlocalStorageに保存されること', () => {
      const testJwt = 'test-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      // localStorageに保存されているかチェック
      const storedData = localStorage.getItem('session-storage');
      expect(storedData).toBeDefined();
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        expect(parsedData.state.authInfo).toBeDefined();
        expect(parsedData.state.authInfo.jwt).toBe('test-jwt-token');
      }
    });

    test('認証情報をクリアするとlocalStorageも更新されること', () => {
      // まず認証情報を設定
      const testJwt = 'test-jwt-token';
      const mockFamilyMemberType = createMockFamilyMemberTypeValue(1);

      const { updateJwt, updateFamilyMemberType, clearAuthInfo } = useSessionStore.getState();
      updateJwt(testJwt);
      updateFamilyMemberType(mockFamilyMemberType);

      // 認証情報をクリア
      clearAuthInfo();

      // localStorageが更新されているかチェック
      const storedData = localStorage.getItem('session-storage');
      expect(storedData).toBeDefined();
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        expect(parsedData.state.authInfo).toBeNull();
      }
    });
  });
});
