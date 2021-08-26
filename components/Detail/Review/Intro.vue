<template>
  <div>
    <div class="review_summy">
      <div
        v-if="!!x.review_count"
        class="item-ranking-review my-flex van-hairline--bottom"
        style="justify-content: flex-start; padding: 10px 0"
        @click="$emit('goReview')"
      >
        <van-rate
          color="#ffd21e"
          v-model="x.rating_summary"
          readonly
          style="margin-right: 10px"
        />
        <a href="#review">{{ x.review_count }} ratings</a>
      </div>

      <div v-else @click="$emit('goAddReview')" class="" style="color: #7bcbc1">
        Be the first to review this product
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],
};
</script>

<style lang="scss" scoped></style>
