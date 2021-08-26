// 把上一个router 存起来，
export default function({ app, from, route }) {
  if (process.client) {
    // app.store.commit("saveLastPage", ""); // 每次切换路由就去掉后退
    // if (route.name === "index-p-handle") {
    //   console.log("%c 去详情页", "color:green;font-weight:bold");
    //   app.store.commit("saveLastPage", from.path);
    // }
  }
}
