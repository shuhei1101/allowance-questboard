-- =====更新日トリガー=====
-- メンバー
CREATE TRIGGER trigger_set_updated_at_member
BEFORE UPDATE ON member.families
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- アイコン関連
CREATE TRIGGER trigger_set_updated_at_icon_category
BEFORE UPDATE ON public.icon_category
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_set_updated_at_icons
BEFORE UPDATE ON public.icons
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();





-- =====履歴トリガー=====
CREATE TRIGGER trigger_capture_family_snapshot
BEFORE DELETE OR UPDATE ON member.families
FOR EACH ROW
EXECUTE FUNCTION public.capture_family_snapshot();
