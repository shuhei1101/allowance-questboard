import 'package:flutter/material.dart';

class QuestLevelsIcon extends StatelessWidget {
  QuestLevelsIcon({required this.maxLevel, required this.currentLevel, required this.delegate});
  final int maxLevel;
  final int currentLevel;
  final QuestLevelsIconDelegate delegate;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        for (int i = 1; i <= currentLevel; i++) IconButton(icon: Icon(Icons.star), onPressed: () => delegate.toLevel(i)),
        for (int i = currentLevel + 1; i <= maxLevel; i++) IconButton(icon: Icon(Icons.star_border), onPressed: () => delegate.toLevel(i)),
      ],
    );
  }
}

abstract interface class QuestLevelsIconDelegate {
  void toLevel(int level);
}
