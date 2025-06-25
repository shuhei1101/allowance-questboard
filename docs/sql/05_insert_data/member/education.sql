-- 学歴マスタテーブルのテストデータ
INSERT INTO educations (code) VALUES
('preschool'),
('elementary'),
('junior_high'),
('high_school'),
('university'),
('graduate_school'),
('working'),
('other');

-- 学歴翻訳テーブルのテストデータ
INSERT INTO educations_translation (education_id, language_code, name) VALUES
-- 就学前
(1, 1, '就学前'),
(1, 2, 'Preschool'),
-- 小学校
(2, 1, '小学校'),
(2, 2, 'Elementary School'),
-- 中学校
(3, 1, '中学校'),
(3, 2, 'Junior High School'),
-- 高等学校
(4, 1, '高等学校'),
(4, 2, 'High School'),
-- 大学
(5, 1, '大学'),
(5, 2, 'University'),
-- 大学院
(6, 1, '大学院'),
(6, 2, 'Graduate School'),
-- 就業中
(7, 1, '就業中'),
(7, 2, 'Working'),
-- その他
(8, 1, 'その他'),
(8, 2, 'Other');
