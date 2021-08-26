// 只是看看用户是不是登录啦。但是token 是不是真的不确定呢

const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
export default async function({ app, redirect, route, req, res }) {
  let commit = app.store.commit;

  // console.dir('app是什么')
  // console.log(app.router)

  console.dir("route是什么");
  console.log(route.query);

  if (!!route.query.token) {
    console.dir("由某些地方跳过来的，带token啦");
    console.log(JSON.stringify(route.query.token));

    commit("permission/setToken", route.query.token);

    await app.$axios
      .get("/api/user/detail", {
        headers: {
          // Authorization: route.query.token
        }
      })
      .then(response => {
        console.dir("使用传入的token 获取用户信息");
        console.log(JSON.stringify(response));

        // If  we get user data we set it to store
        commit("permission/setUser", response);
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
  } else {
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
  }
}
