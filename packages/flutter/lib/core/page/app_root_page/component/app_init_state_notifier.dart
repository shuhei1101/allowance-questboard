import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart' show StateNotifier, StateNotifierProvider;
import 'package:allowance_questboard/login/api/v1/init/init_api.dart' show InitApi;
import 'package:allowance_questboard/login/usecase/fetch_init_data/fetch_init_data_usecase.dart' show FetchInitDataUsecase;
import 'package:allowance_questboard/login/usecase/fetch_init_data/fetch_init_data_usecase_command.dart' show FetchInitDataUsecaseCommand;

/// アプリの初期化状態
enum AppInitState {
  loading,   // ロード中
  completed, // 完了
  error,     // エラー
}

/// アプリ初期化状態のプロバイダー
final appInitStateProvider = StateNotifierProvider<AppInitStateNotifier, AppInitState>((ref) {
  return AppInitStateNotifier();
});

/// アプリ初期化状態を管理するNotifier
class AppInitStateNotifier extends StateNotifier<AppInitState> {
  AppInitStateNotifier() : super(AppInitState.loading) {
    _initialize();
  }

  /// アプリの初期化処理
  Future<void> _initialize() async {
    try {
      // マスタデータ取得
      await _fetchInitialMasterData();
      
      // 初期化完了
      state = AppInitState.completed;
    } catch (e) {
      // エラー状態に変更
      state = AppInitState.error;
      debugPrint('アプリ初期化エラー: $e');
    }
  }

  /// アプリ初期化時のマスタデータを取得
  Future<void> _fetchInitialMasterData() async {
    final initApi = InitApi();
    final command = FetchInitDataUsecaseCommand(initApi: initApi);
    final usecase = FetchInitDataUsecase();
    
    final result = await usecase.execute(command);
    
    if (!result.isSuccess) {
      throw Exception('マスタデータ取得エラー: ${result.errorMessage}');
    }
  }

  /// 再初期化
  void retry() {
    state = AppInitState.loading;
    _initialize();
  }
}
