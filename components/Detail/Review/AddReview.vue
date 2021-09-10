<template>
  <div>
    <section class="section is-capitalized">
      <BaseFormBuilder
        style="font-size: 16px; font-weight: bold"
        name="addreview"
        :atts="atts"
        @submit="submit"
      />

      <button
        @click="$formulate.submit('addreview')"
        :class="isLoading ? 'is-loading' : ''"
        class="button is-light"
        :style="{ backgroundColor: $store.state.S.mainColor }"
      >
        Submit
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      atts: [
        {
          name: "nickname",
          value: "",
          type: "text",
          label: this.$t("form.nickname"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "summary",
          value: "",
          type: "text",
          label: this.$t("form.summary"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },

        {
          name: "text",
          value: "",
          type: "textarea",
          label: this.$t("form.review"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
      ],
      rankMeta: [],

      isLoading: false,
    };
  },
  async fetch() {
    let r = await this.$store.dispatch("review/productReviewRatingsMetadata");
    console.log("%c 获取的review meta", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    this.rankMeta = r.productReviewRatingsMetadata.items;
  },
  methods: {
    async submit(e) {
      this.isLoading = true;

      let payload = {
        sku: "WH08",
        nickname: "Roni",
        summary: "Great looking sweatshirt",
        text:
          "This sweatshirt looks and feels great. The zipper sometimes sticks a bit.",
        ratings: [
          {
            id: "NA==",
            value_id: "MTk=",
          },
          {
            id: "MQ==",
            value_id: "NA==",
          },
          {
            id: "Mg==",
            value_id: "OA==",
          },
        ],
      };

      await this.$store.dispatch("review/create", payload);
      this.isLoading = false;
    },

    async reviewList() {
      this.$store.dispatch("review/list");
    },
  },
};
</script>

<style lang="scss" scoped></style>
