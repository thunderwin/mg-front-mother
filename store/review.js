export const actions = {
  async create({ commit, dispatch }, obj) {
    let r = await this.$axios.post("/api/review/createProductReview", obj);

    return r;
  },

  async view({ commit, dispatch }, obj) {
    let r = await this.$axios
      .post("/api/review/view", obj, {
        headers: {
          noLoading: true, // 隐藏加载
        },
      })
      .then();
    return r;
  },

  async productReviewRatingsMetadata({ commit, dispatch }) {
    let r = await this.$axios.post("/api/review/productReviewRatingsMetadata");
    return r;
  },
};
