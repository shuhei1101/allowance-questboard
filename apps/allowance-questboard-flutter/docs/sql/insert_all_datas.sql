-- =============================================================================
-- 1. 基本マスタデータ（依存関係なし）
-- =============================================================================

    -- languages(言語マスタテーブル)
        INSERT INTO languages (code, name, is_active, sort_order) VALUES
        ('ja', 'Japanese', true, 1),
        ('en', 'English', true, 2),
        ('ko', 'Korean', true, 3),
        ('zh', 'Chinese', true, 4),
        ('es', 'Spanish', true, 5),
        ('fr', 'French', true, 6),
        ('de', 'German', true, 7),
        ('pt', 'Portuguese', true, 8),
        ('it', 'Italian', true, 9),
        ('ru', 'Russian', true, 10),
        ('ar', 'Arabic', false, 11),
        ('hi', 'Hindi', false, 12);

    -- currencies(通貨マスタテーブル)
        INSERT INTO currencies (code, name, symbol, is_active, sort_order) VALUES
        ('JPY', 'Japanese Yen', '¥', true, 1),
        ('USD', 'US Dollar', '$', true, 2),
        ('EUR', 'Euro', '€', true, 3),
        ('GBP', 'British Pound', '£', true, 4),
        ('KRW', 'Korean Won', '₩', true, 5),
        ('CNY', 'Chinese Yuan', '¥', true, 6),
        ('CAD', 'Canadian Dollar', 'C$', true, 7),
        ('AUD', 'Australian Dollar', 'A$', true, 8),
        ('CHF', 'Swiss Franc', 'CHF', true, 9),
        ('SGD', 'Singapore Dollar', 'S$', true, 10),
        ('HKD', 'Hong Kong Dollar', 'HK$', false, 11),
        ('NZD', 'New Zealand Dollar', 'NZ$', false, 12);

    -- exchange_rates(為替レートテーブル（JPY基準）)
        INSERT INTO exchange_rates (base_currency, target_currency, rate, effective_date) VALUES
        -- JPY基準の為替レート
        (1, 2, 0.0067, '2025-06-20'),  -- JPY to USD
        (1, 3, 0.0061, '2025-06-20'),  -- JPY to EUR
        (1, 4, 0.0052, '2025-06-20'),  -- JPY to GBP
        (1, 5, 8.93, '2025-06-20'),    -- JPY to KRW
        (1, 6, 0.048, '2025-06-20'),   -- JPY to CNY
        -- USD基準の為替レート
        (2, 1, 149.12, '2025-06-20'),  -- USD to JPY
        (2, 3, 0.91, '2025-06-20'),    -- USD to EUR
        (2, 4, 0.78, '2025-06-20'),    -- USD to GBP
        (2, 5, 1332.50, '2025-06-20'), -- USD to KRW
        -- EUR基準の為替レート
        (3, 1, 163.93, '2025-06-20'),  -- EUR to JPY
        (3, 2, 1.10, '2025-06-20'),    -- EUR to USD
        (3, 4, 0.86, '2025-06-20');    -- EUR to GBP

    -- アイコン関連

    -- アイコンカテゴリテーブルのテストデータ
        INSERT INTO icon_categories (code, sort_order) VALUES
        ('animals', 1),
        ('people', 2),
        ('objects', 3),
        ('nature', 4),
        ('symbols', 5),
        ('flags', 6),
        ('sports', 7),
        ('food', 8),
        ('vehicles', 9),
        ('buildings', 10);

    -- アイコンカテゴリ翻訳テーブル
        INSERT INTO icon_categories_translation (category_id, language_code, name) VALUES
        -- 動物カテゴリ
        (1, 1, '動物'),
        (1, 2, 'Animals'),
        -- 人物カテゴリ
        (2, 1, '人物'),
        (2, 2, 'People'),
        -- 物体カテゴリ
        (3, 1, '物体'),
        (3, 2, 'Objects'),
        -- 自然カテゴリ
        (4, 1, '自然'),
        (4, 2, 'Nature'),
        -- シンボルカテゴリ
        (5, 1, 'シンボル'),
        (5, 2, 'Symbols'),
        -- 国旗カテゴリ
        (6, 1, '国旗'),
        (6, 2, 'Flags'),
        -- スポーツカテゴリ
        (7, 1, 'スポーツ'),
        (7, 2, 'Sports'),
        -- 食べ物カテゴリ
        (8, 1, '食べ物'),
        (8, 2, 'Food'),
        -- 乗り物カテゴリ
        (9, 1, '乗り物'),
        (9, 2, 'Vehicles'),
        -- 建物カテゴリ
        (10, 1, '建物'),
        (10, 2, 'Buildings');

        -- アイコンテーブルのテストデータ
        INSERT INTO icons (code, category_id, sort_order) VALUES
        -- 動物アイコン
        ('cat', 1, 1),
        ('dog', 1, 2),
        ('rabbit', 1, 3),
        ('bear', 1, 4),
        ('lion', 1, 5),

        -- 人物アイコン
        ('boy', 2, 1),
        ('girl', 2, 2),
        ('man', 2, 3),
        ('woman', 2, 4),
        ('family', 2, 5),

        -- 物体アイコン
        ('ball', 3, 1),
        ('book', 3, 2),
        ('pencil', 3, 3),
        ('toy', 3, 4),
        ('game', 3, 5),

        -- 自然アイコン
        ('sun', 4, 1),
        ('moon', 4, 2),
        ('star', 4, 3),
        ('tree', 4, 4),
        ('flower', 4, 5),

        -- シンボルアイコン
        ('heart', 5, 1),
        ('diamond', 5, 2),
        ('crown', 5, 3),
        ('medal', 5, 4),
        ('trophy', 5, 5),

        -- 国旗アイコン
        ('flag_jp', 6, 1),
        ('flag_us', 6, 2),
        ('flag_uk', 6, 3),
        ('flag_kr', 6, 4),
        ('flag_cn', 6, 5);

    -- 国家マスタ

        INSERT INTO countries (name, icon_id, is_active, sort_order) VALUES
        ('Japan', 26, true, 1),
        ('United States', 27, true, 2),
        ('United Kingdom', 28, true, 3),
        ('South Korea', 29, true, 4),
        ('China', 30, true, 5),
        ('Canada', NULL, true, 6),
        ('Australia', NULL, true, 7),
        ('Germany', NULL, true, 8),
        ('France', NULL, true, 9),
        ('Italy', NULL, true, 10),
        ('Spain', NULL, false, 11),
        ('Brazil', NULL, false, 12);

    -- 学歴マスタ

        INSERT INTO educations (code) VALUES
        ('preschool'),
        ('elementary'),
        ('junior_high'),
        ('high_school'),
        ('university'),
        ('graduate_school'),
        ('working'),
        ('other');

    -- 学歴翻訳テーブル
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

    -- ユーザタイプ

        INSERT INTO user_types (type, description) VALUES
        ('family', '家族（親）ユーザー'),
        ('child', 'メンバー（子供）ユーザー');

    -- レポート対象タイプ

        INSERT INTO reportable_types (type, description) VALUES
        ('family', '家族（親）に対するレポート'),
        ('child', 'メンバー（子供）に対するレポート'),
        ('quest', 'クエストに対するレポート'),
        ('comment', 'コメントに対するレポート');

    -- レポートステータス

        INSERT INTO report_statuses (code, status) VALUES
        ('pending', '申請中'),
        ('reviewed', 'レビュー中'),
        ('resolved', '解決済み'),
        ('dismissed', '却下');

    -- 通知対象タイプ

        INSERT INTO notifiable_types (type, description) VALUES
        ('family', '家族に関する通知'),
        ('child', 'メンバーに関する通知'),
        ('quest', 'クエストに関する通知'),
        ('comment', 'コメントに関する通知'),
        ('withdrawal', '引き落とし申請に関する通知'),
        ('savings', '貯金に関する通知');

    -- 通知対象タイプ翻訳テーブル
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

    -- スクリーン

        INSERT INTO screens (name, description) VALUES
        ('quest_page', 'クエスト詳細ページ'),
        ('comment_page', 'コメント詳細ページ'),
        ('family_page', '家族詳細ページ'),
        ('child_page', 'メンバー詳細ページ'),
        ('withdrawal_page', '引き落とし申請ページ'),
        ('savings_page', '貯金ページ'),
        ('allowance_page', 'お小遣い履歴ページ'),
        ('home_page', 'ホームページ'),
        ('profile_page', 'プロフィールページ'),
        ('settings_page', '設定ページ');

    -- 引き落とし申請ステータス

        INSERT INTO withdrawal_request_status (code) VALUES
        ('pending'),
        ('approved'),
        ('rejected');

    -- 引き落とし申請ステータス翻訳テーブル
        INSERT INTO withdrawal_request_statuses_translation (withdrawal_request_status_id, language_code, name) VALUES
        -- 申請中
        (1, 1, '申請中'),
        (1, 2, 'Pending'),
        -- 承認済み
        (2, 1, '承認済み'),
        (2, 2, 'Approved'),
        -- 拒否
        (3, 1, '拒否'),
        (3, 2, 'Rejected');

    -- お小遣い種類

        INSERT INTO allowanceable_types (type, description) VALUES
        ('family', '家族からのお小遣い'),
        ('child', 'メンバー間のお小遣い'),
        ('quest', 'クエスト報酬'),
        ('comment', 'コメント報酬');

