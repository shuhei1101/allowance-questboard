// JwtStorage.ts
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export type SaveToken = (token: string) => Promise<void>;
export type GetToken = () => Promise<string | null>;
export type DeleteToken = () => Promise<void>;

// 共通インターフェース
export interface IJwtStorage {
  saveToken: SaveToken;
  getToken: GetToken;
  deleteToken: DeleteToken;
}

// モバイル実装 (expo-secure-store)
class MobileJwtStorage implements IJwtStorage {
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync("jwt", token);
  }

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync("jwt");
  }

  async deleteToken(): Promise<void> {
    await SecureStore.deleteItemAsync("jwt");
  }
}

// PC実装 (localStorage)
class PcJwtStorage implements IJwtStorage {
  async saveToken(token: string): Promise<void> {
    localStorage.setItem("jwt", token);
  }

  async getToken(): Promise<string | null> {
    return localStorage.getItem("jwt");
  }

  async deleteToken(): Promise<void> {
    localStorage.removeItem("jwt");
  }
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
