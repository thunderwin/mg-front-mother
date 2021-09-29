<template>
  <div style="background-color: #fff">
    <div class="is-size-5 has-text-grey-dark" style="">
      {{ x.name }}
    </div>

    <div class="review_summy" style="">
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
        <a @click="$emit('scrollToId', '#reviews')"
          >{{ x.review_count }} ratings</a
        >
      </div>

      <a
        v-else
        class=""
        @click="$emit('scrollToId', '#leave_review')"
        :style="{
          color: $store.state.S.mainColor + '!important',
          cursor: 'pointer',
        }"
      >
        Be the first to review this product
      </a>
    </div>

    <BaseShowItemPrice v-if="x" :x="x" :fontSize="4" style="" />

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
  methods: {},
};
</script>

<style lang="scss" scoped></style>
