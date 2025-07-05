-- クエスト（基底クラス）のテストデータ
INSERT INTO quests (subclass_type, subclass_id, category_id, icon_id, age_from, age_to, has_published_month, month_from, month_to) VALUES
-- テンプレートクエスト (subclass_type: 1 = template)
(1, 1, 1, 11, 5, 15, false, NULL, NULL), -- お皿洗い
(1, 2, 1, 12, 3, 12, false, NULL, NULL), -- 洗濯たたみ
(1, 3, 2, 13, 6, 18, false, NULL, NULL), -- 宿題をする
(1, 4, 3, 11, 5, 18, false, NULL, NULL), -- ランニング
(1, 5, 4, 14, 4, 15, false, NULL, NULL), -- 部屋の片付け
(1, 6, 1, 15, 8, 18, true, 12, 2),       -- 年末大掃除（季節限定）
-- 家族クエスト（佐藤家） (subclass_type: 2 = family)
(2, 1, 7, 16, 5, 15, false, NULL, NULL),   -- 佐藤家専用クエスト1
(2, 2, 7, 17, 3, 12, false, NULL, NULL);   -- 佐藤家専用クエスト2

-- テンプレートクエストテーブルのテストデータ
INSERT INTO template_quests (quest_id) VALUES
(1), (2), (3), (4), (5), (6);

-- クエスト翻訳テーブルのテストデータ
INSERT INTO quests_translation (quest_id, language_code, title, client, request_detail) VALUES
-- お皿洗い
(17, 1, 'お皿洗いをしよう', 'お母さん', '食事後のお皿やコップを洗って片付けてください。'),
(17, 2, 'Wash the Dishes', 'Mom', 'Please wash and put away dishes and cups after meals.'),
-- 洗濯たたみ
(18, 1, '洗濯物をたたもう', 'お母さん', '乾いた洗濯物をきれいにたたんで片付けてください。'),
(18, 2, 'Fold the Laundry', 'Mom', 'Please fold the dried laundry neatly and put it away.'),
-- 宿題をする
(19, 1, '今日の宿題をしよう', '先生', '学校から出された宿題を最後まで終わらせてください。'),
(19, 2, 'Do Your Homework', 'Teacher', 'Please complete all homework assigned by school.'),
-- ランニング
(20, 1, '外でランニングしよう', 'お父さん', '30分間外を走って体力をつけましょう。'),
(20, 2, 'Go for a Run Outside', 'Dad', 'Run outside for 30 minutes to build your stamina.'),
-- 部屋の片付け
(21, 1, '自分の部屋を片付けよう', 'お母さん', '散らかった部屋をきれいに整理整頓してください。'),
(21, 2, 'Clean Your Room', 'Mom', 'Please organize and tidy up your messy room.'),
-- 年末大掃除
(22, 1, '年末大掃除をお手伝い', 'お母さん', '年末の大掃除を家族みんなでがんばりましょう。'),
(22, 2, 'Help with Year-end Cleaning', 'Mom', 'Lets all work together on the year-end house cleaning.'),
-- 佐藤家専用クエスト
(23, 1, '花壇の水やり', 'お母さん', '玄関の花壇にお水をあげてください。'),
(23, 2, 'Water the Flower Bed', 'Mom', 'Please water the flower bed at the entrance.'),
(24, 1, 'ペットのお世話', 'お父さん', 'ハムスターのケージを掃除してください。'),
(24, 2, 'Take Care of the Pet', 'Dad', 'Please clean the hamster cage.');

-- メンバークエストステータステーブルのテストデータ
INSERT INTO child_quest_status (code) VALUES
('assigned'),     -- 公開済み
('in_progress'),  -- 進行中
('completed'),    -- 完了
('cancelled'),    -- キャンセル
('on_hold');      -- 保留中

-- メンバークエストステータス翻訳テーブルのテストデータ
INSERT INTO child_quest_statuses_translation (child_quest_status_id, language_code, name) VALUES
-- 公開済み
(6, 1, '公開済み'),
(6, 2, 'Assigned'),
-- 進行中
(7, 1, '進行中'),
(7, 2, 'In Progress'),
-- 完了
(8, 1, '完了'),
(8, 2, 'Completed'),
-- キャンセル
(9, 1, 'キャンセル'),
(9, 2, 'Cancelled'),
-- 保留中
(10, 1, '保留中'),
(10, 2, 'On Hold');

