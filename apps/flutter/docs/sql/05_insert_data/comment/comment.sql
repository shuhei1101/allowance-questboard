-- コメント可能タイプテーブルのテストデータ
INSERT INTO commentable_types (type, description) VALUES
('quests', 'クエストに対するコメント'),
('comments', 'コメントに対する返信コメント'),
('families', '家族に対するコメント'),
('children', 'メンバーに対するコメント');

-- コメントテーブルのテストデータ
INSERT INTO comments (user_type, user_id, commentable_type, commentable_id, parent_comment_id, body, commented_at) VALUES
-- クエストへのコメント
(1, 1, 1, 1, NULL, 'お皿洗いは最初は大変だけど、慣れてくると楽しいよ！', '2025-06-15 14:00:00+09'),
(2, 1, 1, 1, NULL, 'がんばってるね！きれいに洗えていたよ。', '2025-06-15 15:30:00+09'),
(2, 3, 1, 3, NULL, '宿題を毎日コツコツやることが大切ですね。', '2025-06-17 20:00:00+09'),
(1, 2, 1, 3, NULL, '英語の宿題が少し難しかったです。', '2025-06-17 21:00:00+09'),
-- コメントへの返信
(1, 1, 2, 1, 1, 'ありがとうございます！もっと上手になりたいです！', '2025-06-15 16:00:00+09'),
(1, 2, 2, 4, 2, '一緒に英語の勉強をしましょう！', '2025-06-17 21:30:00+09'),
-- 家族へのコメント
(2, 4, 3, 1, NULL, '佐藤家の子どもたちはとても頑張っていますね！', '2025-06-18 10:00:00+09'),
(1, 1, 3, 3, NULL, 'スミス家の皆さんも頑張ってください！', '2025-06-18 11:00:00+09'),
-- メンバーへのコメント
(1, 3, 4, 1, NULL, '太郎くんはサッカーがとても上手ですね！', '2025-06-19 16:00:00+09'),
(2, 1, 4, 3, NULL, '一郎くんは勉強熱心で感心しています。', '2025-06-19 17:00:00+09');

-- コメント翻訳テーブルのテストデータ
INSERT INTO comments_translation (comment_id, language_code, body) VALUES
-- 日本語コメントの英語翻訳
(1, 2, 'Washing dishes is tough at first, but it becomes fun once you get used to it!'),
(2, 2, 'Youre doing great! The dishes were washed very cleanly.'),
(3, 2, 'Its important to do homework consistently every day.'),
(4, 2, 'The English homework was a bit difficult.'),
(5, 2, 'Thank you! I want to get even better!'),
(6, 2, 'Lets study English together!'),
(7, 2, 'The Sato family children are working very hard!'),
(8, 2, 'Please keep up the good work, Smith family!'),
(9, 2, 'Taro is very good at soccer!'),
(10, 2, 'Ichiro is very diligent in his studies, very admirable.');
