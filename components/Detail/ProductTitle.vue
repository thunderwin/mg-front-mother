<template>
  <div style="background-color: #fff">
    <div
      class="is-size-5 has-text-grey-dark"
      style="padding: 0.5rem 1rem 0 1rem"
    >
      {{ x.name }}
    </div>

    <div class="review_summy" style="padding: 0 1rem">
      <div
        v-if="!!x.review_count"
        class="item-ranking-review my-flex van-hairline--bottom"
        style="justify-content: flex-start; padding: 10px 0"
        @click="goReview"
      >
        <van-rate
          color="#ffd21e"
          v-model="x.rating_summary"
          readonly
          style="margin-right: 10px"
        />
        <a @click="scrollToId('#reviews')">{{ x.review_count }} ratings</a>
      </div>

      <a v-else href="#leave_review" class="" style="color: #7bcbc1">
        Be the first to review this product
      </a>
    </div>

    <BaseShowItemPrice v-if="x" :x="x" style="padding: 0 1rem" />

    <div
      v-if="x.short_description && x.short_description.html"
      v-html="x.short_description.html"
      class="desc van-hairline--bottom"
      style="padding: 1rem"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["x"],
  methods: {
    goReview() {
      console.log("%c ????", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      this.scrollToId("#reviews");
    },
    scrollToId(item) {
      console.log("%c ?", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      // let idItem = document.getElementById(item);
      let anchor = this.$el.querySelector(item); //计算传进来的id到顶部的距离
      this.$nextTick(() => {
        // console.log(anchor.offsetTop)
        window.scrollTo(0, anchor.offsetTop); //滚动距离因为导航栏固定定位130px的高度
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
