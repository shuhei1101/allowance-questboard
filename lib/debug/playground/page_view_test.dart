import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: PageViewWithButtons(),
    );
  }
}

class PageViewWithButtons extends StatefulWidget {
  @override
  _PageViewWithButtonsState createState() => _PageViewWithButtonsState();
}

class _PageViewWithButtonsState extends State<PageViewWithButtons> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  void _goToPage(int page) {
    if (page >= 0 && page <= 2) {
      // ページ数を制限
      _pageController.animateToPage(
        page,
        duration: Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
      // setState(() {
      //   _currentPage = page;
      // });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          PageView(
            controller: _pageController,
            onPageChanged: (page) {
              // setState(() {
              //   _currentPage = page;
              // });
            },
            children: [
              Container(color: Colors.red, child: Center(child: Text('Page 1'))),
              Container(color: Colors.green, child: Center(child: Text('Page 2'))),
              Container(color: Colors.blue, child: Center(child: Text('Page 3'))),
            ],
          ),
          Positioned(
            left: 10,
            top: MediaQuery.of(context).size.height / 2 - 30,
            child: IconButton(
              onPressed: () => _goToPage(_currentPage - 1), // 前のページ
              icon: Icon(Icons.arrow_back, color: Colors.white),
            ),
          ),
          Positioned(
            right: 10,
            top: MediaQuery.of(context).size.height / 2 - 30,
            child: IconButton(
              onPressed: () => _goToPage(_currentPage + 1), // 次のページ
              icon: Icon(Icons.arrow_forward, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
