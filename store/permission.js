const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => ({
  token: "",
  user: ""
});

export const getters = {};

export const mutations = {
  setToken(state, v) {
    state.token = v;
  },

  setUser(state, v) {
    state.user = v;
  },

  setHeaders(state, v) {
    state.headers = {
      headers: {
        Authorization: v
      }
    };
  }
};

export const actions = {
  async login({ commit }, loginInfo) {
    let { token } = await this.$axios.post("/api/auth/login", loginInfo).then();

    // commit("setUser", userinfo);
    commit("setToken", "Bearer " + token);
    commit("setHeaders", "Bearer " + token);
    Cookie.set("authToken", "Bearer " + token, {
      expires: 365
    });


    // Cookie.set('authUser', response.data.data, { expires: 365 }) if you need user data within cookies

    console.dir("$nuxt.$route.query");
    console.log(JSON.stringify($nuxt.$route.query));

    if ($nuxt.$route.query.redirect) {
      // 如果跳来的请求带有跳转，就跳过去，没有就跳到首页
      this.$router.push($nuxt.$route.query.redirect);
    } else {
      this.$router.push("/");
    }
  }
};
