import 'education.dart';

/// 学年オブジェクト
///
/// 教育課程名と年数を保持する
class Grade {
  /// ### 制約
  /// - 年数[grade]は1以上であること
  Grade({required this.education, required this.grade}) {
    if (grade < 1) {
      throw ArgumentError.value(grade, 'grade', 'must be greater than 0');
    }
  }

  /// 教育課程名
  final Education education;

  /// 年数
  final int grade;
}
