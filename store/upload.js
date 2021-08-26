export const actions = {
  async genUploadToken({ commit, dispatch, state }, files) {
    let r = await this.$axios.post(
      "/api/common/image-token",
      { files },
      {
        headers: {
          noLoading: true, // 隐藏加载
        },
      }
    );

    console.dir("aws 返回的数据,接下来传过去");
    console.log(JSON.stringify(r));
    return r.urls;
  },

  async upload({ commit, dispatch, state }, body) {
    let r = await this.$axios.post("/api/upload", body);
    console.log("%c 上传产品结果", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    return r;
  },
};
