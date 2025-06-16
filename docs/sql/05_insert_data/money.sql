INSERT INTO public.currences (code, name, symbol, is_active, sort_order)
VALUES
    ('JPY', 'Japanese Yen', '¥', true, 0),
    ('USD', 'United States Dollar', '$', true, 1),
    ('EUR', 'Euro', '€', true, 2),
    ('GBP', 'British Pound Sterling', '£', true, 3),
    ('AUD', 'Australian Dollar', 'A$', true, 4),
    ('CAD', 'Canadian Dollar', 'C$', true, 5),
    ('CHF', 'Swiss Franc', 'CHF', true, 6),
    ('CNY', 'Chinese Yuan Renminbi', '¥', true, 7),
    ('INR', 'Indian Rupee', '₹', true, 8),
    ('RUB', 'Russian Ruble', '₽', true, 9);

INSERT INTO public.exchange_rates (base_currency_code, target_currency_code, rate, effective_date)
VALUES
    ('USD', 'USD', 1.000000),
    ('USD', 'JPY', 155.300000),
    ('USD', 'EUR', 0.920000),
    ('USD', 'GBP', 0.790000),
    ('USD', 'AUD', 1.480000),
    ('USD', 'CAD', 1.360000),
    ('USD', 'CHF', 0.900000),
    ('USD', 'CNY', 7.100000),
    ('USD', 'INR', 83.000000),
    ('USD', 'RUB', 92.000000);
