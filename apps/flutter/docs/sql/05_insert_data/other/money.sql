-- 通貨マスタテーブルのテストデータ
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

-- 為替レートテーブルのテストデータ（JPYを基準）
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
