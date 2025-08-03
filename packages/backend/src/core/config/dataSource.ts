import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres", // ← DBの種類に合わせて変えてね
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "testdb",
  synchronize: false, // ← 開発中だけtrueにする（本番はダメ🙅‍♀️）
  logging: true,
  entities: [__dirname + "/../../feature/**/entity/*.ts"],
});