-- 家族クエストテーブルのテストデータ
INSERT INTO family_quests (family_id, quest_id, is_shared, shared_quest_id) VALUES
-- 佐藤家のクエスト
(1, 17, false, NULL), -- お皿洗い（共有なし）
(1, 18, false, NULL), -- 洗濯たたみ（共有なし）
(1, 19, false, NULL), -- 宿題をする（共有なし）
(1, 20, false, NULL), -- 佐藤家専用クエスト1（共有なし）
(1, 21, false, NULL), -- 佐藤家専用クエスト2（共有なし）
-- 田中家のクエスト
(2, 22, false, NULL), -- お皿洗い（共有なし）
(2, 23, false, NULL), -- 宿題をする（共有なし）
(2, 24, false, NULL), -- ランニング（共有なし）
-- スミス家のクエスト
(3, 17, false, NULL), -- 洗濯たたみ（共有なし）
(3, 18, false, NULL), -- 宿題をする（共有なし）
(3, 19, false, NULL), -- ランニング（共有なし）
(3, 20, false, NULL), -- 部屋の片付け（共有なし）
-- 鈴木家のクエスト
(4, 21, false, NULL), -- 宿題をする（共有なし）
(4, 22, false, NULL), -- ランニング（共有なし）
(4, 23, false, NULL); -- 部屋の片付け（共有なし）

-- 共有クエストテーブルのテストデータ
INSERT INTO shared_quests (family_id, quest_id, pinned_comment_id, is_public) VALUES
(1, 16, NULL, true),  -- 佐藤家がお皿洗いを公開共有
(2, 17, NULL, true),  -- 田中家が宿題を公開共有
(3, 18, NULL, false), -- スミス家がランニングを非公開共有
(4, 19, NULL, true);  -- 鈴木家が部屋の片付けを公開共有

-- 保存クエストテーブルのテストデータ
INSERT INTO saved_quests (quest_id, family_id, shared_quest_id, saved_at) VALUES
-- 佐藤家が保存したクエスト
(3, 1, 2, '2025-06-15 10:00:00+09'), -- 田中家の宿題クエストを保存
(4, 1, 3, '2025-06-16 14:00:00+09'), -- スミス家のランニングクエストを保存
-- 田中家が保存したクエスト
(1, 2, 1, '2025-06-17 09:00:00+09'), -- 佐藤家のお皿洗いクエストを保存
(5, 2, 4, '2025-06-18 16:00:00+09'), -- 鈴木家の部屋の片付けクエストを保存
-- スミス家が保存したクエスト
(1, 3, 1, '2025-06-19 11:00:00+09'), -- 佐藤家のお皿洗いクエストを保存
(3, 3, 2, '2025-06-20 13:00:00+09'), -- 田中家の宿題クエストを保存
-- 鈴木家が保存したクエスト
(4, 4, 3, '2025-06-15 15:00:00+09'); -- スミス家のランニングクエストを保存

-- メンバークエストテーブルのテストデータ
INSERT INTO child_quests (quest_id, child_id, current_level, status, published_at, achieved_at) VALUES
-- 佐藤太郎のクエスト (child_id: 1)
(1, 1, 2, 3, '2025-06-10 08:00:00+09', '2025-06-15 18:00:00+09'), -- お皿洗い（完了）
(2, 1, 1, 2, '2025-06-12 09:00:00+09', NULL), -- 洗濯たたみ（進行中）
(7, 1, 1, 1, '2025-06-18 10:00:00+09', NULL), -- 花壇の水やり（公開済み）
-- 佐藤花子のクエスト (child_id: 2)
(2, 2, 1, 2, '2025-06-14 09:00:00+09', NULL), -- 洗濯たたみ（進行中）
(8, 2, 1, 1, '2025-06-19 11:00:00+09', NULL), -- ペットのお世話（公開済み）
-- 田中次郎のクエスト (child_id: 3)
(3, 3, 3, 3, '2025-06-11 07:00:00+09', '2025-06-17 19:00:00+09'), -- 宿題をする（完了）
(4, 3, 2, 2, '2025-06-13 06:00:00+09', NULL), -- ランニング（進行中）
(1, 3, 1, 1, '2025-06-20 08:00:00+09', NULL), -- お皿洗い（公開済み）
-- Emily Smithのクエスト (child_id: 4)
(3, 4, 1, 2, '2025-06-12 08:00:00+09', NULL), -- 宿題をする（進行中）
(4, 4, 1, 1, '2025-06-16 07:00:00+09', NULL), -- ランニング（公開済み）
(5, 4, 2, 3, '2025-06-10 09:00:00+09', '2025-06-18 16:00:00+09'), -- 部屋の片付け（完了）
-- 鈴木三郎のクエスト (child_id: 5)
(3, 5, 4, 3, '2025-06-09 07:00:00+09', '2025-06-19 20:00:00+09'), -- 宿題をする（完了）
(4, 5, 3, 2, '2025-06-11 06:00:00+09', NULL), -- ランニング（進行中）
(5, 5, 1, 1, '2025-06-17 10:00:00+09', NULL); -- 部屋の片付け（公開済み）

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
(5, 3, '部屋全体をきれいに片付ける', 1, 150, 1, 30, 15),
-- 年末大掃除（クエストID: 6）
(6, 1, '掃除道具を準備する', 1, 100, 1, 20, 10),
(6, 2, '窓拭きも手伝う', 1, 150, 1, 30, 15),
(6, 3, '家全体の大掃除を完了する', 1, 250, 1, 50, 25),
-- 佐藤家専用クエスト1（花壇の水やり）（クエストID: 7）
(7, 1, '花壇に水をあげる', 1, 40, 1, 8, 4),
(7, 2, '花壇の水やりと枯れ葉取り', 1, 60, 1, 12, 6),
(7, 3, '花壇の手入れ全般', 1, 100, 1, 20, 10),
-- 佐藤家専用クエスト2（ペットのお世話）（クエストID: 8）
(8, 1, 'ハムスターのケージを掃除する', 1, 70, 1, 14, 7),
(8, 2, 'ハムスターの餌やりと掃除', 1, 100, 1, 20, 10),
(8, 3, 'ハムスターの完全なお世話', 1, 150, 1, 30, 15);

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
(15, 2, 'Clean up the entire room neatly'),
-- 年末大掃除
(16, 2, 'Prepare cleaning tools'),
(17, 2, 'Help with window cleaning too'),
(18, 2, 'Complete whole house cleaning'),
-- 花壇の水やり
(19, 2, 'Water the flower bed'),
(20, 2, 'Water and remove dead leaves'),
(21, 2, 'General flower bed maintenance'),
-- ペットのお世話
(22, 2, 'Clean hamster cage'),
(23, 2, 'Feed and clean hamster'),
(24, 2, 'Complete hamster care');

