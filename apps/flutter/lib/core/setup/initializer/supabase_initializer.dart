import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> initSupabase() async {
  await Supabase.initialize(
    url: SupabaseInfo.supabaseUrl,
    anonKey: SupabaseInfo.supabaseAnonKey,
  );
}
