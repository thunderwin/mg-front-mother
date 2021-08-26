export const actions = {
  async send({ dispatch }, { topic_id, text }) {
    console.log("%c text", "color:green;font-weight:bold");
    console.log(JSON.stringify(text));

    await dispatch(
      "topic/newPost",
      {
        topic_id,
        text,
      },
      { root: true }
    );
  },
};
