import 'package:allowance_questboard/core/api/base_api_response.dart';
import 'package:allowance_questboard/core/enum/enumuratable.dart' show Enumuratable, Enumuratables;
import 'package:allowance_questboard/core/l10n/language_id.dart' show LanguageId;

/// アプリ初期化APIレスポンス
/// 
/// アプリ初期化処理の結果データを表現します。
class InitApiResponse extends BaseApiResponse {
  /// 言語情報
  final LanguagesDto languages;

  /// InitApiResponseのコンストラクタ
  /// 
  /// [languages] 言語情報
  const InitApiResponse({
    required this.languages,
  });

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: InitApiResponseオブジェクト
  factory InitApiResponse.fromJson(Map<String, dynamic> json) {
    return InitApiResponse(
      languages: LanguagesDto.fromJson(json['languages'] as Map<String, dynamic>),
    );
  }
}

/// 言語情報一覧DTO
class LanguagesDto {
  /// 言語リスト
  final List<LanguageDto> list;

  /// LanguagesDtoのコンストラクタ
  /// 
  /// [list] 言語リスト
  const LanguagesDto({
    required this.list,
  });

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: LanguagesDtoオブジェクト
  factory LanguagesDto.fromJson(Map<String, dynamic> json) {
    final list = json['list'] as List<dynamic>;
    return LanguagesDto(
      list: list.map((item) => LanguageDto.fromJson(item as Map<String, dynamic>)).toList(),
    );
  }
}

/// 言語情報DTO
class LanguageDto implements Enumuratable<LanguageId> {
  /// 言語ID
  final int _id;
  
  /// 言語コード
  final String code;
  
  /// 言語名
  final String name;
  
  /// アクティブフラグ
  final bool isActive;
  
  /// ソート順
  final int sortOrder;

  /// LanguageDtoのコンストラクタ
  /// 
  /// [id] 言語ID
  /// [code] 言語コード
  /// [name] 言語名
  /// [isActive] アクティブフラグ
  /// [sortOrder] ソート順
  const LanguageDto({
    required int id,
    required this.code,
    required this.name,
    required this.isActive,
    required this.sortOrder,
  }) : _id = id;

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: LanguageDtoオブジェクト
  factory LanguageDto.fromJson(Map<String, dynamic> json) {
    return LanguageDto(
      id: json['id'] as int,
      code: json['code'] as String,
      name: json['name'] as String,
      isActive: json['is_active'] as bool,
      sortOrder: json['sort_order'] as int,
    );
  }
  
  @override
  LanguageId get id => LanguageId(_id);
}