-- =============================================================================
-- 2. 認証システム（auth.users）に依存するデータ
-- =============================================================================

    -- auth.users(初回のみ)
        -- INSERT INTO auth.users (
        -- instance_id, 
        -- id, 
        -- aud, 
        -- role, 
        -- email, 
        -- encrypted_password, 
        -- email_confirmed_at, 
        -- raw_app_meta_data, 
        -- raw_user_meta_data, 
        -- is_super_admin, 
        -- email_change_confirm_statuses, 
        -- is_sso_user, 
        -- is_anonymous
        -- ) VALUES
        -- -- 佐藤家（親）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440001'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'sato@example.com',
        -- '$2a$10$hashedpassword001',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "佐藤太郎", "full_name": "佐藤太郎"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- 田中家（親）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440002'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'tanaka@example.com',
        -- '$2a$10$hashedpassword002',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "田中花子", "full_name": "田中花子"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- スミス家（親）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440003'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'smith@example.com',
        -- '$2a$10$hashedpassword003',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "John Smith", "full_name": "John Smith"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- 鈴木家（親）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440004'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'suzuki@example.com',
        -- '$2a$10$hashedpassword004',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "鈴木美香", "full_name": "鈴木美香"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- 佐藤家の子供1（太郎）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440005'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'sato.taro@example.com',
        -- '$2a$10$hashedpassword005',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "佐藤太郎", "full_name": "佐藤太郎"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- 佐藤家の子供2（花子）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440006'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'sato.hanako@example.com',
        -- '$2a$10$hashedpassword006',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "佐藤花子", "full_name": "佐藤花子"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- 田中家の子供（次郎）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440007'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'tanaka.jiro@example.com',
        -- '$2a$10$hashedpassword007',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "田中次郎", "full_name": "田中次郎"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- スミス家の子供（Emily）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440008'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'emily.smith@example.com',
        -- '$2a$10$hashedpassword008',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "Emily Smith", "full_name": "Emily Smith"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- ),
        -- -- 鈴木家の子供（三郎）
        -- (
        -- '00000000-0000-0000-0000-000000000000'::uuid,
        -- '550e8400-e29b-41d4-a716-446655440009'::uuid,
        -- 'authenticated',
        -- 'authenticated',
        -- 'suzuki.saburo@example.com',
        -- '$2a$10$hashedpassword009',
        -- now(),
        -- '{"provider": "email", "providers": ["email"]}',
        -- '{"nickname": "鈴木三郎", "full_name": "鈴木三郎"}',
        -- false,
        -- 0,
        -- false,
        -- false
        -- );

    -- ユーザ設定テーブル

        INSERT INTO user_settings (user_id, language_code) VALUES
        ('550e8400-e29b-41d4-a716-446655440001'::uuid, 1), -- 佐藤家の親（日本語）
        ('550e8400-e29b-41d4-a716-446655440002'::uuid, 1), -- 田中家の親（日本語）
        ('550e8400-e29b-41d4-a716-446655440003'::uuid, 2), -- スミス家の親（英語）
        ('550e8400-e29b-41d4-a716-446655440004'::uuid, 1), -- 鈴木家の親（日本語）
        ('550e8400-e29b-41d4-a716-446655440005'::uuid, 1), -- 佐藤太郎（日本語）
        ('550e8400-e29b-41d4-a716-446655440006'::uuid, 1), -- 佐藤花子（日本語）
        ('550e8400-e29b-41d4-a716-446655440007'::uuid, 1), -- 田中次郎（日本語）
        ('550e8400-e29b-41d4-a716-446655440008'::uuid, 2), -- Emily Smith（英語）
        ('550e8400-e29b-41d4-a716-446655440009'::uuid, 1); -- 鈴木三郎（日本語）

    -- 家族テーブル

        INSERT INTO families (user_id, icon_id) VALUES
        ('550e8400-e29b-41d4-a716-446655440001'::uuid, 10), -- 佐藤家（家族アイコン）
        ('550e8400-e29b-41d4-a716-446655440002'::uuid, 9),  -- 田中家（女性アイコン）
        ('550e8400-e29b-41d4-a716-446655440003'::uuid, 8),  -- スミス家（男性アイコン）
        ('550e8400-e29b-41d4-a716-446655440004'::uuid, 9);  -- 鈴木家（女性アイコン）

    -- 家族翻訳テーブル
        INSERT INTO families_translation (family_id, language_code, name, bio) VALUES
        -- 佐藤家
        (1, 1, '佐藤家', '東京在住の4人家族です。子供たちの成長を楽しく見守っています。'),
        (1, 2, 'Sato Family', 'A family of four living in Tokyo. We enjoy watching our children grow.'),
        -- 田中家
        (2, 1, '田中家', '大阪在住の3人家族です。お料理と読書が好きです。'),
        (2, 2, 'Tanaka Family', 'A family of three living in Osaka. We love cooking and reading.'),
        -- スミス家
        (3, 1, 'スミス家', 'アメリカ出身の国際家族です。日本文化を学んでいます。'),
        (3, 2, 'Smith Family', 'An international family from America. Learning about Japanese culture.'),
        -- 鈴木家
        (4, 1, '鈴木家', '札幌在住の3人家族です。アウトドア活動が大好きです。'),
        (4, 2, 'Suzuki Family', 'A family of three living in Sapporo. We love outdoor activities.');

    -- 家族設定テーブル
        INSERT INTO families_settings (family_id, currency_id) VALUES
        (1, 1), -- 佐藤家：日本円（JPY）
        (2, 1), -- 田中家：日本円（JPY）
        (3, 2), -- スミス家：米ドル（USD）
        (4, 1); -- 鈴木家：日本円（JPY）

