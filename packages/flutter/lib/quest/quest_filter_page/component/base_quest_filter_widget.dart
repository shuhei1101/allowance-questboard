import 'package:allowance_questboard/core/page/component/base_component.dart';
import 'package:allowance_questboard/quest/quest_filter_page/component/quest_type.dart' show QuestType;
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

abstract class BaseFilterQuestWidget<T extends Widget> extends BaseComponent {
  final QuestType questType;
  final T family;
  final T child;
  final T online;
  final T template;

  const BaseFilterQuestWidget({super.key, 
    required this.questType,
    required this.family,
    required this.child,
    required this.online,
    required this.template,
  });

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    switch (questType) {
      case QuestType.family:
        return family;
      case QuestType.child:
        return child;
      case QuestType.online:
        return online;
      case QuestType.template:
        return template;
    }
  }
}
