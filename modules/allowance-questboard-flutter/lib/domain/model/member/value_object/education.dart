/// 教育課程
enum Education {
  preElementary,
  elementary,
  middleSchool,
  highSchool,
  university,
  postUniversity,
}

extension EducationExtension on Education {
  /// 教育課程の表示名
  String get displayName {
    switch (this) {
      case Education.preElementary:
        return "小学生以前";
      case Education.elementary:
        return "小学生";
      case Education.middleSchool:
        return "中学生";
      case Education.highSchool:
        return "高校生";
      case Education.university:
        return "大学生";
      case Education.postUniversity:
        return "大学生以降";
    }
  }
}
