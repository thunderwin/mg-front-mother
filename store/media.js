export const state = () => ({});
export const mutations = {};
export const actions = {
  async genUploadToken({ commit, dispatch, state }, files) {
    let r = await this.$axios.post("/api/media/image-token", { files }).then();
    console.dir("aws 返回的数据,接下来传过去");
    console.log(JSON.stringify(r));
    return r.urls;
  },

  async addMedia({ dispatch }, obj) {
    let r = await this.$axios.post("api/media/add", obj).then();
    console.dir("增加图片成功后的返回");
    console.log(JSON.stringify(r));
    if (r) {
      dispatch("info/success", "Add images successed", { root: true });
      return r
    }
  },

  async removeImage({ dispatch }, obj) {
    let r = await this.$axios.post("api/media/removeImage", obj).then();
    console.dir("r");
    console.log(JSON.stringify(r));

    dispatch("info/success", "删除成功", { root: true });
    return true;
  }
};
