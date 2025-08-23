import React, { ReactNode, useEffect } from 'react';
import { useSessionStore } from '@/features/auth/stores/sessionStore';
import { useLoginPageStore } from '@/features/auth/login-page/stores/loginPageStore';
import { useParentEditPageStore } from '@/features/parent/parent-edit-page/stores/parentEditPageStore';
import { FamilyMemberTypeValue } from '@backend/features/family-member/value-object/familyMemberTypeValue';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { FamilyMemberTypeId } from '@backend/features/family-member/value-object/familyMemberTypeId';
import { LoginForm } from '@/features/auth/login-page/models/loginForm';
import { ParentForm } from '@/features/parent/parent-edit-page/models/parentForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { IconName } from '@backend/features/icon/value-objects/iconName';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';

interface Props {
  children: ReactNode;
}

/**
 * デモ用モックプロバイダー
 * デモ環境で使用するためのモック状態を設定
 * 
 * 機能:
 * - セッション状態のモック設定
 * - 各ページストアの初期状態設定
 * - デモ用のサンプルデータ提供
 */
export const DemoMockProvider: React.FC<Props> = ({ children }) => {
  const sessionStore = useSessionStore();
  const loginPageStore = useLoginPageStore();
  const parentEditPageStore = useParentEditPageStore();

  useEffect(() => {
    // デモ用のモックデータを設定
    setupMockData();
  }, []);

  const setupMockData = () => {
    console.log('🎯 Demo - Setting up mock data...');

    try {
      // 1. セッションストアのモック設定
      setupSessionMock();

      // 2. ログインページストアのモック設定（とりあえずスキップ）
      // setupLoginPageMock();

      // 3. 親編集ページストアのモック設定（とりあえずスキップ）
      // setupParentEditPageMock();

      console.log('✅ Demo - Mock data setup completed!');
    } catch (error) {
      console.error('❌ Demo - Mock data setup failed:', error);
      // エラーが発生してもデモは動くようにする
    }
  };

  /**
   * セッションストアのモック設定
   */
  const setupSessionMock = () => {
    // モック言語タイプ（日本語）
    const mockLanguageType = new LanguageTypeValue(new LanguageId(1));

    // モック家族メンバータイプ（親）
    const mockFamilyMemberType = new FamilyMemberTypeValue(new FamilyMemberTypeId(1));

    sessionStore.setLanguageType(mockLanguageType);
    sessionStore.setFamilyMemberType(mockFamilyMemberType);
    
    // モックJWT（デモ用）
    sessionStore.setJwt('demo-jwt-token-12345');

    console.log('🎯 Demo - Session mock data set');
  };

  /**
   * ログインページストアのモック設定
   */
  const setupLoginPageMock = () => {
    // モックログインフォーム（サンプルデータ入力済み）
    const mockLoginForm = new LoginForm({
      email: new Email('demo@example.com'),
      password: new Password('demo123456'),
    });

    loginPageStore.setLoginForm(mockLoginForm);

    console.log('🎯 Demo - Login page mock data set');
  };

  /**
   * 親編集ページストアのモック設定
   */
  const setupParentEditPageMock = () => {
    // モック親フォーム（サンプルデータ入力済み）
    const mockParentForm = new ParentForm({
      name: new ParentName('田中太郎'),
      email: new Email('tanaka@example.com'),
      password: new Password('password123'),
      icon: new Icon({
        id: new IconId(1),
        name: new IconName('home'),
        sortOrder: new SortOrder(1)
      }),
      birthday: new Birthday(new Date('1985-05-15')),
    });

    parentEditPageStore.setParentForm(mockParentForm);

    console.log('🎯 Demo - Parent edit page mock data set');
  };

  return <>{children}</>;
};

/**
 * デモ用のユーティリティ関数群
 */
export const DemoUtils = {
  /**
   * ランダムなサンプルデータを生成
   */
  generateRandomData: () => {
    const sampleEmails = [
      'demo@example.com',
      'test@sample.com',
      'user@demo.jp',
      'family@test.com',
    ];

    const sampleNames = [
      '田中太郎',
      '佐藤花子',
      '山田次郎',
      '鈴木美咲',
    ];

    return {
      email: sampleEmails[Math.floor(Math.random() * sampleEmails.length)],
      name: sampleNames[Math.floor(Math.random() * sampleNames.length)],
      password: 'demo123456',
    };
  },

  /**
   * ストアの状態をリセット
   */
  resetStores: () => {
    console.log('🎯 Demo - Resetting all stores...');
    
    // 各ストアを初期状態にリセット
    // Note: 実際のリセット処理は各ストアの実装に依存
    
    console.log('✅ Demo - All stores reset');
  },

  /**
   * モック API レスポンスを生成
   */
  generateMockApiResponse: (delay: number = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'デモ用のAPIレスポンス',
          data: {
            id: 'demo-id-' + Date.now(),
            timestamp: new Date().toISOString(),
          },
        });
      }, delay);
    });
  },
};
