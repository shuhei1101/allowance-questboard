import 'package:flutter/foundation.dart';
import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';

/// 認証情報を保持するProvider
class AuthProvider extends ChangeNotifier {
  AuthProvider();

  String? _userId;
  FamilyId? _familyId;
  MemberId? _memberId;
  bool _isAuthenticated = false;

  /// ユーザーID
  String? get userId => _userId;

  /// 家族ID
  FamilyId? get familyId => _familyId;

  /// メンバーID
  MemberId? get memberId => _memberId;

  /// 認証済みかどうか
  bool get isAuthenticated => _isAuthenticated;

  /// 家族ユーザーかどうか
  bool get isFamilyUser => _familyId != null;

  /// メンバーユーザーかどうか
  bool get isMemberUser => _memberId != null;

  /// ユーザー情報を設定（認証時）
  void setUserInfo(String userId) {
    _userId = userId;
    _isAuthenticated = true;
    notifyListeners();
  }

  /// 家族IDを設定
  void setFamilyId(FamilyId familyId) {
    _familyId = familyId;
    _memberId = null; // 家族IDが設定されたらメンバーIDをクリア
    notifyListeners();
  }

  /// メンバーIDを設定
  void setMemberId(MemberId memberId) {
    _memberId = memberId;
    _familyId = null; // メンバーIDが設定されたら家族IDをクリア
    notifyListeners();
  }

  /// ログアウト
  void logout() {
    _userId = null;
    _familyId = null;
    _memberId = null;
    _isAuthenticated = false;
    notifyListeners();
  }

  /// 認証情報をクリア
  void clear() {
    logout();
  }
}