export const state = () => ({
  storeLanguages: [],
  storeCurrencies: [],

  currentLanguage: "en",
  currentCurrency: {
    // 这里要设置，必须写死
    countryCode: "EURO",
    Currency: "EURO",
    currencyCode: "EUR",
    rate: 1
  }
});
export const getters = {
  languages(state) {
    return state.storeLanguages;
  },
  currencies(state) {
    return state.storeCurrencies;
  }
};
export const mutations = {
  setLanguages(state, v) {
    state.storeLanguages = v;
  },
  setCurrentLanguage(state, v) {
    state.currentLanguage = v;
  },

  setCurrencies(state, v) {
    state.storeCurrencies = v;
  },
  setCurrentCurrency(state, v) {
    state.currentCurrency = v;
  }
};
export const actions = {
  async get(app, id) {},

  async list({ commit }, obj) {
    return await this.$axios.post("api/shop/list", obj).then();
  },

  async menu({ commit }, obj) {
    return await this.$axios.post("api/shop/menu", obj).then();
  },

  async getStoreLanguages({ commit }) {
    let r = await this.$axios.post("api/shop/language").then();
    commit("setLanguages", r);
  },

  async getStoreCurrencies({ commit }) {
    let r = await this.$axios.post("api/shop/countryCurrencyRate").then();
    commit("setCurrencies", r);
  }
};
