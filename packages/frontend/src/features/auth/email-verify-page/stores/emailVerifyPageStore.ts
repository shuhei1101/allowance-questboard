import { create } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';
import { Email } from '../../../../../../backend/src/features/auth/value-object/email';

/** 認証ステータス列挙型 */
export enum VerificationStatus {
  /** メール認証待ち（初期状態） */
  WAITING = 'WAITING',
  /** 認証状態確認中（AppState復帰時など） */
  CHECKING = 'CHECKING', 
  /** 認証完了（自動ログイン開始） */
  VERIFIED = 'VERIFIED',
  /** 認証失敗（エラー状態） */
  FAILED = 'FAILED'
}

// シグネチャ定義
export type SetEmail = (email: Email) => void;
export type SetCheckingAuth = (isChecking: boolean) => void;
export type SetResending = (isResending: boolean) => void;
export type SetAutoLoginInProgress = (inProgress: boolean) => void;
export type SetVerificationStatus = (status: VerificationStatus) => void;
export type SetResendCooldown = (seconds: number) => void;
export type IncrementResendCount = () => void;
export type UpdateLastResendTime = () => void;
export type ResetResendState = () => void;
export type ToggleHelpSection = () => void;
export type SetError = (message: string) => void;
export type ClearError = () => void;
export type ResetPage = () => void;

interface EmailVerifyPageProperties extends BasePageProperties {
  /** 登録時のメールアドレス */
  email: Email;
  /** 認証状態チェック中 */
  isCheckingAuth: boolean;
  /** メール再送中 */
  isResending: boolean;
  /** 自動ログイン処理中 */
  isAutoLoginInProgress: boolean;
  /** 認証状態（VerificationStatus型） */
  verificationStatus: VerificationStatus;
  /** 再送までの残り秒数 */
  resendCooldown: number;
  /** 本日の再送回数 */
  resendCount: number;
  /** 1日の最大再送回数 */
  maxResendCount: number;
  /** 最後の再送時刻 */
  lastResendTime?: Date;
  /** ヘルプセクションの展開状態 */
  isHelpSectionExpanded: boolean;
  /** エラーメッセージ */
  errorMessage: string;
}

interface EmailVerifyPageActions extends BasePageActions {
  /** メールアドレス設定 */
  setEmail: SetEmail;
  /** 認証チェック状態設定 */
  setCheckingAuth: SetCheckingAuth;
  /** 認証状態設定 */
  setVerificationStatus: SetVerificationStatus;
  /** 自動ログイン状態設定 */
  setAutoLoginInProgress: SetAutoLoginInProgress;
  /** 再送状態設定 */
  setResending: SetResending;
  /** 再送クールダウン設定 */
  setResendCooldown: SetResendCooldown;
  /** 再送回数増加 */
  incrementResendCount: IncrementResendCount;
  /** 最後の再送時刻更新 */
  updateLastResendTime: UpdateLastResendTime;
  /** 再送状態リセット */
  resetResendState: ResetResendState;
  /** ヘルプセクション開閉 */
  toggleHelpSection: ToggleHelpSection;
  /** エラー設定 */
  setError: SetError;
  /** エラークリア */
  clearError: ClearError;
}

class EmailVerifyPageStoreClass extends BasePageStore<EmailVerifyPageProperties, EmailVerifyPageActions> {
  
  /** メールアドレス設定 */
  protected setEmail(set: any): SetEmail {
    return (email: Email) => set({ email }, false, 'setEmail');
  }

  /** 認証チェック状態設定 */
  protected setCheckingAuth(set: any): SetCheckingAuth {
    return (isChecking: boolean) => set({ isCheckingAuth: isChecking }, false, 'setCheckingAuth');
  }

  /** 認証状態設定 */
  protected setVerificationStatus(set: any): SetVerificationStatus {
    return (status: VerificationStatus) => set({ verificationStatus: status }, false, 'setVerificationStatus');
  }

  /** 自動ログイン状態設定 */
  protected setAutoLoginInProgress(set: any): SetAutoLoginInProgress {
    return (inProgress: boolean) => set({ isAutoLoginInProgress: inProgress }, false, 'setAutoLoginInProgress');
  }

  /** 再送状態設定 */
  protected setResending(set: any): SetResending {
    return (isResending: boolean) => set({ isResending }, false, 'setResending');
  }

  /** 再送クールダウン設定 */
  protected setResendCooldown(set: any): SetResendCooldown {
    return (seconds: number) => set({ resendCooldown: seconds }, false, 'setResendCooldown');
  }

  /** 再送回数増加 */
  protected incrementResendCount(set: any): IncrementResendCount {
    return () => set((state: EmailVerifyPageProperties) => ({ 
      resendCount: state.resendCount + 1 
    }), false, 'incrementResendCount');
  }

  /** 最後の再送時刻更新 */
  protected updateLastResendTime(set: any): UpdateLastResendTime {
    return () => set({ lastResendTime: new Date() }, false, 'updateLastResendTime');
  }

  /** 再送状態リセット */
  protected resetResendState(set: any): ResetResendState {
    return () => set({ 
      resendCooldown: 0,
      isResending: false,
    }, false, 'resetResendState');
  }

  /** ヘルプセクション開閉 */
  protected toggleHelpSection(set: any): ToggleHelpSection {
    return () => set((state: EmailVerifyPageProperties) => ({ 
      isHelpSectionExpanded: !state.isHelpSectionExpanded 
    }), false, 'toggleHelpSection');
  }

  /** エラー設定 */
  protected setError(set: any): SetError {
    return (message: string) => set({ 
      errorMessage: message,
      verificationStatus: VerificationStatus.FAILED 
    }, false, 'setError');
  }

  /** エラークリア */
  protected clearError(set: any): ClearError {
    return () => set({ errorMessage: '' }, false, 'clearError');
  }

  protected buildDefaultProperties(): EmailVerifyPageProperties {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 今日の開始時刻

    return {
      ...super.buildDefaultProperties(),
      email: new Email(''), // 空のEmailオブジェクトで初期化
      isCheckingAuth: false,
      isResending: false,
      isAutoLoginInProgress: false,
      verificationStatus: VerificationStatus.WAITING,
      resendCooldown: 0,
      resendCount: 0,
      maxResendCount: 5,
      lastResendTime: undefined,
      isHelpSectionExpanded: false,
      errorMessage: '',
    };
  }

  protected buildActions(set: any): EmailVerifyPageActions {
    return {
      ...super.buildActions(set),
      setEmail: this.setEmail(set),
      setCheckingAuth: this.setCheckingAuth(set),
      setVerificationStatus: this.setVerificationStatus(set),
      setAutoLoginInProgress: this.setAutoLoginInProgress(set),
      setResending: this.setResending(set),
      setResendCooldown: this.setResendCooldown(set),
      incrementResendCount: this.incrementResendCount(set),
      updateLastResendTime: this.updateLastResendTime(set),
      resetResendState: this.resetResendState(set),
      toggleHelpSection: this.toggleHelpSection(set),
      setError: this.setError(set),
      clearError: this.clearError(set),
    };
  }
}

const emailVerifyPageStore = new EmailVerifyPageStoreClass();
export type EmailVerifyPageStore = EmailVerifyPageProperties & EmailVerifyPageActions;

/** メール認証ページ状態管理ストア */
export const useEmailVerifyPageStore = create<EmailVerifyPageStore>()(
    (set) => emailVerifyPageStore.createStore(set)
);
