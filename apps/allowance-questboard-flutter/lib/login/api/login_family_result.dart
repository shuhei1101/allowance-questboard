class LoginFamilyResult {
  final String? familyId;

  LoginFamilyResult({required this.familyId});

  factory LoginFamilyResult.fromJson(Map<String, dynamic> json) {
    return LoginFamilyResult(
      familyId:
          json.containsKey('familyId') ? json['familyId'] as String? : null,
    );
  }
}
