-- 履歴更新関数作成
CREATE OR REPLACE FUNCTION capture_family_snapshot()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO history.families (
    family_id,
    user_id,
    name,
    bio,
    created_at,
    recorded_at
  ) VALUES (
    OLD.id,
    OLD.user_id,
    OLD.name,
    OLD.bio,
    OLD.created_at,
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- 日付更新関数作成
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;
