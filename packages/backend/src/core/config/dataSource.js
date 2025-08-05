"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
// .envファイルを読み込み
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL, // ← Supabaseの接続URLを使用
    synchronize: true, // ← 開発中だけtrueにする（本番はダメ🙅‍♀️）
    logging: true,
    entities: [__dirname + "/../../features/**/entity/*.ts"],
    ssl: {
        rejectUnauthorized: false, // ← Supabaseで必要
    },
});
