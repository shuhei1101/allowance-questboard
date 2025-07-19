import 'package:flutter/material.dart';

// メイン関数を追加してモックアップを直接実行可能にする
void main() {
  runApp(const QuestListMockupApp());
}

class QuestListMockupApp extends StatelessWidget {
  const QuestListMockupApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'クエスト一覧モックアップ',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'NotoSansJP',
      ),
      home: const QuestListMockup(),
      debugShowCheckedModeBanner: false,
    );
  }
}

/// クエスト一覧画面のモックアップ
/// 画像のデザインを再現したUIデモ
class QuestListMockup extends StatefulWidget {
  const QuestListMockup({super.key});

  @override
  State<QuestListMockup> createState() => _QuestListMockupState();
}

class _QuestListMockupState extends State<QuestListMockup>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      appBar: AppBar(
        backgroundColor: const Color(0xFF87CEEB),
        elevation: 0,
        title: const Text(
          'クエスト一覧',
          style: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.swap_vert, color: Colors.white),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.settings, color: Colors.white),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // タブバー
          Container(
            color: Colors.white,
            child:            TabBar(
              controller: _tabController,
              tabs: const [
                Tab(text: '家'),
                Tab(text: '身だしなみ'),
                Tab(text: '学習'),
              ],
              labelColor: Colors.black,
              unselectedLabelColor: Colors.grey,
              indicatorColor: const Color(0xFF87CEEB),
            ),
          ),
          
          // 検索バー
          Container(
            color: Colors.white,
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                const Text(
                  'クエスト名',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                const SizedBox(width: 8),
                const Icon(Icons.arrow_drop_down),
                const SizedBox(width: 16),
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey.shade300),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const TextField(
                      decoration: InputDecoration(
                        hintText: '検索ワードを入力してください',
                        prefixIcon: Icon(Icons.search, color: Colors.grey),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // クエストリスト
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildQuestCard(
                  title: '晩ごはんを作ろう',
                  icon: Icons.restaurant,
                  isPublic: true,
                  participants: 2,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '部屋の片付け',
                  icon: Icons.cleaning_services,
                  isPublic: false,
                  participants: 1,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '洗濯物を畳む',
                  icon: Icons.local_laundry_service,
                  isPublic: true,
                  participants: 1,
                  hasGlobeIcon: false,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: 'お風呂掃除',
                  icon: Icons.bathtub,
                  isPublic: false,
                  participants: 0,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '宿題をやる',
                  icon: Icons.school,
                  isPublic: true,
                  participants: 3,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '歯を磨く',
                  icon: Icons.face,
                  isPublic: false,
                  participants: 2,
                  hasGlobeIcon: false,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: 'ごみ出し',
                  icon: Icons.delete_outline,
                  isPublic: true,
                  participants: 1,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '読書をする',
                  icon: Icons.menu_book,
                  isPublic: false,
                  participants: 2,
                  hasGlobeIcon: false,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '玄関の掃除',
                  icon: Icons.door_front_door,
                  isPublic: true,
                  participants: 1,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '植物に水やり',
                  icon: Icons.local_florist,
                  isPublic: false,
                  participants: 1,
                  hasGlobeIcon: false,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '買い物リスト作成',
                  icon: Icons.shopping_cart,
                  isPublic: true,
                  participants: 2,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: 'ペットの世話',
                  icon: Icons.pets,
                  isPublic: false,
                  participants: 3,
                  hasGlobeIcon: false,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '窓拭き',
                  icon: Icons.window,
                  isPublic: true,
                  participants: 1,
                  hasGlobeIcon: true,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: '靴を揃える',
                  icon: Icons.work_outline,
                  isPublic: false,
                  participants: 2,
                  hasGlobeIcon: false,
                ),
                const SizedBox(height: 16),
                _buildQuestCard(
                  title: 'お手伝いの練習',
                  icon: Icons.volunteer_activism,
                  isPublic: true,
                  participants: 1,
                  hasGlobeIcon: true,
                ),
              ],
            ),
          ),
          
          // ボードの切り替えボタン
          Container(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF87CEEB),
                    borderRadius: BorderRadius.circular(25),
                  ),
                  child: const Text(
                    'ボードの切り替え',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Container(
                  width: 56,
                  height: 56,
                  decoration: const BoxDecoration(
                    color: Color(0xFFFFD700),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.add,
                    color: Colors.white,
                    size: 32,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF87CEEB),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_bag),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.language),
            label: '',
          ),
        ],
      ),
    );
  }

  Widget _buildQuestCard({
    required String title,
    required IconData icon,
    required bool isPublic,
    required int participants,
    required bool hasGlobeIcon,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 5,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              Icon(icon, size: 32),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              if (isPublic)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.red, width: 2),
                  ),
                  child: const Text(
                    '公開中',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  _buildParticipantIcon(true),
                  const SizedBox(width: 8),
                  _buildParticipantIcon(participants > 1),
                ],
              ),
              if (hasGlobeIcon)
                const Icon(
                  Icons.language,
                  color: Color(0xFF87CEEB),
                  size: 24,
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildParticipantIcon(bool isActive) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: isActive ? const Color(0xFF87CEEB) : Colors.grey.shade300,
        shape: BoxShape.circle,
      ),
      child: Icon(
        Icons.person,
        color: isActive ? Colors.white : Colors.grey,
        size: 20,
      ),
    );
  }
}
