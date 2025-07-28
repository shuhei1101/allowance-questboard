import 'package:allowance_questboard/core/validator/relation_validator.dart' show RelationValidator;
import 'package:hooks_riverpod/hooks_riverpod.dart';

/// StateNotifierの基底クラス
abstract class BaseStateNotifier<StateType, ResType> extends StateNotifier<StateType> {
  
  /// 関連チェック用バリデーター
  final validator = RelationValidator();

  BaseStateNotifier(super.state);

  /// レスポンスから状態を更新する
  void updateFromResponse(ResType response);

  /// 全ての状態を更新する
  void updateState();
}
