import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state.dart';
import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state_notifier.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final editFamilyQuestStateProvider =
    StateNotifierProvider<EditFamilyQuestStateNotifier, EditFamilyQuestState>(
  (ref) => EditFamilyQuestStateNotifier(const EditFamilyQuestState()),
);
