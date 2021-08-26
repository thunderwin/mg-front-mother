<template>
  <div>
    <div v-if="$device.isDesktop" class="section">
      <div class="container">
        <div
          v-if="x.title"
          class="is-size-4 is-capitalized"
          style="padding: 10px 20px"
        >
          {{ x.title }}
        </div>
        <van-grid
          :border="false"
          :center="false"
          :gutter="20"
          :clickable="true"
          :column-num="x.rowNum"
        >
          <van-grid-item v-for="(y, index) in products" :key="index">
            <BaseProduct class="shadow" :x="y" />
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <div class="container" v-if="$device.isMobileOrTablet">
      <div
        v-if="x.title"
        class="is-size-4 is-capitalized"
        style="padding: 0.5rem 1rem"
      >
        {{ x.title }}
      </div>
      <van-grid
        :border="false"
        :center="false"
        :clickable="true"
        :gutter="20"
        :column-num="x.rowNumM"
      >
        <van-grid-item v-for="(y, index) in products" :key="index">
          <BaseProduct class="shadow" :x="y" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],

  data() {
    return {
      products: "",
    };
  },

  async fetch() {
    console.log("%c this.x", "color:green;font-weight:bold");
    console.log(JSON.stringify(this.x));

    console.log("%c 组件内部发送请求", "color:green;font-weight:bold");
    console.log(JSON.stringify());
    let r = await this.getCategoryItems(this.x.condition);

    console.log("%c x", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    this.products = r.products.items;
  },

  methods: {
    getCategoryItems(condition) {
      return this.$store.dispatch("product/productWithFilterSort", condition);
    },
  },
};
</script>

<style lang="scss">
.each-row .van-grid-item__content {
  padding: 0 !important;
}
</style>
