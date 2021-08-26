export const state = () => ({
  landingPages: []
});
export const getters = {};
export const mutations = {
  setlandingPages(state, v) {
    state.landingPages = v;
  }
};
export const actions = {
  async list({ commit }, obj) {
    // 获取全部的页面，就是菜单
    let r = await this.$axios.post("/api/landingPage/list", obj).then();
    commit("setlandingPages", r);
  }
};
