import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/application/auth/auth_provider.dart';
import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';

void main() {
  group('AuthProvider', () {
    late AuthProvider authProvider;

    setUp(() {
      authProvider = AuthProvider();
    });

    test('should have correct initial state', () {
      // Assert
      expect(authProvider.userId, null);
      expect(authProvider.familyId, null);
      expect(authProvider.memberId, null);
      expect(authProvider.isAuthenticated, false);
      expect(authProvider.isFamilyUser, false);
      expect(authProvider.isMemberUser, false);
    });

    test('should set user info correctly', () {
      // Arrange
      const testUserId = 'test-user-id';

      // Act
      authProvider.setUserInfo(testUserId);

      // Assert
      expect(authProvider.userId, testUserId);
      expect(authProvider.isAuthenticated, true);
    });

    test('should set family id and clear member id', () {
      // Arrange
      const testUserId = 'test-user-id';
      final testFamilyId = FamilyId('test-family-id');
      final testMemberId = MemberId('test-member-id');

      authProvider.setUserInfo(testUserId);
      authProvider.setMemberId(testMemberId);

      // Act
      authProvider.setFamilyId(testFamilyId);

      // Assert
      expect(authProvider.familyId, testFamilyId);
      expect(authProvider.memberId, null);
      expect(authProvider.isFamilyUser, true);
      expect(authProvider.isMemberUser, false);
    });

    test('should set member id and clear family id', () {
      // Arrange
      const testUserId = 'test-user-id';
      final testFamilyId = FamilyId('test-family-id');
      final testMemberId = MemberId('test-member-id');

      authProvider.setUserInfo(testUserId);
      authProvider.setFamilyId(testFamilyId);

      // Act
      authProvider.setMemberId(testMemberId);

      // Assert
      expect(authProvider.memberId, testMemberId);
      expect(authProvider.familyId, null);
      expect(authProvider.isMemberUser, true);
      expect(authProvider.isFamilyUser, false);
    });

    test('should logout correctly', () {
      // Arrange
      const testUserId = 'test-user-id';
      final testFamilyId = FamilyId('test-family-id');

      authProvider.setUserInfo(testUserId);
      authProvider.setFamilyId(testFamilyId);

      // Act
      authProvider.logout();

      // Assert
      expect(authProvider.userId, null);
      expect(authProvider.familyId, null);
      expect(authProvider.memberId, null);
      expect(authProvider.isAuthenticated, false);
      expect(authProvider.isFamilyUser, false);
      expect(authProvider.isMemberUser, false);
    });

    test('should clear auth info correctly', () {
      // Arrange
      const testUserId = 'test-user-id';
      final testMemberId = MemberId('test-member-id');

      authProvider.setUserInfo(testUserId);
      authProvider.setMemberId(testMemberId);

      // Act
      authProvider.clear();

      // Assert
      expect(authProvider.userId, null);
      expect(authProvider.familyId, null);
      expect(authProvider.memberId, null);
      expect(authProvider.isAuthenticated, false);
      expect(authProvider.isFamilyUser, false);
      expect(authProvider.isMemberUser, false);
    });
  });
}