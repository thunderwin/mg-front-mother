export const actions = {
  async create({ commit, dispatch }, obj) {
    let r = await this.$axios
      .post("/api/review/createProductReview", obj)
      .then();
    if (r.id) {
      let m = {
        title: "Review Successed!",
        message: "Great!! now add a avatar and with more product picture?",
        confirmButtonText: "OK",
      };

      dispatch("info/confirm", m, { root: true });
    }
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
    let r = await this.$axios
      .post("/api/review/productReviewRatingsMetadata")
      .then();
    return r;
  },
};