-- =============================================================================
-- 3. 家族テーブルに依存するデータ
-- =============================================================================

    -- メンバーテーブル（修正版）

        INSERT INTO children (user_id, family_id, name, icon_id, birthday) VALUES
        ('550e8400-e29b-41d4-a716-446655440005'::uuid, 1, '佐藤太郎', 6, '2014-04-15'), -- 小学生（11歳）
        ('550e8400-e29b-41d4-a716-446655440006'::uuid, 1, '佐藤花子', 7, '2018-08-22'), -- 幼稚園（6歳）
        ('550e8400-e29b-41d4-a716-446655440007'::uuid, 2, '田中次郎', 6, '2011-12-03'), -- 中学生（13歳）
        ('550e8400-e29b-41d4-a716-446655440008'::uuid, 3, 'Emily Smith', 7, '2015-02-28'), -- 小学生（10歳）
        ('550e8400-e29b-41d4-a716-446655440009'::uuid, 4, '鈴木三郎', 6, '2008-09-18'); -- 高校生（16歳）

    -- メンバー設定テーブル
        INSERT INTO children_settings (child_id, min_savings) VALUES
        (1, 1000), -- 佐藤太郎：最低貯金額1000円
        (2, 500),  -- 佐藤花子：最低貯金額500円
        (3, 2000), -- 田中次郎：最低貯金額2000円
        (4, 800),  -- Emily Smith：最低貯金額800円
        (5, 3000); -- 鈴木三郎：最低貯金額3000円

    -- メンバーステータステーブル
        INSERT INTO child_stats (child_id, exp, balance) VALUES
        (1, 450, 1500),  -- 佐藤太郎：経験値450、残高1500円
        (2, 180, 800),   -- 佐藤花子：経験値180、残高800円
        (3, 750, 3200),  -- 田中次郎：経験値750、残高3200円
        (4, 320, 1200),  -- Emily Smith：経験値320、残高1200円
        (5, 1200, 5500); -- 鈴木三郎：経験値1200、残高5500円

    -- メンバー学年（修正版）

        INSERT INTO child_grade (child_id, education_id, grade) VALUES
        (1, 2, 5), -- 佐藤太郎：小学校5年生
        (2, 1, 1), -- 佐藤花子：就学前（年長）
        (3, 3, 2), -- 田中次郎：中学校2年生
        (4, 2, 4), -- Emily Smith：小学校4年生
        (5, 4, 2); -- 鈴木三郎：高等学校2年生

    -- 教育期間

        INSERT INTO education_period (child_id, education_id, period) VALUES
        -- 佐藤太郎（現在小学5年生）
        (1, 1, 2), -- 就学前2年間
        (1, 2, 6), -- 小学校6年間予定
        -- 佐藤花子（現在年長）
        (2, 1, 3), -- 就学前3年間予定
        -- 田中次郎（現在中学2年生）
        (3, 1, 1), -- 就学前1年間
        (3, 2, 6), -- 小学校6年間
        (3, 3, 3), -- 中学校3年間予定
        -- Emily Smith（現在小学4年生）
        (4, 1, 2), -- 就学前2年間
        (4, 2, 6), -- 小学校6年間予定
        -- 鈴木三郎（現在高校2年生）
        (5, 1, 1), -- 就学前1年間
        (5, 2, 6), -- 小学校6年間
        (5, 3, 3), -- 中学校3年間
        (5, 4, 3); -- 高等学校3年間予定

    -- フォロー関係

        INSERT INTO follows (follower_id, followed_id) VALUES
        (1, 2), -- 佐藤家が田中家をフォロー
        (1, 3), -- 佐藤家がスミス家をフォロー
        (2, 1), -- 田中家が佐藤家をフォロー
        (2, 4), -- 田中家が鈴木家をフォロー
        (3, 1), -- スミス家が佐藤家をフォロー
        (3, 4), -- スミス家が鈴木家をフォロー
        (4, 1), -- 鈴木家が佐藤家をフォロー
        (4, 2); -- 鈴木家が田中家をフォロー

    -- 経験値レベル設定

        INSERT INTO exp_by_level (family_id, level, exp) VALUES
        -- 佐藤家のレベル設定
        (1, 1, 0),
        (1, 2, 100),
        (1, 3, 250),
        (1, 4, 450),
        (1, 5, 700),
        (1, 6, 1000),
        (1, 7, 1350),
        (1, 8, 1750),
        (1, 9, 2200),
        (1, 10, 2700),
        -- 田中家のレベル設定
        (2, 1, 0),
        (2, 2, 120),
        (2, 3, 280),
        (2, 4, 500),
        (2, 5, 780),
        (2, 6, 1120),
        (2, 7, 1520),
        (2, 8, 1980),
        (2, 9, 2500),
        (2, 10, 3080),
        -- スミス家のレベル設定
        (3, 1, 0),
        (3, 2, 80),
        (3, 3, 200),
        (3, 4, 380),
        (3, 5, 620),
        (3, 6, 920),
        (3, 7, 1280),
        (3, 8, 1700),
        (3, 9, 2180),
        (3, 10, 2720),
        -- 鈴木家のレベル設定
        (4, 1, 0),
        (4, 2, 150),
        (4, 3, 350),
        (4, 4, 600),
        (4, 5, 900),
        (4, 6, 1250),
        (4, 7, 1650),
        (4, 8, 2100),
        (4, 9, 2600),
        (4, 10, 3150);

