import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  String? _userId;
  String? _familyId;
  String? _memberId;

  String? get userId => _userId;
  String? get familyId => _familyId;
  String? get memberId => _memberId;

  void setUserInfo(
      {required String userId, String? familyId, String? memberId}) {
    _userId = userId;
    _familyId = familyId;
    _memberId = memberId;
    notifyListeners();
  }

  void logout() {
    _userId = null;
    _familyId = null;
    _memberId = null;
    notifyListeners();
  }
}
