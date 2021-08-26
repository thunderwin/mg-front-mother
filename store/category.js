export const state = () => ({});
export const mutations = {};
export const getters = {};
export const actions = {
  async list({ commit }, { filters, currentPage, pageSize, sort }) {
    let r = await this.$axios.post(
      "/api/category",
      {
        filters: filters,
        currentPage: currentPage,
        pageSize: pageSize,
        sort: sort,
      },
      { useCache: true }
    );
    return r;
  },

  async menu({ commit }) {
    let r = await this.$axios.post("/api/category/menu");
    return r;
  },
};
