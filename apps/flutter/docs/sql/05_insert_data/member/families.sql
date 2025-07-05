-- 家族テーブルのテストデータ
INSERT INTO families (user_id, icon_id) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 10), -- 佐藤家（家族アイコン）
('550e8400-e29b-41d4-a716-446655440002'::uuid, 8),  -- 田中家（女性アイコン）
('550e8400-e29b-41d4-a716-446655440003'::uuid, 7),  -- スミス家（男性アイコン）
('550e8400-e29b-41d4-a716-446655440004'::uuid, 9);  -- 鈴木家（女性アイコン）

-- 家族翻訳テーブルのテストデータ
INSERT INTO families_translation (family_id, language_code, name, bio) VALUES
-- 佐藤家
(1, 1, '佐藤家', '東京在住の4人家族です。子供たちの成長を楽しく見守っています。'),
(1, 2, 'Sato Family', 'A family of four living in Tokyo. We enjoy watching our children grow.'),
-- 田中家
(2, 1, '田中家', '大阪在住の3人家族です。お料理と読書が好きです。'),
(2, 2, 'Tanaka Family', 'A family of three living in Osaka. We love cooking and reading.'),
-- スミス家
(3, 1, 'スミス家', 'アメリカ出身の国際家族です。日本文化を学んでいます。'),
(3, 2, 'Smith Family', 'An international family from America. Learning about Japanese culture.'),
-- 鈴木家
(4, 1, '鈴木家', '札幌在住の3人家族です。アウトドア活動が大好きです。'),
(4, 2, 'Suzuki Family', 'A family of three living in Sapporo. We love outdoor activities.');

-- 家族設定テーブルのテストデータ
INSERT INTO families_settings (family_id, currency_id) VALUES
(1, 1), -- 佐藤家：日本円（JPY）
(2, 1), -- 田中家：日本円（JPY）
(3, 2), -- スミス家：米ドル（USD）
(4, 1); -- 鈴木家：日本円（JPY）
