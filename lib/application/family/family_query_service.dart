import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// 家族情報取得のためのクエリサービス
class FamilyQueryService {
  /// ユーザーIDから家族IDを取得
  Future<FamilyId?> getFamilyId(String userId) async {
    try {
      final response = await Supabase.instance.client
          .from('families')
          .select('id')
          .eq('user_id', userId)
          .single();

      if (response.isEmpty) {
        return null;
      }

      return FamilyId(response['id'] as String);
    } catch (e) {
      // PostgreSQL error handling
      if (e.toString().contains('No rows found')) {
        return null;
      }
      rethrow;
    }
  }
}