-- =============================================================================
-- 4. サブタイプテーブル関連
-- =============================================================================

    -- お小遣いテーブルサブタイプ

        INSERT INTO allowance_table_sub_types (type, description) VALUES
        ('child_allowance_table', 'メンバー個人のお小遣い設定'),
        ('family_allowance_table', '家族のお小遣い設定'),
        ('shared_allowance_table', '共有お小遣い設定');

    -- レベルテーブルサブタイプ

        INSERT INTO child_level_sub_types (type, description) VALUES
        ('child_level_table', 'メンバー個人のレベル設定'),
        ('family_level_table', '家族のレベル設定'),
        ('shared_level_table', '共有レベル設定');

-- =============================================================================
-- 5. お小遣いテーブル関連
-- =============================================================================

    -- お小遣いテーブル（基底クラス）

        INSERT INTO allowance_table (subclass_type, subclass_id) VALUES
        -- メンバー個人のお小遣い設定
        (1, 1), -- 佐藤太郎用（child）
        (1, 2), -- 佐藤花子用（child）
        (1, 3), -- 田中次郎用（child）
        (1, 4), -- Emily Smith用（child）
        (1, 5), -- 鈴木三郎用（child）
        -- 家族のお小遣い設定
        (2, 1), -- 佐藤家用（family）
        (2, 2), -- 田中家用（family）
        (2, 3), -- スミス家用（family）
        (2, 4); -- 鈴木家用（family）

    -- メンバーお小遣いテーブル
        INSERT INTO child_allowance_table (superclass_id, child_id) VALUES
        (1, 1), -- 佐藤太郎
        (2, 2), -- 佐藤花子
        (3, 3), -- 田中次郎
        (4, 4), -- Emily Smith
        (5, 5); -- 鈴木三郎

    -- 家族お小遣いテーブル
        INSERT INTO family_allowance_table (superclass_id, family_id) VALUES
        (6, 1), -- 佐藤家
        (7, 2), -- 田中家
        (8, 3), -- スミス家
        (9, 4); -- 鈴木家

    -- 年齢別お小遣いテーブル
        INSERT INTO allowance_by_age (allowance_table_id, age, amount) VALUES
        -- 佐藤太郎用（allowance_table_id: 1）
        (1, 5, 100), -- 5歳: 100円
        (1, 6, 150), -- 6歳: 150円
        (1, 7, 200), -- 7歳: 200円
        (1, 8, 250), -- 8歳: 250円
        (1, 9, 300), -- 9歳: 300円
        (1, 10, 400), -- 10歳: 400円
        (1, 11, 500), -- 11歳: 500円（現在）
        (1, 12, 600), -- 12歳: 600円
        -- 佐藤花子用（allowance_table_id: 2）
        (2, 3, 50), -- 3歳: 50円
        (2, 4, 75), -- 4歳: 75円
        (2, 5, 100), -- 5歳: 100円
        (2, 6, 150), -- 6歳: 150円（現在）
        (2, 7, 200), -- 7歳: 200円
        (2, 8, 250), -- 8歳: 250円
        -- 田中次郎用（allowance_table_id: 3）
        (3, 12, 800), -- 12歳: 800円
        (3, 13, 1000), -- 13歳: 1000円（現在）
        (3, 14, 1200), -- 14歳: 1200円
        (3, 15, 1500), -- 15歳: 1500円
        (3, 16, 2000), -- 16歳: 2000円
        -- Emily Smith用（allowance_table_id: 4）
        (4, 8, 200), -- 8歳: 200円
        (4, 9, 250), -- 9歳: 250円
        (4, 10, 300), -- 10歳: 300円（現在）
        (4, 11, 350), -- 11歳: 350円
        (4, 12, 400), -- 12歳: 400円
        -- 鈴木三郎用（allowance_table_id: 5）
        (5, 14, 1500), -- 14歳: 1500円
        (5, 15, 2000), -- 15歳: 2000円
        (5, 16, 2500), -- 16歳: 2500円（現在）
        (5, 17, 3000), -- 17歳: 3000円
        (5, 18, 3500); -- 18歳: 3500円

