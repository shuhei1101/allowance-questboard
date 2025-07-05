import 'package:allowance_questboard/core/setup/initializer/get_it_initializer.dart';
import 'package:allowance_questboard/core/setup/initializer/supabase_initializer.dart';

Future<void> setupApp() async {
  await initSupabase();
  // LoggerProvider.initialize();
  initGetIt();
}
