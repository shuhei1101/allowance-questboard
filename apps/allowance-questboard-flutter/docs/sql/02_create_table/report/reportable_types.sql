-- レポート対象タイプテーブル
CREATE TABLE IF NOT EXISTS reportable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- family, child, quest, comment
    description text NOT NULL CHECK (length(description) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE reportable_types IS 'レポート対象となるオブジェクトのタイプを管理するマスタテーブル';
COMMENT ON COLUMN reportable_types.id IS 'レポート対象タイプID（主キー）';
COMMENT ON COLUMN reportable_types.type IS 'レポート対象タイプコード（family, child, quest, comment等）';
COMMENT ON COLUMN reportable_types.description IS 'レポート対象タイプの説明（空文字不可）';
COMMENT ON COLUMN reportable_types.created_at IS '作成日時';
COMMENT ON COLUMN reportable_types.updated_at IS '更新日時';