-- クエストリクエストステータステーブルのテストデータ
INSERT INTO quest_request_statuses (code) VALUES
('pending'),
('approved'),
('rejected'),
('cancelled');

-- クエストリクエストステータス翻訳テーブルのテストデータ
INSERT INTO quest_request_status_translation (quest_request_status_id, language_code, name) VALUES
-- 申請中
(1, 1, '申請中'),
(1, 2, 'Pending'),
-- 承認済み
(2, 1, '承認済み'),
(2, 2, 'Approved'),
-- 拒否
(3, 1, '拒否'),
(3, 2, 'Rejected'),
-- キャンセル
(4, 1, 'キャンセル'),
(4, 2, 'Cancelled');

-- クエスト経験値（レベル別）テーブルのテストデータ
INSERT INTO quest_exp_by_level (quest_id, level, exp) VALUES
-- お皿洗い（クエストID: 1）
(1, 1, 0),
(1, 2, 50),
(1, 3, 150),
-- 洗濯たたみ（クエストID: 2）
(2, 1, 0),
(2, 2, 30),
(2, 3, 100),
-- 宿題をする（クエストID: 3）
(3, 1, 0),
(3, 2, 100),
(3, 3, 300),
-- ランニング（クエストID: 4）
(4, 1, 0),
(4, 2, 80),
(4, 3, 200),
-- 部屋の片付け（クエストID: 5）
(5, 1, 0),
(5, 2, 60),
(5, 3, 180),
-- 年末大掃除（クエストID: 6）
(6, 1, 0),
(6, 2, 200),
(6, 3, 500),
-- 佐藤家専用クエスト1（クエストID: 7）
(7, 1, 0),
(7, 2, 40),
(7, 3, 120),
-- 佐藤家専用クエスト2（クエストID: 8）
(8, 1, 0),
(8, 2, 70),
(8, 3, 200);

-- クエストリクエストテーブルのテストデータ
INSERT INTO quest_requests (family_id, child_id, quest_id, title, description, is_new_request, status_id, answer, answered_at) VALUES
-- 新規クエストリクエスト（承認済み）
(1, 1, NULL, 'ゲームを1時間だけする', '宿題を終わらせたあとに、1時間だけゲームをしたいです。', true, 2, '宿題が完了したことを確認できたので承認します。', '2025-06-10 19:00:00+09'),
-- 既存クエストリクエスト（申請中）
(1, 2, 3, '宿題クエストを追加してほしい', '毎日の宿題クエストを私にも追加してください。', false, 1, NULL, NULL),
-- 新規クエストリクエスト（拒否）
(2, 3, NULL, '夜更かしをしたい', '今日だけ夜12時まで起きていたいです。', true, 3, '健康のために早く寝ることが大切です。', '2025-06-12 21:00:00+09'),
-- 既存クエストリクエスト（承認済み）
(3, 4, 4, 'ランニングクエストを追加', 'ランニングクエストに挑戦したいです！', false, 2, '運動習慣は素晴らしいですね。承認します。', '2025-06-14 10:00:00+09'),
-- 新規クエストリクエスト（申請中）
(4, 5, NULL, '友達と遊ぶ時間', '宿題が終わったら友達と公園で遊びたいです。', true, 1, NULL, NULL),
-- キャンセルされたリクエスト
(2, 3, NULL, 'おやつを増やしてほしい', 'もう少しおやつを食べたいです。', true, 4, NULL, NULL);
