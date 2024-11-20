import 'package:allowance_questboard/application/members/member_application_service.dart';
import 'package:allowance_questboard/application/members/member_data.dart';
import 'package:allowance_questboard/domain/members/member_repository.dart';
import 'package:allowance_questboard/infrastructure/inmemory/im_member_repository.dart';
import 'package:allowance_questboard/presentation/components/members/member_list_view.dart';
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
