-- allowanceable_types
CREATE TABLE IF NOT EXISTS allowanceable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- family, child, quest, comment
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE allowanceable_types IS 'お小遣いの種類を管理するテーブル';
COMMENT ON COLUMN allowanceable_types.id IS 'お小遣い種類ID（主キー）';
COMMENT ON COLUMN allowanceable_types.type IS 'お小遣いの種類コード（family, child, quest, comment等）';
COMMENT ON COLUMN allowanceable_types.description IS 'お小遣い種類の説明';
COMMENT ON COLUMN allowanceable_types.created_at IS '作成日時';
COMMENT ON COLUMN allowanceable_types.updated_at IS '更新日時';
