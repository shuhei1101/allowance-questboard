// import { FamilyId } from '@backend/features/family/value-object/familyId';
// import { useTheme } from '@react-navigation/native';
// import { useFamilyCreatePageStore } from './familyCreatePageStore';
// export type HandleFamilyForm = (form: FamilyForm) => void;

// /** 親情報編集画面 */
// export interface FamilyCreatePageProps {
//   familyId?: FamilyId; // 親ID（オプション）
// }

// export const FamilyCreatePage: React.FC<FamilyCreatePageProps> = ({
//   familyId,
// }) => {
//   const { colors } = useTheme();
//   const pageStore = useFamilyCreatePageStore();
//   const sessionStore = useSessionStore();
//   const navigation = useNavigation();

//   // 親ルーターの作成
//   const familyRouter = createAuthenticatedClient({
//     jwtToken: sessionStore.jwt,
//     languageType: sessionStore.languageType,
//   }).family.getFamily;

//   // 親データ初期化フック
//   useInitializeFamilyData({
//     familyId: familyId,
//     familyRouter: familyRouter,
//     getAllIcons: appConfigStore.getAllIcons
//   });

//   // 統合フックで全ハンドラーを取得
//   const {
//     handleNameChange,
//     handleEmailChange,
//     handlePasswordChange,
//     handleIconSelect,
//     handleBirthdayChange,
//     handleConfirm,
//   } = useFamilyEditPageHandlers({
//     shouldUpdate,
//     familyId,
//     handleFamilyForm
//   });

//   // 確定ボタン
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <ComfirmButton
//           onPress={handleConfirm}
//           disabled={!pageStore.familyForm.isValid}
//           loading={pageStore.isLoading}
//           variant="header"
//         />
//       ),
//     });
//   }, [navigation, handleConfirm, pageStore.familyForm.isValid, pageStore.isLoading]);
  
//   return (
//     <KeyboardAvoidingView 
//       style={[styles.container, { backgroundColor: colors.background.primary }]} 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       {/* スクロールビュー */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* フォームコンテナ */}
//         <View style={styles.formContainer}>
//           {/* 名前入力フィールド */}
//           <FamilyNameInputFieldEntry
//             value={pageStore.familyForm.name.value}
//             onChange={handleNameChange}
//             error={pageStore.nameError || undefined}
//           />
          
//           {/* メールアドレス入力フィールド */}
//           <EmailInputFieldEntry
//             value={pageStore.familyForm.email.value}
//             onChange={handleEmailChange}
//             error={pageStore.emailError || undefined}
//           />
          
//           {/* パスワード入力フィールド */}
//           <PasswordInputFieldEntry
//             value={pageStore.familyForm.password.value}
//             onChange={handlePasswordChange}
//             error={pageStore.passwordError || undefined}
//           />
          
//           {/* アイコン選択ボタン */}
//           <IconSelectButtonEntry
//             selectedIcon={pageStore.familyForm.icon}
//             onIconSelected={handleIconSelect}
//           />
          
//           {/* 誕生日入力フィールド */}
//           <BirthdayInputFieldEntry
//             value={pageStore.familyForm.birthday.toISOString()}
//             onChange={handleBirthdayChange}
//             error={pageStore.birthdayError || undefined}
//           />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingVertical: 40,
//   },
//   formContainer: {
//     flex: 1,
//   },
// });
