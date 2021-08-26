export default function ({ app }) {
  // beforeLanguageSwitch called right before setting a new locale

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log(oldLocale, newLocale);
  };
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log("%c 语言切换成功", "color:green;font-weight:bold");

    app.store.dispatch("menu"); // 重新加载菜单

    console.log("%c app.router", "color:green;font-weight:bold");

    app.router.app.refresh(); // 重启

    console.log(oldLocale, newLocale);
  };
}
