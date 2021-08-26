export const state = () => {
  return {
    channel: "", // channel
  };
};

export const mutations = {
  setChannel(state, v) {
    state.channel = v;
  },
};

export const actions = {
  async initChannel({ commit, state }) {
    console.log("%c this", "color:green;font-weight:bold");
    console.log(this._vm);

    return;
    // 实例一个频道
    let channel = await this.$chat.createChannel("testCee");
    let joinedChannel = await channel.join().then();

    commit("setChannel", channel);

    dispatch.sendChannelMessage();
  },

  sendChannelMessage({ commit, state }) {
    state.channel
      .sendMessage({ text: "test channel message" })
      .then(() => {
        /* 频道消息发送成功的处理逻辑 */
        console.log("%c 发送频道消息成功", "color:green;font-weight:bold");
      })
      .catch((error) => {
        /* 频道消息发送失败的处理逻辑 */
      });
  },

  listChannel({ commit }) {},

  getChannel({ commit }) {},
};
