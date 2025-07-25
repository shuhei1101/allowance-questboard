import 'package:allowance_questboard/core/constants/supabase_config.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> initSupabase() async {
  await Supabase.initialize(
    url: supabaseInfo.url,
    anonKey: supabaseInfo.anonKey,
  );
}
