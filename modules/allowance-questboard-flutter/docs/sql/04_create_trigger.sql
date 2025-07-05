-- =====更新日トリガー=====
-- メンバー
CREATE TRIGGER trigger_set_updated_at_child
BEFORE UPDATE ON child.families
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- アイコン関連
CREATE TRIGGER trigger_set_updated_at_icon_categories
BEFORE UPDATE ON icon_categories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_icons
BEFORE UPDATE ON icons
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();





-- =====履歴トリガー=====
CREATE TRIGGER trigger_capture_family_snapshot
BEFORE DELETE OR UPDATE ON child.families
FOR EACH ROW
EXECUTE FUNCTION capture_family_snapshot();
