/**
 * Demo Navigator のスタック情報定数
 * 循環参照を避けるため、別ファイルに分離
 */
export const DemoStackMeta = {
  name: 'Demo',
  screens: {
    developmentTop: "DevelopmentTop",
    screenList: "ScreenList",
    componentList: "ComponentList",
    screenLauncher: "ScreenLauncher",
    dependencyComponentList: "DependencyComponentList",
    emailInputPage: "EmailInputPage",
    passwordInputPage: "PasswordInputPage",
    birthdayInputPage: "BirthdayInputPage",
    saveButtonPage: "SaveButtonPage",
    iconSelectButtonPage: "IconSelectButtonPage",
    familyNameInputPage: "FamilyNameInputPage",
    navigationEntryLayoutPage: "NavigationEntryLayoutPage",
    DemoLoginPage: "DemoLoginPage",
    DemoParentEditPage: "DemoParentEditPage",
    ComponentShowcase: "ComponentShowcase",
    StoreInspector: "StoreInspector",
    SessionSettings: "SessionSettings",
    PageStateSettings: "PageStateSettings",
    LoginPageSettings: "LoginPageSettings",
    ParentEditPageSettings: "ParentEditPageSettings",
    Main: "Main",
  },
} as const;
