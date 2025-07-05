-- 貯金記録テーブルのテストデータ
INSERT INTO savings_records (child_id, amount, balance) VALUES
-- 佐藤太郎の貯金記録
(11, 100, 100),
(11, 50, 150),
(11, -30, 120),
(11, 75, 195),
(11, 500, 695),
(11, 200, 895),
(11, -100, 795),
-- 佐藤花子の貯金記録
(12, 50, 50),
(12, 25, 75),
(12, 300, 375),
(12, 100, 475),
-- 田中一郎の貯金記録
(13, 200, 200),
(13, 150, 350),
(13, 100, 450),
(13, -50, 400),
(13, 1000, 1400),
(13, 500, 1900),
(13, -200, 1700),
-- メアリー・スミスの貯金記録
(14, 30, 30),
(14, 20, 50),
-- 鈴木次郎の貯金記録
(15, 500, 500),
(15, 300, 800),
(15, -200, 600),
(15, 150, 750),
(15, 2000, 2750),
(15, 800, 3550),
(15, -500, 3050);

-- 貯金記録翻訳テーブルのテストデータ
INSERT INTO savings_records_translation (savings_record_id, language_code, reason) VALUES
-- 佐藤太郎の記録（英語翻訳）
(1, 2, 'Initial savings'),
(2, 2, 'Saved from allowance'),
(3, 2, 'Bought toy'),
(4, 2, 'Saved quest reward'),
(5, 2, 'Saved allowance money'),
(6, 2, 'Saved reward for helping'),
(7, 2, 'Bought snacks'),
-- 佐藤花子の記録（英語翻訳）
(8, 2, 'First time savings'),
(9, 2, 'Helping reward'),
(10, 2, 'Quest reward'),
(11, 2, 'Saved from allowance'),
-- 田中一郎の記録（英語翻訳）
(12, 2, 'First time savings'),
(13, 2, 'Helping reward'),
(14, 2, 'Initial savings'),
(15, 2, 'Test hard work bonus'),
(16, 2, 'Quest reward'),
(17, 2, 'Bought book'),
(18, 2, 'Junior high school celebration money'),
-- メアリー・スミスの記録（日本語翻訳）
(19, 1, '貯金開始'),
(20, 1, '良い行いボーナス'),
-- 鈴木次郎の記録（英語翻訳）
(21, 2, 'High school savings start'),
(22, 2, 'Test result reward'),
(23, 2, 'Bought reference book'),
(24, 2, 'Quest completion reward'),
(25, 1, 'お小遣いの貯金'),
(26, 1, '野球カードを購入'),
(27, 1, '参考書購入費用');
