export const state = () => {
  return {
    showPopup: false,
    formAtts: [],
  };
};

export const mutations = {
  setShowPopup(state, v) {
    state.showPopup = v;
  },
  setFormAtts(state, v) {
    state.formAtts = v;
  },
};

export const getters = {
  showPopup(state) {
    return state.showPopup;
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
