import 'package:allowance_questboard/application/member/member_application_service.dart';
import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/infrastructure/inmemory/im_member_repository.dart';
import 'package:allowance_questboard/presentation/component/member/member_profile_screen.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

void main() {
  GetIt.I.registerLazySingleton<MemberRepository>(() => InMemoryMemberRepository());
  runApp(TestMemberProfileScreen());
}

// ignore: must_be_immutable
class TestMemberProfileScreen extends StatelessWidget {
  TestMemberProfileScreen({super.key}) {
    member = service.getMember("test");
  }

  var service = MemberApplicationService();
  late MemberData member;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Member List')),
        body: MemberProfileScreen(member),
      ),
    );
  }
}
