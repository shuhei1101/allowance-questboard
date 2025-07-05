-- クエスト詳細（レベル別）テーブルのテストデータ
INSERT INTO quest_details_by_level (quest_id, level, success_criteria, target_count, reward, currency_id, child_exp, quest_exp) VALUES
-- お皿洗い（クエストID: 1）
(1, 1, '食器を洗って乾燥させる', 1, 50, 1, 10, 5),
(1, 2, '食器を洗って食器棚に片付ける', 1, 75, 1, 15, 8),
(1, 3, '食器とコップとお箸をすべて洗って片付ける', 1, 100, 1, 20, 10),
-- 洗濯たたみ（クエストID: 2）
(2, 1, '自分の服をたたむ', 5, 30, 1, 8, 3),
(2, 2, '家族の服もたたむ', 10, 60, 1, 15, 6),
(2, 3, 'すべての洗濯物をたたんで収納する', 15, 100, 1, 25, 10),
-- 宿題をする（クエストID: 3）
(3, 1, '算数の宿題を終わらせる', 1, 100, 1, 20, 10),
(3, 2, '算数と国語の宿題を終わらせる', 1, 150, 1, 30, 15),
(3, 3, 'すべての宿題を時間内に終わらせる', 1, 200, 1, 40, 20),
-- ランニング（クエストID: 4）
(4, 1, '15分間走る', 1, 80, 1, 15, 8),
(4, 2, '30分間走る', 1, 120, 1, 25, 12),
(4, 3, '45分間走る', 1, 180, 1, 35, 18),
-- 部屋の片付け（クエストID: 5）
(5, 1, '机の上を片付ける', 1, 60, 1, 12, 6),
(5, 2, '床に散らかったものを片付ける', 1, 90, 1, 18, 9),
(5, 3, '部屋全体をきれいに片付ける', 1, 150, 1, 30, 15);

-- クエスト詳細翻訳テーブルのテストデータ
INSERT INTO quest_details_by_level_translation (quest_details_by_level_id, language_code, success_criteria) VALUES
-- お皿洗い
(1, 2, 'Wash dishes and let them dry'),
(2, 2, 'Wash dishes and put them in the cupboard'),
(3, 2, 'Wash all dishes, cups, and chopsticks and put them away'),
-- 洗濯たたみ
(4, 2, 'Fold your own clothes'),
(5, 2, 'Fold family clothes too'),
(6, 2, 'Fold all laundry and store it'),
-- 宿題をする
(7, 2, 'Finish math homework'),
(8, 2, 'Finish math and Japanese homework'),
(9, 2, 'Finish all homework within time limit'),
-- ランニング
(10, 2, 'Run for 15 minutes'),
(11, 2, 'Run for 30 minutes'),
(12, 2, 'Run for 45 minutes'),
-- 部屋の片付け
(13, 2, 'Clean up your desk'),
(14, 2, 'Pick up things scattered on the floor'),
(15, 2, 'Clean up the entire room neatly');
