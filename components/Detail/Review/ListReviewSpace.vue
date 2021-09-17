<template>
  <div>
    <DetailReviewEachReview
      v-for="(review, index) in list"
      :key="index"
      :review="review"
      style="margin-bottom: 1rem"
    />
  </div>
</template>

<script>
// https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
export default {
  props: ["sku"],
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    this.getReviewList();
  },
  methods: {
    async getReviewList() {
      let query = {
        sku: this.sku,
        _sort: "published_at:DESC",
        _limit: 30,
        _start: 0,
      };
      let r = await this.$axios.get("/space/reviews", { params: query });

      console.log("%c 获取的评论", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      this.list = r;
    },
  },
};
</script>

<style lang="scss" scoped></style>