-- =============================================================================
-- 6. クエスト関連
-- =============================================================================

    -- クエストサブクラスタイプ

        INSERT INTO quest_subclass_types (type, description) VALUES
        ('shared_quests', '共有クエスト'),
        ('template_quests', 'テンプレートクエスト'),
        ('family_quests', '家族クエスト'),
        ('saved_quests', '保存済みクエスト'),
        ('child_quests', 'メンバークエスト');

    -- クエストカテゴリサブクラスタイプ

        INSERT INTO quest_category_subclass_types (type, description) VALUES
        ('template_quest_categories', 'テンプレートクエスト'),
        ('family_quest_categories', '家族クエスト'),
        ('custom_quest_categories', 'カスタムクエスト');

    -- クエストカテゴリ（基底クラス）

        INSERT INTO quest_categories (subclass_type, subclass_id) VALUES
        -- テンプレートクエストカテゴリ (subclass_type: 1 = template_quest_categories)
        (1, 1), -- 家事手伝い
        (1, 2), -- 勉強・学習
        (1, 3), -- 運動・スポーツ
        (1, 4), -- 片付け・整理
        (1, 5), -- お手伝い全般
        -- 家族クエストカテゴリ (subclass_type: 2 = family_quest_categories)
        (2, 1), -- 佐藤家用
        (2, 2), -- 田中家用
        (2, 3), -- スミス家用
        (2, 4), -- 鈴木家用
        -- カスタムクエストカテゴリ（佐藤家作成） (subclass_type: 3 = custom_quest_categories)
        (3, 1); -- 佐藤家のオリジナルカテゴリ

    -- テンプレートクエストカテゴリテーブル
        INSERT INTO template_quest_categories (category_id, code, sort_order, is_active) VALUES
        (1, 'housework', 1, true),
        (2, 'study', 2, true),
        (3, 'exercise', 3, true),
        (4, 'cleanup', 4, true),
        (5, 'help_general', 5, true);

    -- 家族クエストカテゴリテーブル
        INSERT INTO family_quest_categories (category_id, family_id) VALUES
        (6, 1), -- 佐藤家
        (7, 2), -- 田中家
        (8, 3), -- スミス家
        (9, 4); -- 鈴木家

    -- カスタムクエストカテゴリテーブル
        INSERT INTO custom_quest_categories (category_id, family_id) VALUES
        (10, 1); -- 佐藤家のカスタムカテゴリ

    -- クエストカテゴリ翻訳テーブル
        INSERT INTO quest_categories_translation (quest_category_id, language_code, name) VALUES
        -- 家事手伝い
        (1, 1, '家事手伝い'),
        (1, 2, 'Household Chores'),
        -- 勉強・学習
        (2, 1, '勉強・学習'),
        (2, 2, 'Study & Learning'),
        -- 運動・スポーツ
        (3, 1, '運動・スポーツ'),
        (3, 2, 'Exercise & Sports'),
        -- 片付け・整理
        (4, 1, '片付け・整理'),
        (4, 2, 'Cleaning & Organization'),
        -- お手伝い全般
        (5, 1, 'お手伝い全般'),
        (5, 2, 'General Help'),
        -- 各家族専用カテゴリ
        (6, 1, '佐藤家専用'),
        (6, 2, 'Sato Family Only'),
        (7, 1, '田中家専用'),
        (7, 2, 'Tanaka Family Only'),
        (8, 1, 'スミス家専用'),
        (8, 2, 'Smith Family Only'),
        (9, 1, '鈴木家専用'),
        (9, 2, 'Suzuki Family Only'),
        -- 佐藤家のカスタム
        (10, 1, '特別なお手伝い'),
        (10, 2, 'Special Help');

    -- クエスト（基底クラス）

        INSERT INTO quests (subclass_type, subclass_id, category_id, icon_id, age_from, age_to, has_published_month, month_from, month_to) VALUES
        -- テンプレートクエスト (subclass_type: 2 = template_quests)
        (2, 1, 1, 11, 5, 15, false, NULL, NULL), -- お皿洗い
        (2, 2, 1, 12, 3, 12, false, NULL, NULL), -- 洗濯たたみ
        (2, 3, 2, 13, 6, 18, false, NULL, NULL), -- 宿題をする
        (2, 4, 3, 16, 5, 18, false, NULL, NULL), -- ランニング
        (2, 5, 4, 14, 4, 15, false, NULL, NULL), -- 部屋の片付け
        (2, 6, 1, 15, 8, 18, true, 12, 2);       -- 年末大掃除（季節限定）

    -- テンプレートクエストテーブル
        INSERT INTO template_quests (quest_id) VALUES
        (1), (2), (3), (4), (5), (6);

    -- クエスト翻訳テーブル
        INSERT INTO quests_translation (quest_id, language_code, title, client, request_detail) VALUES
        -- お皿洗い
        (1, 1, 'お皿洗いをしよう', 'お母さん', '食事後のお皿やコップを洗って片付けてください。'),
        (1, 2, 'Wash the Dishes', 'Mom', 'Please wash and put away dishes and cups after meals.'),
        -- 洗濯たたみ
        (2, 1, '洗濯物をたたもう', 'お母さん', '乾いた洗濯物をきれいにたたんで片付けてください。'),
        (2, 2, 'Fold the Laundry', 'Mom', 'Please fold the dried laundry neatly and put it away.'),
        -- 宿題をする
        (3, 1, '今日の宿題をしよう', '先生', '学校から出された宿題を最後まで終わらせてください。'),
        (3, 2, 'Do Your Homework', 'Teacher', 'Please complete all homework assigned by school.'),
        -- ランニング
        (4, 1, '外でランニングしよう', 'お父さん', '30分間外を走って体力をつけましょう。'),
        (4, 2, 'Go Running Outside', 'Dad', 'Run outside for 30 minutes to build stamina.'),
        -- 部屋の片付け
        (5, 1, '部屋をきれいにしよう', 'お母さん', '自分の部屋をきれいに片付けてください。'),
        (5, 2, 'Clean Your Room', 'Mom', 'Please clean and organize your own room.'),
        -- 年末大掃除
        (6, 1, '年末大掃除をしよう', 'お父さん', '家族みんなで大掃除をして新年を迎える準備をしましょう。'),
        (6, 2, 'Year-end Cleaning', 'Dad', 'Lets do a big cleaning together as a family to prepare for the new year.');

    -- クエスト詳細（レベル別）

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
        (6, 1, '自分の部屋を掃除する', 1, 200, 1, 50, 25),
        (6, 2, '家の一部を家族と一緒に掃除する', 1, 400, 1, 80, 40),
        (6, 3, '家全体の大掃除を完了する', 1, 800, 1, 150, 75);

    -- クエスト詳細翻訳テーブル
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
        (13, 2, 'Clean up the desk'),
        (14, 2, 'Pick up things scattered on the floor'),
        (15, 2, 'Clean the entire room thoroughly'),
        -- 年末大掃除
        (16, 2, 'Clean your own room'),
        (17, 2, 'Clean part of the house with family'),
        (18, 2, 'Complete the big cleaning of the entire house');

    -- クエスト経験値（レベル別）

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
        (6, 3, 500);

    -- クエストリクエストステータス

        INSERT INTO quest_request_statuses (code) VALUES
        ('pending'),
        ('approved'),
        ('rejected'),
        ('cancelled');

    -- クエストリクエストステータス翻訳テーブル
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

