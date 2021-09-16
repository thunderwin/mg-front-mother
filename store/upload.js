const COS = require("cos-js-sdk-v5");

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

  async genCloudUploadToken() {},

  async uploadImgCloud({ commit, dispatch, state }, { base64 }) {
    let token = await this.$axios.post("/api/upload/genUploadToken");

    let payload = {
      key: token.key,
      OSSAccessKeyId: token.OSSAccessKeyId,
      policy: token.policy,
      signature: token.signature,
      success_action_status: 200,
      file: base64,
    };

    try {
      let r = await this.$axios.post("/cloud/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("%c 上传产品结果", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));
      return r;
    } catch (error) {
      console.log("%c 上传出错", "color:green;font-weight:bold");
      console.log(JSON.stringify(error));
    }
  },

  async uploadOneImg(file) {
    file.status = "uploading";
    file.message = "上传中...";

    console.log("%c file", "color:green;font-weight:bold");
    console.log(JSON.stringify(file));

    let base64 = file.content.split(",")[1];

    let meta = file.content.split(",")[0];

    let type = meta.split(";")[0].split(":")[1];

    let payload = {
      label: "",
      position: "0",
      disabled: false,
      main: true,
      content: {
        type: type,
        base64_encoded_data: base64,
        name: generateUUID(),
      },
      sku: this.sku,
    };

    let r = await this.$store.dispatch("upload/addImage", payload);
    console.log("%c 结果", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (r.code === 1) {
      file.message = "上传失败";
      file.status = "failed";
    } else {
      file.message = "上传ok";
      file.status = "done";
    }
  },
};
