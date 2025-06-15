import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_update_data.dart';
import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state.dart';
import 'package:allowance_questboard/presentation/quest/state/value_object/quest_title_state.dart';
import 'package:get_it/get_it.dart' show GetIt;
import 'package:state_notifier/state_notifier.dart';

class EditFamilyQuestStateNotifier extends StateNotifier<EditFamilyQuestState> {
  final FamilyQuestApplicationService _service = GetIt.I<FamilyQuestApplicationService>();

  EditFamilyQuestStateNotifier(super.state);

  void initializeWithQuest(FamilyQuestUpdateData quest) {
    state = state.copyWith(
      questTitleState: QuestTitleState.fromInput(quest.title),
    );
    _updateIsValid();
  }

  void updateQuestTitle({required String title}) {
    state = state.copyWith(questTitleState: QuestTitleState.fromInput(title));
    _updateIsValid();
  }

  void _updateIsValid() {
    final isValid = state.questTitleState.isValid;
    state = state.copyWith(isValid: isValid);
  }

  Future<FamilyQuestUpdateData?> getEditFamilyQuestData(String questId) async {
    final quest = await _service.getEditFamilyQuestData(questId);
    if (quest != null) {
      initializeWithQuest(quest);
    }
    return quest;
  }
}
