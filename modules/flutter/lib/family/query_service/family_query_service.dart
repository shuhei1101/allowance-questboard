import 'package:supabase_flutter/supabase_flutter.dart';

/// 家族情報に関するクエリサービス
class FamilyQueryService {
  final SupabaseClient _supabase = Supabase.instance.client;

  /// user_idから家族IDを取得する
  Future<int?> fetchFamilyId(String userId) async {
    final response =
        await _supabase.from('families').select('id').eq('user_id', userId).maybeSingle();
    if (response != null) {
      return response['id'] as int?;
    }
    return null;
  }
}
