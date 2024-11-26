import 'package:allowance_questboard/application/member/member_application_service.dart';
import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/infrastructure/inmemory/im_member_repository.dart';
import 'package:allowance_questboard/presentation/component/member/member_list_view.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

void main() {
  GetIt.I.registerLazySingleton<MemberRepository>(() => InMemoryMemberRepository());
  runApp(TestMemberListView());
}

// ignore: must_be_immutable
class TestMemberListView extends StatelessWidget {
  TestMemberListView({super.key}) {
    members = service.getFamilyMembers("testFamilyId");
  }

  var service = MemberApplicationService();
  late List<MemberData> members;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Member List')),
        body: MemberListView(
          members: members,
          onTap: (testFamilyId) {},
        ),
      ),
    );
  }
}
