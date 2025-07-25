import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/l10n/l10n_provider.dart' show l10n;
import 'component/family_name_display.dart';
import 'component/login_button.dart';
import 'component/cancel_button_component.dart';

/// ログイン選択ダイアログスクリーン
/// 
/// 親と子供のIDを確認して選択肢を表示するダイアログです。
class LoginSelectionDialog extends StatelessWidget {
  /// 家族名
  final String? familyName;
  /// 親IDが存在するかどうか
  final bool hasParentId;
  /// 子供IDが存在するかどうか
  final bool hasChildId;
  /// 親でログイン選択時のコールバック
  final VoidCallback onLoginAsParent;
  /// 子供でログイン選択時のコールバック
  final VoidCallback onLoginAsChild;
  /// キャンセル時のコールバック
  final VoidCallback onCancel;
  
  const LoginSelectionDialog({
    super.key,
    this.familyName,
    required this.hasParentId,
    required this.hasChildId,
    required this.onLoginAsParent,
    required this.onLoginAsChild,
    required this.onCancel,
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Column(
        children: [
          const SizedBox(height: 16),
          if (familyName != null)
            FamilyNameDisplay(familyName: familyName!),
        ],
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // 親でログインボタン
          if (hasParentId)
            LoginButton(
              text: l10n.I.loginAsParent,
              onPressed: _onLoginAsParent,
            ),
          
          if (hasParentId && hasChildId) const SizedBox(height: 12),
          
          // 子供でログインボタン
          if (hasChildId)
            LoginButton(
              text: l10n.I.loginAsChild,
              onPressed: _onLoginAsChild,
            ),
          
          const SizedBox(height: 20),
          
          // キャンセルボタン
          CancelButton(
            text: l10n.I.cancel,
            onPressed: _onCancel,
          ),
        ],
      ),
    );
  }

  /// 親でログインボタンが押された時の処理
  void _onLoginAsParent() {
    onLoginAsParent();
  }

  /// 子供でログインボタンが押された時の処理
  void _onLoginAsChild() {
    onLoginAsChild();
  }

  /// キャンセルボタンが押された時の処理
  void _onCancel() {
    onCancel();
  }
}
