const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => ({
  token: "",
  userInfo: "",
});
export const mutations = {
  setToken(state, v) {
    state.token = v;
  },
  setUserInfo(state, v) {
    state.userInfo = v;
  },
  removeToken(state) {
    state.token = "";
  },
};
export const getters = {
  token(state) {
    return state.token;
  },
  userInfo(state) {
    return state.userInfo;
  },
};
export const actions = {
  async reg(
    { commit, dispatch },
    { email, password, firstname, lastname, prefix }
  ) {
    let r = await this.$axios.post("/api/user/emailReg", {
      email,
      password,
      firstname,
      lastname,
      prefix,
    });

    return r;
  },

  async login({ commit, dispatch }, { email, password }) {
    let r = await this.$axios.post("/api/auth/token", {
      email,
      password,
    });

    console.log("%c 登录结果", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (r.response && r.response.errors && r.response.errors.length > 0) {
      return r.response.errors[0].message;
    }

    let code = this.$i18n.locale;

    commit("cart/removeCart", code, { root: true }); // 登录后清理购物车
    commit("cart/setCartQTY", { code, qty: 0 }, { root: true });

    commit("setToken", "Bearer " + r.token);
    Cookie.set("authToken", "Bearer " + r.token, {
      expires: 29,
    });

    return "ok";
  },

  logout({ commit }) {
    Cookie.remove("authToken");
    commit("removeToken");
  },

  async getUser({ commit, dispatch }) {
    let r = await this.$axios.post("/api/user/get");
    console.log("%c 用户信息", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    commit("setUserInfo", r.customer);
  },

  async updateEmail({ commit }, { input }) {
    let r = await this.$axios.post("/api/user/updateEmail", {
      input,
    });
    console.log("%c 更新郵箱後的信息", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    return r;
  },

  async updateUserAddress({ commit }, { input }) {
    let r = await this.$axios.post("/api/user/updateCustomerAddress", {
      input,
    });
    console.log("%c 更新后的用户地址", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
  },
  async changeCustomerPassword(
    { commit, dispatch },
    { currentPassword, newPassword }
  ) {
    let r = await this.$axios.post("/api/user/changeCustomerPassword", {
      newPassword,
      currentPassword,
    });
    console.log("%c 更新后的密码", "color:green;font-weight:bold");

    if (r.response.errors && r.response.errors.length > 0) {
      return false;
    }
    console.log(JSON.stringify(r));
    return r;
  },

  async subscribeEmailToNewsletter({ commit, dispatch }, { email }) {
    let r = await this.$axios.post("/api/user/subscribeEmailToNewsletter", {
      email,
    });

    if (r.code === 1) {
      dispatch("info/error", "Email address has been used.", { root: true });
      return false;
    }

    console.log("%c 订阅结果", "color:green;font-weight:bold");
    console.log(r);

    dispatch("info/success", "successed", { root: true });

    return true;
  },
};
