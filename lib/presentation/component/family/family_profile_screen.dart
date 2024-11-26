import 'package:flutter/material.dart';

import '../../../application/family/family_data.dart';

class FamilyProfileScreen extends StatelessWidget {
  FamilyProfileScreen({required this.family});

  final FamilyData family;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(family.id),
        Text(family.name),
        Text(family.introduction),
      ],
    );
  }
}
