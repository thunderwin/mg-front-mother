// 检验某个用户是某一个网站的vendor

export default function({ app, redirect, req }) {
  // 检查该用户在当前域名下的是不是owner

  console.dir("看看当前的权限是什么");
  console.log(JSON.stringify(app.store.state.permission.user.permissions));
  let permissions = app.store.state.permission.user.permissions;

  if (!permissions.includes("vendor")) {
    // 首先必须是vendor
    console.dir("没有vendor 权限，可能是你还没有入驻");
    console.log(JSON.stringify());

    redirect("/err");
    return;
  }
}
