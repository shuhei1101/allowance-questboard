-- アプリケーションログテーブル
CREATE TABLE IF NOT EXISTS app_logs (
    id BIGSERIAL PRIMARY KEY,
    level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    device_info JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックスを作成（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS idx_app_logs_level ON app_logs(level);
CREATE INDEX IF NOT EXISTS idx_app_logs_timestamp ON app_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_app_logs_created_at ON app_logs(created_at);

-- 古いログを自動削除するための関数（オプション）
-- 30日以上古いログを削除
CREATE OR REPLACE FUNCTION delete_old_logs()
RETURNS void AS $$
BEGIN
    DELETE FROM app_logs 
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- 定期実行のためのコメント（手動で設定が必要）
-- SELECT cron.schedule('delete-old-logs', '0 2 * * *', 'SELECT delete_old_logs();');
