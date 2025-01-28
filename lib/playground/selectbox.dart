import 'package:flutter/material.dart';

void main() {
  runApp(const SelectBoxExample());
}

class SelectBoxExample extends StatefulWidget {
  const SelectBoxExample({super.key});

  @override
  State<SelectBoxExample> createState() => _SelectBoxExampleState();
}

class _SelectBoxExampleState extends State<SelectBoxExample> {
  String? _selectedValue = '選択1'; // 初期選択値

  // 選択肢のリスト
  final List<String> _items = [
    '選択1',
    '選択2',
    '選択3',
    '選択4',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('セレクトボックスの例'),
      ),
      body: Center(
        child: DropdownButton<String>(
          value: _selectedValue,
          items: _items.map((String value) {
            return DropdownMenuItem<String>(
              value: value,
              child: Text(value),
            );
          }).toList(),
          onChanged: (String? newValue) {
            setState(() {
              _selectedValue = newValue;
            });
          },
        ),
      ),
    );
  }
}
