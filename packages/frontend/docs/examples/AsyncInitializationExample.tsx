// 使用例: ユーザープロフィール取得フック
import { useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UseUserProfileResult {
  data?: UserProfile;
  isInitializing: boolean;
  error?: Error;
}

/** ユーザープロフィール取得フック（使用例）
 * 
 * WithAsyncInitializationと組み合わせて使用する例 */
export const useUserProfile = (userId: string): UseUserProfileResult => {
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsInitializing(true);
        setError(undefined);
        
        // 実際のAPI呼び出し
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const profileData = await response.json();
        setProfile(profileData);
      } catch (err) {
        const errorInstance = err instanceof Error ? err : new Error('Profile fetch failed');
        setError(errorInstance);
      } finally {
        setIsInitializing(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return {
    data: profile,
    isInitializing,
    error,
  };
};

// 使用例: プロフィールページ
import React from 'react';
import { WithAsyncInitialization } from '@/core/components';

interface ProfilePageProps {
  userId: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const useProfileInitialization = () => useUserProfile(userId);

  return (
    <WithAsyncInitialization
      useInitialization={useProfileInitialization}
      loadingMessage="プロフィールを読み込んでいます..."
    >
      {(profile) => (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
        </div>
      )}
    </WithAsyncInitialization>
  );
};
