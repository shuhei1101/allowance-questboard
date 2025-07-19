import 'package:flutter_dotenv/flutter_dotenv.dart';

class SupabaseInfo {
  String get url => dotenv.env['SUPABASE_URL'] ?? "";
  String get anonKey => dotenv.env['SUPABASE_ANON_KEY'] ?? "";
}

final supabaseInfo = SupabaseInfo();
