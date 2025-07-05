import 'package:allowance_questboard/core/constants/supabase_info.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> initSupabase() async {
  await Supabase.initialize(
    url: SupabaseInfo.supabaseUrl,
    anonKey: SupabaseInfo.supabaseAnonKey,
  );
}
