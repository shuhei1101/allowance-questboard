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
    componentDetail: "ComponentDetail",
    dependencyComponentList: "DependencyComponentList",
    emailInputDetail: "EmailInputDetail",
    passwordInputDetail: "PasswordInputDetail",
    birthdayInputDetail: "BirthdayInputDetail",
    saveButtonDetail: "SaveButtonDetail",
    iconSelectButtonDetail: "IconSelectButtonDetail",
    iconSelectPageDetail: "IconSelectPageDetail",
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
