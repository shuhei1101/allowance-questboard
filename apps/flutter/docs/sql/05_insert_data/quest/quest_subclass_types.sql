-- クエストサブクラスのタイプを挿入するSQLスクリプト
INSERT INTO quest_subclass_types (type, description) VALUES
('shared_quests', '共有クエスト'),
('template_quests', 'テンプレートクエスト'),
('family_quests', '家族クエスト'),
('saved_quests', '保存済みクエスト'),
('child_quests', 'メンバークエスト');
