INSERT INTO auth.users (
    instance_id, 
    id, 
    aud, 
    role, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    raw_app_meta_data, 
    raw_user_meta_data, 
    is_super_admin, 
    email_change_confirm_statuses, 
    is_sso_user, 
    is_anonymous
) VALUES
-- 佐藤家（親）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    'authenticated',
    'authenticated',
    'sato@example.com',
    '$2a$10$hashedpassword001', -- ハッシュ化されたパスワード
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "佐藤太郎", "full_name": "佐藤太郎"}',
    false,
    0,
    false,
    false
),
-- 田中家（親）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440002'::uuid,
    'authenticated',
    'authenticated',
    'tanaka@example.com',
    '$2a$10$hashedpassword002',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "田中花子", "full_name": "田中花子"}',
    false,
    0,
    false,
    false
),
-- スミス家（親）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440003'::uuid,
    'authenticated',
    'authenticated',
    'smith@example.com',
    '$2a$10$hashedpassword003',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "John Smith", "full_name": "John Smith"}',
    false,
    0,
    false,
    false
),
-- 鈴木家（親）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440004'::uuid,
    'authenticated',
    'authenticated',
    'suzuki@example.com',
    '$2a$10$hashedpassword004',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "鈴木美香", "full_name": "鈴木美香"}',
    false,
    0,
    false,
    false
),
-- 佐藤家の子供1（太郎）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440005'::uuid,
    'authenticated',
    'authenticated',
    'sato.taro@example.com',
    '$2a$10$hashedpassword005',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "太郎", "full_name": "佐藤太郎"}',
    false,
    0,
    false,
    false
),
-- 佐藤家の子供2（花子）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440006'::uuid,
    'authenticated',
    'authenticated',
    'sato.hanako@example.com',
    '$2a$10$hashedpassword006',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "花子", "full_name": "佐藤花子"}',
    false,
    0,
    false,
    false
),
-- 田中家の子供（次郎）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440007'::uuid,
    'authenticated',
    'authenticated',
    'tanaka.jiro@example.com',
    '$2a$10$hashedpassword007',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "次郎", "full_name": "田中次郎"}',
    false,
    0,
    false,
    false
),
-- スミス家の子供（Emily）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440008'::uuid,
    'authenticated',
    'authenticated',
    'emily.smith@example.com',
    '$2a$10$hashedpassword008',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "Emily", "full_name": "Emily Smith"}',
    false,
    0,
    false,
    false
),
-- 鈴木家の子供（三郎）
(
    '00000000-0000-0000-0000-000000000000'::uuid,
    '550e8400-e29b-41d4-a716-446655440009'::uuid,
    'authenticated',
    'authenticated',
    'suzuki.saburo@example.com',
    '$2a$10$hashedpassword009',
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"nickname": "三郎", "full_name": "鈴木三郎"}',
    false,
    0,
    false,
    false
);
