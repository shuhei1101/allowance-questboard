class LoginResponse {
  final int? parentId;
  final int? memberId;
  final int? familyId;
  final int? familyMemberId;

  LoginResponse({this.parentId, this.memberId, this.familyId, this.familyMemberId});

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      parentId: json.containsKey('parentId') ? json['parentId'] as int? : null,
      memberId: json.containsKey('memberId') ? json['memberId'] as int? : null,
      familyId: json.containsKey('familyId') ? json['familyId'] as int? : null,
      familyMemberId: json.containsKey('familyMemberId') ? json['familyMemberId'] as int? : null,
    );
  }
}
