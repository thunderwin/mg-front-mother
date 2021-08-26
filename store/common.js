export const state = () => ({});
export const mutations = {};
export const actions = {
  async create({ dispatch }, obj) {
    let r = await this.$axios.post("api/landingPage/create", obj).then();
    console.dir("r");
    console.log(JSON.stringify(r));
    if (r.id) {
      dispatch("info/success", "成功", { root: true });
      return r.id;
    }
  },

  async update({ dispatch }, obj) {
    console.dir("obj");
    console.log(JSON.stringify(obj));

    let r = await this.$axios.post("api/landingPage/update", obj).then();
    console.dir("r");
    console.log(JSON.stringify(r));
    if (r.id) {
      dispatch("info/success", "修改成功", { root: true });
    }
  },

  // async get({ commit }, id) {
  //   return await this.$axios.post("api/common/get",id).then();
  // },

  async list({ commit }, obj) {
    return await this.$axios.post("api/common/list", obj).then();
  },

  async remove({ dispatch }, id) {
    let r = await this.$axios.post("api/common/delete", { id }).then();
    console.dir("r");
    console.log(JSON.stringify(r));
    if (r.deletedProductId) {
      dispatch("info/success", "删除成功", { root: true });
      return true;
    }
  }
};
