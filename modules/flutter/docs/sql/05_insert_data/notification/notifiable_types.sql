-- 通知対象タイプテーブルのテストデータ
INSERT INTO notifiable_types (type, description) VALUES
('family', '家族に関する通知'),
('child', 'メンバーに関する通知'),
('quest', 'クエストに関する通知'),
('comment', 'コメントに関する通知'),
('withdrawal', '引き落とし申請に関する通知'),
('savings', '貯金に関する通知');

-- 通知対象タイプ翻訳テーブルのテストデータ
INSERT INTO notifiable_types_translation (notifiable_type_id, language_code, description) VALUES
-- 家族
(1, 1, '家族に関する通知'),
(1, 2, 'Family notifications'),
-- メンバー
(2, 1, 'メンバーに関する通知'),
(2, 2, 'child notifications'),
-- クエスト
(3, 1, 'クエストに関する通知'),
(3, 2, 'Quest notifications'),
-- コメント
(4, 1, 'コメントに関する通知'),
(4, 2, 'Comment notifications'),
-- 引き落とし
(5, 1, '引き落とし申請に関する通知'),
(5, 2, 'Withdrawal request notifications'),
-- 貯金
(6, 1, '貯金に関する通知'),
(6, 2, 'Savings notifications');
