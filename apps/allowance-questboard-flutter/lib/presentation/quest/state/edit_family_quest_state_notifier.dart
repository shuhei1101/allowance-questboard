import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/update_family_quest_response.dart';
import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state.dart';
import 'package:allowance_questboard/presentation/quest/state/value_object/quest_title_state.dart';
import 'package:get_it/get_it.dart' show GetIt;
import 'package:state_notifier/state_notifier.dart';

class EditFamilyQuestStateNotifier extends StateNotifier<EditFamilyQuestState> {
  final FamilyQuestApplicationService _service =
      GetIt.I<FamilyQuestApplicationService>();

  EditFamilyQuestStateNotifier(super.state);

  void initializeWithQuest(UpdateFamilyQuestResponse quest) {
    state = state.copyWith(
      questTitleState: QuestTitleState(quest.title),
    );
    _updateIsValid();
  }

  void updateQuestTitle({required String title}) {
    state = state.copyWith(questTitleState: QuestTitleState(title));
    _updateIsValid();
  }

  void _updateIsValid() {
    final isValid = state.questTitleState!.isValid;
    state = state.copyWith(isValid: isValid);
  }

  Future<UpdateFamilyQuestResponse?> getEditFamilyQuestData(
      String questId) async {
    final questResponse = await _service.getEditFamilyQuestData(questId);
    if (questResponse != null) {
      initializeWithQuest(questResponse);
    }
    return questResponse;
  }
}
