const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
export default function({ app, redirect, req }) {
  // 1 先拿到token
  let token = null;
  if (process.server) {
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
    redirect("/login");
    return;
  }

  // 2 使用token
  if (token && token !== false) {
    app.store.commit("permission/setToken", token);
    app.store.commit("permission/setHeaders", token);
  }

  return;
}
