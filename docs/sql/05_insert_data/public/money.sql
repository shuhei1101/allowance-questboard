INSERT INTO public.currencies
(code, name, symbol, is_active, sort_order) 
VALUES
('JPY', 'Japanese Yen', '¥', true, 1),
('USD', 'US Dollar', '$', true, 2);

INSERT INTO public.exchange_rates 
(base_currency, target_currency, rate) 
VALUES
('USD', 'JPY', 140.0);
