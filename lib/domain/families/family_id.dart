class FamilyId {
  final String value;
  
  /// throws [ArgumentError]
  FamilyId(this.value) {
    if (value.length < 5) {
      throw ArgumentError();
    }
  }
}
