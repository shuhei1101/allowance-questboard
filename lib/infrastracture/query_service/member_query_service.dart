import 'package:supabase_flutter/supabase_flutter.dart';

/// メンバー情報に関するクエリサービス
class MemberQueryService {
  final SupabaseClient _supabase = Supabase.instance.client;

  /// user_idからメンバーIDを取得する
  Future<String?> getMemberId(String userId) async {
    try {
      final response = await _supabase
          .from('members')
          .select('id')
          .eq('user_id', userId)
          .maybeSingle();
      
      if (response != null) {
        return response['id'] as String?;
      }
      return null;
    } catch (e) {
      throw Exception('Failed to get member ID: $e');
    }
  }

  /// member_idからfamily_idを取得する
  Future<String?> getFamilyIdByMemberId(String memberId) async {
    try {
      final response = await _supabase
          .from('members')
          .select('family_id')
          .eq('id', memberId)
          .maybeSingle();
      
      if (response != null) {
        return response['family_id'] as String?;
      }
      return null;
    } catch (e) {
      throw Exception('Failed to get family ID by member ID: $e');
    }
  }
}