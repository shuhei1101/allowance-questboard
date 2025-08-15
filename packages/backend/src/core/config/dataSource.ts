import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// .envファイルを読み込み
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // ← Supabaseの接続URLを使用
  synchronize: false, // ← 開発中だけtrueにする（本番はダメ🙅‍♀️）
  logging: true,
  entities: [__dirname + "/../../features/**/entity/*.ts"],
  ssl: {
    rejectUnauthorized: false, // ← Supabaseで必要
  },
});
