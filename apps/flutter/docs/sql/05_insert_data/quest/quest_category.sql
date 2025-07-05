-- クエストカテゴリ（基底クラス）のテストデータ
INSERT INTO quest_categories (subclass_type, subclass_id) VALUES
-- テンプレートクエストカテゴリ (subclass_type: 1 = template_quest_categories)
(1, 1), -- 家事手伝い
(1, 2), -- 勉強・学習
(1, 3), -- 運動・スポーツ
(1, 4), -- 片付け・整理
(1, 5), -- お手伝い全般
-- カスタムクエストカテゴリ（佐藤家作成） (subclass_type: 3 = custom_quest_categories)
(3, 1), -- 佐藤家のオリジナルカテゴリ
-- 家族クエストカテゴリ (subclass_type: 2 = family_quest_categories)
(2, 1), -- 佐藤家用
(2, 2), -- 田中家用
(2, 3), -- スミス家用
(2, 4); -- 鈴木家用

-- テンプレートクエストカテゴリテーブルのテストデータ
INSERT INTO template_quest_categories (category_id, code, sort_order, is_active) VALUES
(1, 'housework', 1, true),
(2, 'study', 2, true),
(3, 'exercise', 3, true),
(4, 'cleanup', 4, true),
(5, 'help_general', 5, true);

-- カスタムクエストカテゴリテーブルのテストデータ
INSERT INTO custom_quest_categories (category_id, family_id) VALUES
(6, 1); -- 佐藤家のカスタムカテゴリ

-- 家族クエストカテゴリテーブルのテストデータ
INSERT INTO family_quest_categories (category_id, family_id) VALUES
(7, 1), -- 佐藤家
(8, 2), -- 田中家
(9, 3), -- スミス家
(10, 4); -- 鈴木家

-- クエストカテゴリ翻訳テーブルのテストデータ
INSERT INTO quest_categories_translation (quest_category_id, language_code, name) VALUES
-- 家事手伝い
(1, 1, '家事手伝い'),
(1, 2, 'Household Chores'),
-- 勉強・学習
(2, 1, '勉強・学習'),
(2, 2, 'Study & Learning'),
-- 運動・スポーツ
(3, 1, '運動・スポーツ'),
(3, 2, 'Exercise & Sports'),
-- 片付け・整理
(4, 1, '片付け・整理'),
(4, 2, 'Cleaning & Organization'),
-- お手伝い全般
(5, 1, 'お手伝い全般'),
(5, 2, 'General Help'),
-- 佐藤家のカスタム
(6, 1, '特別なお手伝い'),
(6, 2, 'Special Help'),
-- 各家族専用カテゴリ
(7, 1, '佐藤家専用'),
(7, 2, 'Sato Family Special'),
(8, 1, '田中家専用'),
(8, 2, 'Tanaka Family Special'),
(9, 1, 'スミス家専用'),
(9, 2, 'Smith Family Special'),
(10, 1, '鈴木家専用'),
(10, 2, 'Suzuki Family Special');
