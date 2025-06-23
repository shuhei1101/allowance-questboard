-- 引き落とし申請テーブルのテストデータ
INSERT INTO withdrawal_requests (requester_id, approver_id, status_id, amount, reason) VALUES
-- 佐藤太郎の申請
(11, 1, 1, 500, '新しいサッカーボールを買いたいです'),
(11, 1, 2, 200, 'ゲームソフトを購入したいです'),
-- 田中次郎の申請
(13, 2, 2, 800, '参考書と問題集を購入したいです'),
(13, 2, 1, 300, '友達の誕生日プレゼントを買いたいです'),
-- Emily Smithの申請
(14, 3, 2, 400, 'I want to buy a baseball glove'),
(14, 3, 3, 150, 'Video game purchase request'),
-- 鈴木三郎の申請
(15, 4, 2, 1500, '大学受験の模試代金として使いたいです'),
(15, 4, 1, 600, '部活のユニフォーム代として申請します');