-- =============================================================================
-- 10. コメント関連データ
-- =============================================================================

    -- コメント可能タイプテーブル

        INSERT INTO commentable_types (type, description) VALUES
        ('quests', 'クエストに対するコメント'),
        ('comments', 'コメントに対する返信コメント'),
        ('families', '家族に対するコメント'),
        ('children', 'メンバーに対するコメント');

    -- コメントテーブル

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
        (2, 1, 4, 3, NULL, '次郎くんは勉強熱心で感心しています。', '2025-06-19 17:00:00+09');

    -- コメント翻訳テーブル

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
        (10, 2, 'Jiro is very diligent in his studies, very admirable.');

    -- コメントいいねテーブル

        INSERT INTO comment_likes (comment_id, user_type, user_id, liked_at) VALUES
        -- 家族がコメントにいいね
        (1, 1, 1, '2025-06-15 14:30:00+09'), -- 佐藤家がコメント1にいいね
        (2, 2, 1, '2025-06-15 16:00:00+09'), -- 佐藤太郎がコメント2にいいね
        (3, 1, 2, '2025-06-17 20:30:00+09'), -- 田中家がコメント3にいいね
        (4, 1, 3, '2025-06-17 21:15:00+09'), -- スミス家がコメント4にいいね
        (7, 1, 1, '2025-06-18 10:30:00+09'), -- 佐藤家がコメント7にいいね
        (8, 1, 3, '2025-06-18 11:30:00+09'), -- スミス家がコメント8にいいね
        (9, 2, 1, '2025-06-19 16:30:00+09'), -- 佐藤太郎がコメント9にいいね
        (10, 2, 3, '2025-06-19 17:30:00+09'); -- 田中次郎がコメント10にいいね

-- =============================================================================
-- 11. 通知関連データ
-- =============================================================================

    -- 通知テーブル

        INSERT INTO notifications (user_type, user_id, notifiable_type, notifiable_id, push_to, is_read, read_at, received_at) VALUES
        -- 佐藤太郎への通知
        (2, 1, 3, 1, 1, true, '2025-06-15 15:00:00+09', '2025-06-15 14:30:00+09'), -- クエスト1の通知（既読）
        (2, 1, 4, 2, 2, false, NULL, '2025-06-15 16:00:00+09'), -- コメント2の通知（未読）
        (2, 1, 6, 1, 7, true, '2025-06-18 10:00:00+09', '2025-06-18 09:30:00+09'), -- 貯金記録の通知（既読）
        -- 佐藤花子への通知
        (2, 2, 3, 2, 1, false, NULL, '2025-06-19 14:30:00+09'), -- クエスト2の通知（未読）
        (2, 2, 1, 1, 3, true, '2025-06-16 12:00:00+09', '2025-06-16 11:30:00+09'), -- 家族からの通知（既読）
        -- 田中一郎への通知
        (2, 3, 3, 3, 1, true, '2025-06-17 20:30:00+09', '2025-06-17 20:00:00+09'), -- クエスト3の通知（既読）
        (2, 3, 5, 1, 5, false, NULL, '2025-06-18 15:00:00+09'), -- 引き落とし申請の通知（未読）
        -- 佐藤家（親）への通知
        (1, 1, 5, 1, 5, true, '2025-06-15 11:00:00+09', '2025-06-15 10:30:00+09'), -- 引き落とし申請の通知（既読）
        (1, 1, 3, 1, 1, false, NULL, '2025-06-18 16:00:00+09'), -- クエスト完了の通知（未読）
        -- 田中家（親）への通知
        (1, 2, 5, 2, 5, true, '2025-06-18 10:00:00+09', '2025-06-18 09:30:00+09'), -- 引き落とし申請の承認通知（既読）
        -- スミス家（親）への通知
        (1, 3, 4, 8, 2, false, NULL, '2025-06-18 11:30:00+09'), -- コメントの通知（未読）
        -- 鈴木家（親）への通知
        (1, 4, 5, 3, 5, true, '2025-06-20 20:30:00+09', '2025-06-20 20:00:00+09'); -- 引き落とし申請の通知（既読）

-- =============================================================================
-- 12. レポート関連データ
-- =============================================================================

    -- レポートテーブル

        INSERT INTO reports (reporter_type, reporter_id, reportable_type, reportable_id, status_id, reported_at, resolved_at) VALUES
        -- コメントへのレポート
        (1, 2, 4, 8, 3, '2025-06-18 12:00:00+09', '2025-06-19 10:00:00+09'), -- 田中家がコメント8を通報（解決済み）
        (2, 4, 4, 7, 1, '2025-06-18 14:00:00+09', NULL), -- Emily Smithがコメント7を通報（申請中）
        -- 家族への不適切なレポート
        (2, 1, 1, 3, 4, '2025-06-17 16:00:00+09', '2025-06-18 09:00:00+09'), -- 佐藤太郎がスミス家を通報（却下）
        -- メンバーへのレポート
        (1, 3, 2, 1, 2, '2025-06-19 11:00:00+09', NULL), -- スミス家が佐藤太郎を通報（レビュー中）
        -- クエストへのレポート
        (2, 3, 3, 6, 1, '2025-06-20 15:00:00+09', NULL); -- 田中次郎が年末大掃除クエストを通報（申請中）

