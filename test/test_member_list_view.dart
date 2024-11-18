import 'package:allowance_questboard/application/members/member_application_service.dart';
import 'package:allowance_questboard/application/members/member_data.dart';
import 'package:allowance_questboard/domain/members/member_repository.dart';
import 'package:allowance_questboard/infrastructure/inmemory/im_member_repository.dart';
import 'package:allowance_questboard/presentation/components/members/member_list_view.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

void main() {
  GetIt.I.registerLazySingleton<MemberRepository>(() => InMemoryMemberRepository());
  runApp(MyApp());
}

// ignore: must_be_immutable
class MyApp extends StatelessWidget {
  var service = MemberApplicationService();
  late List<MemberData> members;

  MyApp({super.key}) {
    members = service.getMembersBy("familyId");
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Member List')),
        body: MemberListView(members),
      ),
    );
  }
}
