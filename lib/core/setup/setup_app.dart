import 'package:allowance_questboard/core/setup/initializer/get_it_initializer.dart';
import 'package:allowance_questboard/core/setup/initializer/supabase_initializer.dart';

void setupApp() async {
  await initSupabase();
  initGetIt();
}
