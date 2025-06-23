import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// メンバー情報取得のためのクエリサービス
class MemberQueryService {
  /// ユーザーIDからメンバーIDを取得
  Future<MemberId?> getMemberId(String userId) async {
    try {
      final response = await Supabase.instance.client
          .from('members')
          .select('id')
          .eq('user_id', userId)
          .single();

      if (response.isEmpty) {
        return null;
      }

      return MemberId(response['id'] as String);
    } catch (e) {
      // PostgreSQL error handling
      if (e.toString().contains('No rows found')) {
        return null;
      }
      rethrow;
    }
  }
}