-- =============================================================================
-- 13. 銀行・お小遣い記録関連データ
-- =============================================================================

    -- お小遣い記録テーブル

        INSERT INTO allowance_records (child_id, allowanceable_type, allowanceable_id, title, amount, recorded_at) VALUES
        -- 佐藤太郎のお小遣い記録
        (1, 1, 1, '家事お手伝いボーナス', 100, '2025-06-15 10:00:00+09'),
        (1, 3, 1, 'お皿洗いクエスト達成', 75, '2025-06-18 15:30:00+09'),
        (1, 1, 1, '週末特別お小遣い', 200, '2025-06-20 09:00:00+09'),
        -- 佐藤花子のお小遣い記録
        (2, 1, 1, 'お手伝い頑張ったで賞', 50, '2025-06-16 11:00:00+09'),
        (2, 3, 2, '洗濯たたみクエスト達成', 60, '2025-06-19 14:00:00+09'),
        -- 田中一郎のお小遣い記録
        (3, 1, 2, '中間テスト頑張ったボーナス', 500, '2025-06-10 16:00:00+09'),
        (3, 3, 3, '宿題クエスト達成', 150, '2025-06-17 17:00:00+09'),
        -- Emily Smithのお小遣い記録
        (4, 1, 3, 'Good behavior reward', 300, '2025-06-12 12:00:00+09'),
        (4, 3, 4, 'Running quest completed', 120, '2025-06-19 18:00:00+09'),
        -- 鈴木三郎のお小遣い記録
        (5, 1, 4, 'Helping with cleaning', 80, '2025-06-14 10:30:00+09');

    -- 貯金記録テーブル

        INSERT INTO savings_records (child_id, amount, balance, recorded_at) VALUES
        -- 佐藤太郎の貯金記録
        (1, 100, 100, '2025-06-01 10:00:00+09'),
        (1, 50, 150, '2025-06-05 14:00:00+09'),
        (1, -30, 120, '2025-06-08 16:00:00+09'),
        (1, 75, 195, '2025-06-15 18:00:00+09'),
        (1, 200, 395, '2025-06-20 09:00:00+09'),
        -- 佐藤花子の貯金記録
        (2, 50, 50, '2025-06-02 10:00:00+09'),
        (2, 25, 75, '2025-06-10 15:00:00+09'),
        (2, 60, 135, '2025-06-19 14:00:00+09'),
        -- 田中次郎の貯金記録
        (3, 200, 200, '2025-06-01 12:00:00+09'),
        (3, 150, 350, '2025-06-10 16:00:00+09'),
        (3, 500, 850, '2025-06-10 16:30:00+09'),
        (3, -50, 800, '2025-06-12 10:00:00+09'),
        (3, 150, 950, '2025-06-17 17:00:00+09'),
        -- Emily Smithの貯金記録
        (4, 300, 300, '2025-06-12 12:00:00+09'),
        (4, 120, 420, '2025-06-19 18:00:00+09'),
        -- 鈴木三郎の貯金記録
        (5, 80, 80, '2025-06-14 10:30:00+09');

    -- 引き落とし申請テーブル

        INSERT INTO withdrawal_requests (requester_id, approver_id, status_id, amount, reason, requested_at, approved_at) VALUES
        -- 佐藤太郎の申請
        (1, 1, 2, 200, 'ゲームソフトを購入したいです', '2025-06-15 10:30:00+09', '2025-06-15 11:00:00+09'),
        (1, 1, 1, 500, '新しいサッカーボールを買いたいです', '2025-06-20 14:00:00+09', NULL),
        -- 田中次郎の申請
        (3, 2, 2, 800, '参考書と問題集を購入したいです', '2025-06-10 15:00:00+09', '2025-06-10 16:00:00+09'),
        (3, 2, 1, 300, '友達の誕生日プレゼントを買いたいです', '2025-06-18 14:00:00+09', NULL),
        -- Emily Smithの申請
        (4, 3, 2, 400, 'I want to buy a baseball glove', '2025-06-18 10:00:00+09', '2025-06-18 11:00:00+09'),
        (4, 3, 3, 150, 'Video game purchase request', '2025-06-20 15:00:00+09', NULL);

-- =============================================================================
-- 14. クエストリクエスト関連データ
-- =============================================================================

    -- クエストリクエストテーブル

        INSERT INTO quest_requests (family_id, child_id, quest_id, title, description, is_new_request, status_id, answer, answered_at, requested_at) VALUES
        -- 新規クエストリクエスト（承認済み）
        (1, 1, NULL, 'ゲームを1時間だけする', '宿題を終わらせたあとに、1時間だけゲームをしたいです。', true, 2, '宿題が完了したことを確認できたので承認します。', '2025-06-10 19:00:00+09', '2025-06-10 18:00:00+09'),
        -- 既存クエストリクエスト（申請中）
            (1, 2, 3, '宿題クエストを追加してほしい', '毎日の宿題クエストを私にも追加してください。', false, 1, NULL, NULL, '2025-06-18 16:00:00+09'),
        -- 新規クエストリクエスト（拒否）
        (2, 3, NULL, '夜更かしをしたい', '今日だけ夜12時まで起きていたいです。', true, 3, '健康のために早く寝ることが大切です。', '2025-06-12 21:00:00+09', '2025-06-12 20:00:00+09'),
        -- 既存クエストリクエスト（承認済み）
        (3, 4, 4, 'ランニングクエストを追加', 'ランニングクエストに挑戦したいです！', false, 2, '運動習慣は素晴らしいですね。承認します。', '2025-06-14 10:00:00+09', '2025-06-14 09:00:00+09'),
        -- 新規クエストリクエスト（申請中）
        (4, 5, NULL, '友達と遊ぶ時間', '宿題が終わったら友達と公園で遊びたいです。', true, 1, NULL, NULL, '2025-06-20 16:00:00+09'),
        -- キャンセルされたリクエスト
        (2, 3, NULL, 'おやつを増やしてほしい', 'もう少しおやつを食べたいです。', true, 4, NULL, NULL, '2025-06-13 15:00:00+09');

