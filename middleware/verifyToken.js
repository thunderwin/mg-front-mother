const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;

// 验证下token是不是ok
export default async function({ app, redirect, route, req, res }) {
  let commit = app.store.commit;

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

  if (token === null || token === false) {
    console.dir("没有token，可能是还没登录");
    return redirect(`/login?redirect=${route.fullPath}`);
  }

  // 如果有token 就请求会用户信息, 也许不应该在这里 // 暂时放这里
  // token 存在
  await app.$axios
    .get("/api/user/detail", {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      console.dir("自动获取的用户信息");
      console.log(JSON.stringify(response));

      // If  we get user data we set it to store
      commit("permission/setUser", response);
      commit("permission/setToken", token);
      commit("permission/setHeaders", token);
    })
    .catch(error => {
      // If we get error, we should logout user by removing data within cookies and store
      // Additionally you can create specific code error on backend to check if token is expired or invalid
      // and then check for status code and then remove data
      commit("permission/setUser", null);
      commit("permission/setToken", null);
      res.setHeader("Set-Cookie", [
        `authToken=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      ]);
      // This is only way I found useful for removing cookies from node server
      console.warn(error);
    });
}
