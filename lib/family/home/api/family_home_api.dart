// import 'dart:convert';

// import 'package:allowance_questboard/shared/api/app_api.dart';

// class FamilyHomeApi extends AppApi {
//   final FamilyFactory familyFactory;
//   final MemberFactory memberFactory;
//   final QuestFactory questFactory;

//   FamilyHomeApi({
//     required this.familyFactory,
//     required this.memberFactory,
//     required this.questFactory,
//   });

//   Future<FamilyHomeModel> fetchFamilyHomeData(String userId) async {
//     final response = await client.get('/family-home?userId=$userId');
//     final json = jsonDecode(response.body) as Map<String, dynamic>;

//     final families = familyFactory.fromFamilyHomeJson(json);
//     final members = memberFactory.fromFamilyHomeJson(json);
//     final quests = questFactory.fromFamilyHomeJson(json);

//     return FamilyHomeModel(
//       families: families,
//       members: members,
//       quests: quests,
//     );
//   }
// }
