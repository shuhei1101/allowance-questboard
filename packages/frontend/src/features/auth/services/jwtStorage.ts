// JwtStorage.ts
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export type SetToken = (token: string) => Promise<void>;
export type GetToken = () => Promise<string | undefined>;
export type DeleteToken = () => Promise<void>;

// 共通インターフェース
export interface IJwtStorage {
  setToken: SetToken;
  getToken: GetToken;
  deleteToken: DeleteToken;
}

// モバイル実装 (expo-secure-store)
class MobileJwtStorage implements IJwtStorage {
  setToken: SetToken = async (token: string) => {
    await SecureStore.setItemAsync("jwt", token);
  };
  getToken: GetToken = async () => {
    return await SecureStore.getItemAsync("jwt") ?? undefined;
  };
  deleteToken: DeleteToken = async () => {
    await SecureStore.deleteItemAsync("jwt");
  };
}

// PC実装 (localStorage)
class PcJwtStorage implements IJwtStorage {
  getToken: GetToken = async () => {
    return localStorage.getItem("jwt") ?? undefined;
  };
  deleteToken: DeleteToken = async () => {
    localStorage.removeItem("jwt");
  };
  setToken: SetToken = async (token: string) => {
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
