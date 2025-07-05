-- 引き落とし申請ステータステーブルのテストデータ
INSERT INTO withdrawal_request_status (code) VALUES
('pending'),
('approved'),
('rejected'),
('cancelled');

-- 引き落とし申請ステータス翻訳テーブルのテストデータ
INSERT INTO withdrawal_request_statuses_translation (withdrawal_request_status_id, language_code, name) VALUES
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
