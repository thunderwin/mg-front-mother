export const state = () => {
  return {
    showPopup: false,
    showSubs: true, // 订阅框
    formAtts: [],
  };
};

export const mutations = {
  setShowPopup(state, v) {
    state.showPopup = v;
  },
  setShowSubs(state, v) {
    state.showSubs = v;
  },
  setFormAtts(state, v) {
    state.formAtts = v;
  },
};

export const getters = {
  showPopup(state) {
    return state.showPopup;
  },
  showSubs(state) {
    return state.showSubs;
  },
  formAtts(state) {
    return state.formAtts;
  },
};

export const actions = {
  handleAtts({ commit }, { atts }) {
    commit("setFormAtts", atts);
    commit("setShowPopup", true);
  },
};
