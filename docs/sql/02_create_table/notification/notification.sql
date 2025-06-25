-- 通知テーブル
CREATE TABLE IF NOT EXISTS notifications (
    id serial PRIMARY KEY,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or child_id)
    notifiable_type int NOT NULL REFERENCES notifiable_types (id) ON DELETE RESTRICT,
    notifiable_id int NOT NULL,
    push_to int REFERENCES screens (id) ON DELETE SET NULL,
    is_read boolean NOT NULL DEFAULT false,
    read_at timestamptz DEFAULT NULL,
    received_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (
        (is_read = false AND read_at IS NULL) OR 
        (is_read = true AND read_at IS NOT NULL)
    )
);

COMMENT ON TABLE notifications IS 'ユーザへの通知を管理するテーブル';
COMMENT ON COLUMN notifications.id IS '通知ID（主キー）';
COMMENT ON COLUMN notifications.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN notifications.user_id IS 'ユーザID（ポリモーフィック：family_id または child_id）';
COMMENT ON COLUMN notifications.notifiable_type IS '通知対象タイプID（外部キー）';
COMMENT ON COLUMN notifications.notifiable_id IS '通知対象ID（ポリモーフィック）';
COMMENT ON COLUMN notifications.push_to IS '遷移先スクリーンID（外部キー、NULL許可）';
COMMENT ON COLUMN notifications.is_read IS '既読フラグ';
COMMENT ON COLUMN notifications.read_at IS '既読日時（未読の場合はNULL）';
COMMENT ON COLUMN notifications.received_at IS '通知受信日時';
COMMENT ON COLUMN notifications.created_at IS '作成日時';
COMMENT ON COLUMN notifications.updated_at IS '更新日時';

-- 通知テーブルのインデックス
CREATE INDEX idx_notifications_user ON notifications (user_type, user_id);
CREATE INDEX idx_notifications_unread ON notifications (user_type, user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_received_at ON notifications (received_at DESC);
CREATE INDEX idx_notifications_notifiable ON notifications (notifiable_type, notifiable_id);

-- 通知履歴テーブル
CREATE TABLE IF NOT EXISTS history.notifications (
    id serial PRIMARY KEY,
    notification_id int NOT NULL REFERENCES notifications (id) ON DELETE CASCADE,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,
    notifiable_type int NOT NULL REFERENCES notifiable_types (id) ON DELETE RESTRICT,
    notifiable_id int NOT NULL,
    push_to int REFERENCES screens (id) ON DELETE SET NULL,
    is_read boolean NOT NULL DEFAULT false,
    read_at timestamptz DEFAULT NULL,
    received_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.notifications IS '通知の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.notifications.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.notifications.notification_id IS '元の通知ID（外部キー）';
COMMENT ON COLUMN history.notifications.user_type IS 'ユーザタイプID（履歴時点）';
COMMENT ON COLUMN history.notifications.user_id IS 'ユーザID（履歴時点）';
COMMENT ON COLUMN history.notifications.notifiable_type IS '通知対象タイプID（履歴時点）';
COMMENT ON COLUMN history.notifications.notifiable_id IS '通知対象ID（履歴時点）';
COMMENT ON COLUMN history.notifications.push_to IS '遷移先スクリーンID（履歴時点）';
COMMENT ON COLUMN history.notifications.is_read IS '既読フラグ（履歴時点）';
COMMENT ON COLUMN history.notifications.read_at IS '既読日時（履歴時点）';
COMMENT ON COLUMN history.notifications.received_at IS '通知受信日時（履歴時点）';
COMMENT ON COLUMN history.notifications.created_at IS '元作成日時';
COMMENT ON COLUMN history.notifications.updated_at IS '元更新日時';
COMMENT ON COLUMN history.notifications.recorded_at IS '履歴記録日時';
