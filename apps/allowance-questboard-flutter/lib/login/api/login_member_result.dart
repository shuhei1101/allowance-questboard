class LoginMemberResult {
  final String? memberId;

  LoginMemberResult({required this.memberId});

  factory LoginMemberResult.fromJson(Map<String, dynamic> json) {
    return LoginMemberResult(
      memberId:
          json.containsKey('memberId') ? json['memberId'] as String? : null,
    );
  }
}