-- =============================================================================
-- 15. 不足していたテーブルへのデータ挿入
-- =============================================================================

    -- メンバークエストステータス

        INSERT INTO child_quest_status (code) VALUES
        ('available'),
        ('assigned'),
        ('in_progress'),
        ('completed'),
        ('failed'),
        ('expired');

    -- メンバークエストステータス翻訳テーブル
        INSERT INTO child_quest_statuses_translation (child_quest_status_id, language_code, name) VALUES
        -- available（利用可能）
        (1, 1, '利用可能'),
        (1, 2, 'Available'),
        -- assigned（アサイン済み）
        (2, 1, 'アサイン済み'),
        (2, 2, 'Assigned'),
        -- in_progress（進行中）
        (3, 1, '進行中'),
        (3, 2, 'In Progress'),
        -- completed（完了）
        (4,  1, '完了'),
        (4, 2, 'Completed'),
        -- failed（失敗）
        (5, 1, '失敗'),
        (5, 2, 'Failed'),
        -- expired（期限切れ）
        (6, 1, '期限切れ'),
        (6, 2, 'Expired');

    -- 共有クエスト

        INSERT INTO shared_quests (quest_id, family_id, is_public) VALUES
        (1, 1, true),  -- 佐藤家が「部屋の片付け」クエストを共有
        (2, 2, true),  -- 田中家が「宿題をする」クエストを共有
        (3, 3, true),  -- スミス家が「お皿洗い」クエストを共有
        (4, 1, true),  -- 佐藤家が「靴を揃える」クエストを共有
        (5, 4, true);  -- 鈴木家が「洗濯物をたたむ」クエストを共有

    -- 家族クエスト

        INSERT INTO family_quests (quest_id, family_id, is_shared, shared_quest_id) VALUES
        -- 佐藤家のクエスト
        (1, 1, true, 1),   -- 部屋の片付け（自分で共有したクエスト）
        (2, 1, false, NULL), -- 宿題をする（他家族のクエストを採用）
        (3, 1, false, NULL), -- お皿洗い（他家族のクエストを採用）
        -- 田中家のクエスト
        (2, 2, true, 2),   -- 宿題をする（自分で共有したクエスト）
        (1, 2, false, NULL), -- 部屋の片付け（他家族のクエストを採用）
        (5, 2, false, NULL), -- 洗濯物をたたむ（他家族のクエストを採用）
        -- スミス家のクエスト
        (3, 3, true, 3),   -- お皿洗い（自分で共有したクエスト）
        (1, 3, false, NULL), -- 部屋の片付け（他家族のクエストを採用）
        (4, 3, false, NULL), -- 靴を揃える（他家族のクエストを採用）
        -- 鈴木家のクエスト
        (5, 4, true, 5),   -- 洗濯物をたたむ（自分で共有したクエスト）
        (2, 4, false, NULL), -- 宿題をする（他家族のクエストを採用）
        (6, 4, false, NULL);  -- 年末大掃除（オリジナルクエスト）

    -- 保存クエスト

        INSERT INTO saved_quests (quest_id, family_id) VALUES
        (1, 2), -- 田中家が佐藤家の「部屋の片付け」クエストを保存
        (1, 3), -- スミス家が佐藤家の「部屋の片付け」クエストを保存
        (1, 4), -- 鈴木家が佐藤家の「部屋の片付け」クエストを保存
        (2, 1), -- 佐藤家が田中家の「宿題をする」クエストを保存
        (2, 3), -- スミス家が田中家の「宿題をする」クエストを保存
        (2, 4), -- 鈴木家が田中家の「宿題をする」クエストを保存
        (3, 1), -- 佐藤家がスミス家の「お皿洗い」クエストを保存
        (3, 2), -- 田中家がスミス家の「お皿洗い」クエストを保存
        (4, 2), -- 田中家が佐藤家の「靴を揃える」クエストを保存
        (4, 3), -- スミス家が佐藤家の「靴を揃える」クエストを保存
        (5, 1), -- 佐藤家が鈴木家の「洗濯物をたたむ」クエストを保存
        (5, 2), -- 田中家が鈴木家の「洗濯物をたたむ」クエストを保存
        (6, 1), -- 佐藤家が鈴木家の「年末大掃除」クエストを保存
        (6, 2), -- 田中家が鈴木家の「年末大掃除」クエストを保存
        (6, 3); -- スミス家が鈴木家の「年末大掃除」クエストを保存

    -- メンバークエスト

        INSERT INTO child_quests (quest_id, child_id, current_level, status_id, published_at, achieved_at) VALUES
        -- 佐藤太郎（child_id: 1）のクエスト
        (1, 1, 1, 4, '2025-06-18 10:00:00+09', '2025-06-18 15:30:00+09'), -- 部屋の片付け（完了）
        (2, 1, 2, 3, '2025-06-19 08:00:00+09', NULL), -- 宿題をする（進行中）
        (3, 1, 1, 1, '2025-06-20 09:00:00+09', NULL), -- お皿洗い（利用可能）
        
        -- 佐藤花子（child_id: 2）のクエスト
        (1, 2, 1, 2, '2025-06-18 10:00:00+09', NULL), -- 部屋の片付け（アサイン済み）
        (4, 2, 1, 4, '2025-06-19 07:00:00+09', '2025-06-19 18:00:00+09'), -- 靴を揃える（完了）
        
        -- 田中次郎（child_id: 3）のクエスト
        (2, 3, 2, 4, '2025-06-17 08:00:00+09', '2025-06-17 20:00:00+09'), -- 宿題をする（完了）
        (1, 3, 1, 3, '2025-06-19 10:00:00+09', NULL), -- 部屋の片付け（進行中）
        (5, 3, 1, 1, '2025-06-20 08:00:00+09', NULL), -- 洗濯物をたたむ（利用可能）
        
        -- Emily Smith（child_id: 4）のクエスト
        (3, 4, 1, 4, '2025-06-18 11:00:00+09', '2025-06-18 16:00:00+09'), -- お皿洗い（完了）
        (1, 4, 1, 2, '2025-06-19 09:00:00+09', NULL), -- 部屋の片付け（アサイン済み）
        (4, 4, 1, 1, '2025-06-20 10:00:00+09', NULL), -- 靴を揃える（利用可能）
        
        -- 鈴木三郎（child_id: 5）のクエスト
        (5, 5, 2, 4, '2025-06-16 14:00:00+09', '2025-06-16 17:00:00+09'), -- 洗濯物をたたむ（完了）
        (2, 5, 2, 4, '2025-06-18 08:00:00+09', '2025-06-18 21:00:00+09'), -- 宿題をする（完了）
        (6, 5, 3, 3, '2025-06-20 08:00:00+09', NULL); -- 年末大掃除（進行中）
