import 'package:allowance_questboard/shared/constants/supabase_info.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseInitializer {
  Future<void> initialize() async {
    await Supabase.initialize(
      url: SupabaseInfo.supabaseUrl,
      anonKey: SupabaseInfo.supabaseAnonKey,
    );
  }
}
