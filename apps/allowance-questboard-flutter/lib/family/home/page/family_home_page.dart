import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class FamilyHomePage extends HookConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedIndex = useState(0);

    // タブごとの中身は仮でContainerなど空にしておく
    final pages = <Widget>[
      const Center(child: Text('クエストタブ（未実装）')),
      const Center(child: Text('ホームタブ（未実装）')),
      const Center(child: Text('通知タブ（未実装）')),
    ];

    return Scaffold(
      body: pages[selectedIndex.value],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex.value,
        onTap: (index) => selectedIndex.value = index,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'ホーム'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: '検索'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: '設定'),
        ],
      ),
    );
  }
}
