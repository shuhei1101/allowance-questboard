-- families
INSERT INTO families (
  user_id, icon_code, created_at, updated_at
) VALUES (
  '4c0a0b33-11b2-4c2d-a1c5-e071b8bb4120', -- user_id (uuid 1 を仮置き)
  'home', -- icon_code
  now(),
  now()
);

-- families_settings
INSERT INTO families_settings (
  family_id, currency_code, updated_at
) VALUES (
  1, -- family_id
  'JPY', -- currency_code
  now()
);

-- families_translations
INSERT INTO families_translations (
  id, family_id, languages_code, name, bio
) VALUES (
  1,
  1, -- family_id
  'ja', -- languages_code
  'Test Family',
  'Test bio for family'
);
