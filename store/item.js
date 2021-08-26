export const state = () => ({
  itemList: [],
  bestSeller: [],
  sizeChart: []
});
export const mutations = {
  setList(state, v) {
    state.itemList = v;
  },
  setBestSeller(state, v) {
    state.bestSeller = v;
  },
  setSizeChart(state, v) {
    state.sizeChart = v;
  }
};
export const actions = {
  async create({ dispatch }, obj) {
    let r = await this.$axios.post("api/item", obj).then();
    console.dir("r");
    console.log(JSON.stringify(r));
    if (r.id) {
      dispatch("info/success", "创建新店铺成功", { root: true });
      this.$router.push("/admin/item");
    }
  },
  async getSizeChart({ commit }) {
    let r = await this.$axios.post("api/item/sizeChart").then();
    commit("setSizeChart", r);
    return r;
  },

  async recommondation({ commit }, id) {
    let r = await this.$axios.post("api/item/recommandation", { id }).then();
    return r;
  },

  async bestSeller({ commit }) {
    let r = await this.$axios.post("api/item/bestseller").then();
    commit("setBestSeller", r);
    return r;
  },

  async list({ commit }) {
    let r = await this.$axios.get("api/item").then();
    console.dir("r");
    console.log(JSON.stringify(r));
    commit("setList", r);
  },

  async update({ dispatch }, obj) {
    let r = await this.$axios.put("api/item", obj).then();
    console.dir("r");
    console.log(JSON.stringify(r));
    if (r.id) {
      dispatch("info/success", "修改店铺成功", { root: true });
      this.$router.push("/admin/item");
    }
  },

  async remove({ dispatch }, id) {
    let r = await this.$axios.delete("api/item", { data: { id } }).then();
    console.dir("r");
    console.log(JSON.stringify(r));
    if (r.deletedProductId) {
      dispatch("info/success", "删除成功", { root: true });
      setTimeout(() => {
        dispatch("list");
      }, 1000);
    }
  }
};
