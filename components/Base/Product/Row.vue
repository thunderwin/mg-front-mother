<template>
  <div>
    <div v-if="$device.isDesktop" class="section">
      <div class="container">
        <div
          class="is-size-3 is-uppercase is-centered"
          style="text-align: center; margin-bottom: 1rem"
        >
          {{ x.name }}
        </div>
        <van-grid
          :border="false"
          :center="false"
          :gutter="20"
          :clickable="true"
          :column-num="5"
        >
          <van-grid-item v-for="(y, index) in x.products.items" :key="index">
            <Product class="shadow" :x="y" />
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <div class="container" v-if="$device.isMobileOrTablet">
      <div class="is-size-4 is-capitalized" style="padding: 0.5rem 1rem">
        {{ x.name }}
      </div>
      <van-grid
        :border="false"
        :center="false"
        :clickable="true"
        :gutter="20"
        :column-num="2"
      >
        <van-grid-item v-for="(y, index) in x.products.items" :key="index">
          <Product class="shadow" :x="y" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Product from "./Index";
export default {
  components: {
    Product,
  },
  name: "product-row",
  props: ["x"],
};
</script>

<style lang="scss">
.each-row .van-grid-item__content {
  padding: 0 !important;
}
</style>
