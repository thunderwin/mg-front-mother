export default function({ app, redirect, req }) {
  let permissions = app.store.state.permission.user.permissions;
  if (!permissions.includes("owner")) {
    console.dir('没有owner权限')
    // 首先必须是vendor
    redirect("/err");
    return;
  }
}
