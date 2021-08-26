// 只是看看用户是不是登录啦。但是token 是不是真的不确定呢
const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
export default async function ({ app, redirect, store, route, req, res }) {
  let token = null;

  if (process.server) {
    console.log("%c server", "color:green;font-weight:bold");

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        token = parsed.authToken;
      } catch (e) {
        console.log(e);
      }
    }
  } else if (process.client) {
    token = Cookie.get("authToken");
  }

  if (!token) {
    console.log("%c token 不存在，请登录", "color:green;font-weight:bold");

    redirect(app.localePath("/login"));
  }
}
