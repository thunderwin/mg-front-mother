const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;

export default function (context, inject) {
  context.$axios.onRequest((config) => {
    let code = context.app.i18n.locale;
    // console.log("%c 拿到的目前的语言", "color:green;font-weight:bold");
    // console.log(JSON.stringify(code));

    let token = "";
    if (process.server) {
      if (context.req.headers.cookie) {
        const parsed = cookieparser.parse(context.req.headers.cookie);
        try {
          token = parsed.authToken;
        } catch (e) {
          console.log(e);
        }
      }
    } else if (process.client) {
      token = Cookie.get("authToken");
    }

    if (!code) {
      console.log("%c 语言不存在？", "color:green;font-weight:bold");
      console.log(JSON.stringify(code));
      throw "语言不存在？";
    }

    // console.log("%c 请求店铺store", "color:green;font-weight:bold");
    // console.log(JSON.stringify(code));

    // console.log("%c 发送的参数", "color:green;font-weight:bold");
    // console.log(config);

    // console.log("域名" + JSON.stringify(context.app.store.state.domain));

    // console.log("%c 看看headers", "color:green;font-weight:bold");
    // console.log(JSON.stringify(config.headers));

    // if (!config.headers.noLoading) {
    //   context.app.store.dispatch("info/loading", "");
    // }

    // 注意，put 方式是AWS 专用的，不需要在header里面带上 domain 和 Authorization

    if (config.headers && config.method !== "put") {
      config.headers["domain"] = context.app.store.state.domain; // 全局加一个domain
      // 如果有token 就带上

      if (!!token) {
        console.log("%c token", "color:green;font-weight:bold");
        console.log(JSON.stringify(token));

        config.headers["Authorization"] = token; // 全局加一个domain
      }
    }

    // console.dir("发送请求");
    // // console.log(config);

    return config;
  });

  context.$axios.onResponse((res) => {
    let r = res.data;

    // console.dir("axios拦截到的返回");
    // console.log(r);

    // 关闭
    context.app.store.dispatch("info/clear");

    if (!!r.stack) {
      context.app.store.dispatch("info/error", r.message);
      throw r.message;
    }
    return r;
  });

  context.$axios.onError((error) => {
    // context.app.store.dispatch("info/clear");
    console.log("出现错误❌" + JSON.stringify(error));
    throw error;
  });

  // const api = $axios.create({
  //   headers: {
  //     common: {
  //       Accept: 'text/plain, */*'
  //     }
  //   }
  // })
  // api.proxy = false, // 表示开启代理，

  // api.setBaseURL('http://127.0.01:1337/parse/')
  // inject('api', api) // 这个是用来请求 express 的 axios 实列
}
