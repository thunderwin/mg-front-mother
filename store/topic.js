export const state = () => {
  return {
    userSummary: {},
    hotNewTopic: [],
  };
};

export const mutations = {
  setUserSummary(state, v) {
    state.userSummary = v;
  },
  setHotNewTopic(state, v) {
    state.hotNewTopic = v;
  },
};
export const actions = {
  async newTopic({ commit, dispatch, state }, { category, title, text }) {
    let r = await this.$axios.post("/api/topic/newTopic", {
      category,
      title,
      text,
    });

    console.log("%c 新的话题", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    return r.urls;
  },

  async newPost({ commit, dispatch, state }, { text, topic_id }) {
    let r = await this.$axios.post("/api/topic/newPost", {
      topic_id: topic_id,
      raw: text,
    });

    console.log("%c 新的帖子", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    return r;
  },
  async editPost({ commit, dispatch, state }, { text, post_id }) {
    let r = await this.$axios.post("/api/topic/editPost", {
      post_id: post_id,
      text: text,
    });

    console.log("%c 修改过的帖子", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    return r;
  },

  async getTopic({ commit, dispatch, state }, { topicId }) {
    let r = await this.$axios
      .post("/api/topic/getTopic", {
        topic_id: topicId,
      })
      .then();
    console.log("%c 新的帖子", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    return r;
  },

  async userActions({ commit, dispatch, state }) {
    let r = await this.$axios.post("/api/topic/userActions").then();
    console.log("%c 用户活动历史", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    return r;
  },

  async userSummary({ commit, dispatch, state }) {
    let r = await this.$axios.post("/api/topic/userSummary").then();
    console.log("%c 用户统计", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    commit("setUserSummary", r);
  },

  async hotNewTopic({ commit, dispatch, state }) {
    let r = await this.$axios.post("/api/topic/hotNewTopic").then();
    console.log("%c 最新最热话题", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    commit("setHotNewTopic", r);
  },
};
