import 'package:flutter/material.dart';

class ProfilePropertyCard extends StatelessWidget {
  ProfilePropertyCard({required this.color, required this.title, required this.body});

  final Color color;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Card(
          color: color,
          child: Text(title),
        ),
        SizedBox(height: 20),
        Card(
          child: Text(body),
        ),
      ],
    );
  }
}
