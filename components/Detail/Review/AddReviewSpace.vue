<template>
  <div>
    <client-only>
      <section class="section is-capitalized">
        <FormulateForm
          :form-errors="formErrors"
          v-model="formValues"
          name="add-review"
          @submit="submitSpace"
        >
          <FormulateInput
            name="display_name"
            label="Nickname"
            type="text"
            validation="required"
            class="is-medium"
          />

          <FormulateInput
            name="files"
            type="image"
            label="Photo"
            multiple
            validation="mime:image/jpeg,image/png,image/gif"
            class="is-medium"
            @file-upload-complete="fileUploadComplete"
            @file-removed="fileRemoved"
          />

          <FormulateInput
            name="score"
            type="range"
            min="0"
            :max="5"
            show-value
            label="score"
            validation="required"
            class="is-medium"
          />

          <FormulateInput
            name="review_title"
            label="Summary"
            validation="required"
            class="is-medium"
          />

          <FormulateInput
            name="review_content"
            label="Content"
            type="textarea"
            validation="required"
            class="is-medium"
          />

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


      --></section>
    </client-only>
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

      isLoading: false,

      currentImgIds: [],
    };
  },
  mounted() {},
  async fetch() {},
  methods: {
    fileRemoved(e) {},
    fileUploadComplete() {},
    async submitSpace(e) {
      // 提交到独立的评论服务器

      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));

      e.remote_image_list = e.files;
      e.sku = this.sku;

      // return;

      // let payload = {
      //   email: null,
      //   review_title: null,
      //   review_content: "hello there",
      //   score: null,
      //   votes_up: null,
      //   votes_down: null,
      //   sku: "test001",
      //   display_name: "brush lii",
      //   user_avatar: null,
      //   images_data: [],
      // };
      this.isLoading = true;

      let r = await this.$axios.post("/space/reviews", e);
      this.isLoading = false;
      console.log("%c 上传评论结果", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));
    },

    async reviewList() {
      let r = await this.$axios.get("/space/reviews", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
