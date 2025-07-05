-- アイコンカテゴリテーブルのテストデータ
INSERT INTO icon_categories (code, sort_order) VALUES
('animals', 1),
('people', 2),
('objects', 3),
('nature', 4),
('symbols', 5),
('flags', 6),
('sports', 7),
('food', 8),
('vehicles', 9),
('buildings', 10);

-- アイコンカテゴリ翻訳テーブルのテストデータ
INSERT INTO icon_categories_translation (category_id, language_code, name) VALUES
-- 動物カテゴリ
(1, 1, '動物'),
(1, 2, 'Animals'),
-- 人物カテゴリ
(2, 1, '人物'),
(2, 2, 'People'),
-- 物体カテゴリ
(3, 1, '物体'),
(3, 2, 'Objects'),
-- 自然カテゴリ
(4, 1, '自然'),
(4, 2, 'Nature'),
-- シンボルカテゴリ
(5, 1, 'シンボル'),
(5, 2, 'Symbols'),
-- 国旗カテゴリ
(6, 1, '国旗'),
(6, 2, 'Flags'),
-- スポーツカテゴリ
(7, 1, 'スポーツ'),
(7, 2, 'Sports'),
-- 食べ物カテゴリ
(8, 1, '食べ物'),
(8, 2, 'Food'),
-- 乗り物カテゴリ
(9, 1, '乗り物'),
(9, 2, 'Vehicles'),
-- 建物カテゴリ
(10, 1, '建物'),
(10, 2, 'Buildings');

-- アイコンテーブルのテストデータ
INSERT INTO icons (code, category_id, sort_order) VALUES
-- 動物アイコン
('cat', 1, 1),
('dog', 1, 2),
('rabbit', 1, 3),
('bear', 1, 4),
('lion', 1, 5),

-- 人物アイコン
('boy', 2, 1),
('girl', 2, 2),
('man', 2, 3),
('woman', 2, 4),
('family', 2, 5),

-- 物体アイコン
('ball', 3, 1),
('book', 3, 2),
('pencil', 3, 3),
('toy', 3, 4),
('game', 3, 5),

-- 自然アイコン
('sun', 4, 1),
('moon', 4, 2),
('star', 4, 3),
('tree', 4, 4),
('flower', 4, 5),

-- シンボルアイコン
('heart', 5, 1),
('diamond', 5, 2),
('crown', 5, 3),
('medal', 5, 4),
('trophy', 5, 5),

-- 国旗アイコン
('flag_jp', 6, 1),
('flag_us', 6, 2),
('flag_uk', 6, 3),
('flag_kr', 6, 4),
('flag_cn', 6, 5);
