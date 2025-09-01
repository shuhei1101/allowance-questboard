// JwtStorage.ts
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export type SetJwtToken = (token: string) => Promise<void>;
export type GetJwtToken = () => Promise<string | undefined>;
export type DeleteJwtToken = () => Promise<void>;

// 共通インターフェース
export interface IJwtStorage {
  setToken: SetJwtToken;
  getToken: GetJwtToken;
  deleteToken: DeleteJwtToken;
}

// モバイル実装 (expo-secure-store)
class MobileJwtStorage implements IJwtStorage {
  setToken: SetJwtToken = async (token: string) => {
    await SecureStore.setItemAsync("jwt", token);
  };
  getToken: GetJwtToken = async () => {
    return await SecureStore.getItemAsync("jwt") ?? undefined;
  };
  deleteToken: DeleteJwtToken = async () => {
    await SecureStore.deleteItemAsync("jwt");
  };
}

// PC実装 (localStorage)
class PcJwtStorage implements IJwtStorage {
  getToken: GetJwtToken = async () => {
    return localStorage.getItem("jwt") ?? undefined;
  };
  deleteToken: DeleteJwtToken = async () => {
    localStorage.removeItem("jwt");
  };
  setToken: SetJwtToken = async (token: string) => {
    localStorage.setItem("jwt", token);
  };
}

const mobileJwtStorage = new MobileJwtStorage();
const pcJwtStorage = new PcJwtStorage();

export function createJwtStorage(): IJwtStorage {
  if (Platform.OS === "web") {
    return pcJwtStorage;
  } else {
    return mobileJwtStorage;
  }
}

export const JwtStorage = createJwtStorage();
