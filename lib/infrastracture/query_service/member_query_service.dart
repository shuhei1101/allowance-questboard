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
}