<template>
  <div>
    <van-grid :border="false" :column-num="10">
      <van-grid-item v-for="(x, index) in items" :key="index">
        <BaseProduct :x="x" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async fetch() {
    let r = await this.$axios.post("/api/product/productWithFilterSort", {
      filter: {
        category_id: {
          eq: 2,
        },
      },
      currentPage: 1,
      pageSize: 20,
      sort: {},
    });
    this.items = r.products.items;
  },
};
</script>

<style lang="scss" scoped></style>
