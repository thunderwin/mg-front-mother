<template>
  <div>
    <section class="section is-capitalized">
      <FormulateForm
        :form-errors="formErrors"
        v-model="formValues"
        name="add-review"
        @submit="submit"
      >
        <FormulateInput
          name="nickname"
          label="Nickname"
          type="text"
          validation="required"
          class="is-medium"
        />

        <!-- <van-uploader
          multiple
          accept="image/png, image/jpeg,image/jpg "
          :after-read="afterRead"
          :before-read="beforeRead"
          v-model="fileList"
        /> -->

        <FormulateInput
          name="review_title"
          label="Summary"
          validation="required"
          class="is-medium"
        />

        <FormulateInput
          name=""
          type="file"
          label="imglist"
          validation="mime:image/jpeg,image/png,image/gif"
          class="is-medium"
        />

        <!-- <FormulateInput
          v-for="(rank, index) in rankMeta"
          :key="index"
          :name="rank.id"
          type="range"
          min="0"
          :max="rank.values.length"
          show-value
          :label="rank.name"
          validation="required"
          class="is-medium"
        /> -->

        <!-- {{ rankMeta }} -->

        <!-- <FormulateInput
          name="text"
          type="textarea"
          label="Content"
          validation="required"
          class="is-medium"
        /> -->

        <FormulateErrors />
      </FormulateForm>

      <button
        @click="$formulate.submit('add-review')"
        :class="isLoading ? 'is-loading' : ''"
        class="button is-light"
        :style="{ backgroundColor: $store.state.S.mainColor }"
      >
        Submit
      </button>

      <!-- <BaseFormBuilder
        style="font-size: 16px; font-weight: bold"
        name="addreview"
        :atts="atts"
        @submit="submit"
      />

      {{ rankMeta }}


      -->
    </section>
  </div>
</template>

<script>
export default {
  props: ["sku"],
  data() {
    return {
      formValues: {},
      formErrors: [],
      rankMeta: [],
      fileList: [],
      isLoading: false,
    };
  },
  mounted() {},
  async fetch() {
    let r = await this.$store.dispatch("review/productReviewRatingsMetadata");
    console.log("%c 获取的review meta", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    this.rankMeta = r.productReviewRatingsMetadata.items;
  },
  methods: {
    async submit(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));

      this.isLoading = true;

      let payload = {
        sku: this.sku,
        nickname: e.nickname,
        summary: e.summary,
        text: e.text,
      };

      delete e.nickname;
      delete e.summary;
      delete e.text;

      // 剩下的就是
      payload.ratings = Object.keys(e).map((x) => {
        let optionIndex = Number(e[x]);

        let thatSet = this.rankMeta.find((z) => z.id === x);
        let v = thatSet.values[optionIndex];

        return {
          id: x,
          value_id: v.value_id,
        };
      });

      console.log("%c payload", "color:green;font-weight:bold");
      console.log(JSON.stringify(payload));

      let r = await this.$store.dispatch("review/create", { input: payload });

      console.log("%c 评论成功", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      this.isLoading = false;
    },

    async reviewList() {
      this.$store.dispatch("review/list");
    },

    async afterRead(file) {
      console.log("%c ", "color:green;font-weight:bold");
      console.log(typeof file);

      if (file.length) {
        console.log("%c 是数组", "color:green;font-weight:bold");

        await (async () => {
          for (let f of file) {
            console.log("%c x", "color:green;font-weight:bold");
            console.log(JSON.stringify(f));
            await this.uploadOneImg(f);
          }
        })();

        // ! 怎么处理forEach 里面的异步
      } else {
        console.log("%c 是一张", "color:green;font-weight:bold");

        await this.uploadOneImg(file);
      }

      if (this.isOldUser) {
        this.sucessed("上传成功，我们会很快联系你！注意接收邮件");
      }
    },
    beforeRead(file) {
      return true;
    },

    async uploadOneImg(file) {
      file.status = "uploading";
      file.message = "上传中...";

      console.log("%c file", "color:green;font-weight:bold");
      console.log(JSON.stringify(file));

      let base64 = file.content.split(",")[1];

      let meta = file.content.split(",")[0];

      let type = meta.split(";")[0].split(":")[1];

      // let payload = {
      //   label: "",
      //   position: "0",
      //   disabled: false,
      //   main: true,
      //   content: {
      //     type: type,
      //     base64_encoded_data: base64,
      //     name: generateUUID(),
      //   },
      //   sku: this.sku,
      // };

      let r = await this.$store.dispatch("upload/uploadImgCloud", {
        base64: base64,
      });

      return;
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
  },
};
</script>

<style lang="scss" scoped></style>
