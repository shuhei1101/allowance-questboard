import 'package:allowance_questboard/shared/constants/supabase_info.dart';

class ApiEndpoints {
  // バックエンドのAPIベースURL(商用はSupabaseUrlと同一)
  static final String baseUrl = "${SupabaseInfo.supabaseUrl}/functions/v1";
  static const String family = 'family';
  static const String families = 'families';
  static const String member = 'member';
  static const String members = 'members';
  static const String quest = 'quest';
  static const String quests = 'quests';
}
