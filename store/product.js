const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => ({
  token: "",
  user: "",
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
        Authorization: v,
      },
    };
  },
};

export const actions = {
  async productWithFilterSort(
    { commit },
    { filter, pageSize, currentPage, sort, search }
  ) {
    let r = await this.$axios.post(
      "/api/product/productWithFilterSort",
      {
        filter: filter,
        pageSize,
        currentPage,
        search,
        sort,
      },
      { useCache: true }
    );

    return r;
  },

  async related({ commit }, { sku }) {
    let r = await this.$axios.post("/api/product/related", {
      sku: sku,
    });

    console.log("%c 相关产品返回", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    return r.products.items[0];
  },

  async detail({ commit }, { sku }) {
    let r = await this.$axios.post("/api/product/detailV2", {
      sku: sku,
    });

    // console.log("%c 获取到产品", "color:green;font-weight:bold");
    // console.log(JSON.stringify(r));

    return r;
  },
};
