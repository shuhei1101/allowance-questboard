import 'package:supabase_flutter/supabase_flutter.dart';

/// メンバー情報に関するクエリサービス
class MemberQueryService {
  final SupabaseClient _supabase = Supabase.instance.client;

  /// user_idからメンバーIDを取得する
  Future<int?> fetchMemberId(String userId) async {
    try {
      final response =
          await _supabase.from('members').select('id').eq('user_id', userId).maybeSingle();

      if (response != null) {
        return response['id'] as int?;
      }
      return null;
    } catch (e) {
      throw Exception('member IDの取得に失敗: $e');
    }
  }

  /// member_idからfamily_idを取得する
  Future<int?> getFamilyIdByMemberId(int memberId) async {
    try {
      final response =
          await _supabase.from('members').select('family_id').eq('id', memberId).maybeSingle();

      if (response != null) {
        return response['family_id'] as int?;
      }
      return null;
    } catch (e) {
      throw Exception('member IDからfamily IDの取得に失敗: $e');
    }
  }
}
