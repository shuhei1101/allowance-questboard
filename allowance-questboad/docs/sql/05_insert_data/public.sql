-- icon_category の挿入例
INSERT INTO public.icon_category (name, sort_order, is_active)
VALUES
  ('Navigation', 1, true),
  ('User', 2, true),
  ('Social', 3, true);

-- icons の挿入例
INSERT INTO public.icons (icon_code, category_id, sort_order, is_active)
VALUES
  ('home', 1, 1, true),
  ('menu', 1, 2, true),
  ('person', 2, 1, true),
  ('group', 2, 2, true),
  ('facebook', 3, 1, true),
  ('twitter', 3, 2, true);
