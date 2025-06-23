import 'package:flutter/foundation.dart';

/// 認証状態を管理するProvider
class AuthProvider extends ChangeNotifier {
  String? _userId;
  String? _familyId;
  String? _memberId;
  bool _isAuthenticated = false;

  /// ログイン中のユーザーID
  String? get userId => _userId;
  
  /// ログイン中のユーザーが所属する家族ID（家族としてログインした場合）
  String? get familyId => _familyId;
  
  /// ログイン中のユーザーのメンバーID（メンバーとしてログインした場合）
  String? get memberId => _memberId;
  
  /// 認証状態
  bool get isAuthenticated => _isAuthenticated;
  
  /// ログイン種別（家族またはメンバー）
  bool get isFamilyLogin => _familyId != null;
  bool get isMemberLogin => _memberId != null;

  /// ユーザー情報を設定（ログイン時）
  void setUserInfo({
    required String userId,
    String? familyId,
    String? memberId,
  }) {
    _userId = userId;
    _familyId = familyId;
    _memberId = memberId;
    _isAuthenticated = true;
    notifyListeners();
  }

  /// ログアウト
  void signOut() {
    _userId = null;
    _familyId = null;
    _memberId = null;
    _isAuthenticated = false;
    notifyListeners();
  }
}