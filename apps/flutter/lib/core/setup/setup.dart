import 'package:allowance_questboard/core/setup/initializer/get_it_initializer.dart';
import 'package:allowance_questboard/core/setup/initializer/supabase_initializer.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

/// アプリケーションのセットアップを行う
Future<void> setup() async {
  await dotenv.load(fileName: ".env");
  await initSupabase();
  // LoggerProvider.initialize();
  initGetIt();
}
