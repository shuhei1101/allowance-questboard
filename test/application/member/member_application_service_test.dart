// MemberApplicationServiceのユニットテスト

import 'package:allowance_questboard/application/member/member_application_service.dart';
import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/member/value_object/education.dart';
import 'package:allowance_questboard/domain/model/member/value_object/grade.dart';
import 'package:allowance_questboard/domain/model/member/member.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_exp.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_name.dart';
import 'package:allowance_questboard/domain/repository/member/member_repository.dart';
import 'package:allowance_questboard/domain/model/shared/birthday.dart';
import 'package:allowance_questboard/domain/model/shared/money.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'member_application_service_test.mocks.dart';

@GenerateMocks([MemberRepository])
void main() {
  late MockMemberRepository mockMemberRepository;

  setUp(() {
    GetIt.I.reset();
    mockMemberRepository = MockMemberRepository();
  });

  group('getMember', () {
    /// 指定メンバーが存在する場合にメンバー情報を取得するか確認
    test('when nomal case', () async {
      const memberId = '1';
      final member = Member(
        id: MemberId(memberId),
        familyId: FamilyId(memberId),
        name: MemberName('name'),
        icon: Icon(Icons.person),
        birthday: Birthday(DateTime.now()),
        grade: Grade(education: Education.middleSchool, grade: 1),
        exp: MemberExp(1),
        balance: Money(1000),
        minSavings: Money(100),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      );
      when(mockMemberRepository.find(any)).thenAnswer((_) async => member);
      GetIt.I.registerSingleton<MemberRepository>(mockMemberRepository);
      final service = MemberApplicationService();
      // テスト対象のメソッドを実行
      final result = await service.getMember(memberId: memberId);
      // 期待値と実測値を比較
      expect(result, isNotNull);
      expect(result!.id, memberId);
      verify(mockMemberRepository.find(any)).called(1);
    });

    /// 指定メンバーが存在しない場合にnullを返すか確認
    test('when member is not found', () async {
      const memberId = '1';
      when(mockMemberRepository.find(any)).thenAnswer((_) async => null);
      GetIt.I.registerSingleton<MemberRepository>(mockMemberRepository);
      final service = MemberApplicationService();
      final result = await service.getMember(memberId: memberId);
      expect(result, isNull);
      verify(mockMemberRepository.find(any)).called(1);
    });
  });
}
