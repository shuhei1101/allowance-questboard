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
