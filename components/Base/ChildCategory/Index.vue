<template>
  <div class="product-all">
    <!-- {{ categorys }} -->
    <div class="is-size-3">{{ categorys.name }}</div>
    <van-grid
      :border="false"
      :center="false"
      :gutter="20"
      :clickable="true"
      :column-num="4"
    >
      <van-grid-item
        class=""
        v-for="(x, index) in categorys.children"
        :key="index"
      >
        <nuxt-link class="shadow" :to="localePath('/list') + '/' + x.id">
          <div class="card-image">
            <figure class="image is-4by3">
              <van-image width="100%" height="auto" :src="x.image" />
            </figure>
          </div>
          <div class="is-size-6 card-content">
            <span class="tir van-ellipsis">{{ x.name }}</span>
            <span class="is-size-6 has-text-grey">({{ x.product_count }})</span>
          </div>
        </nuxt-link>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "child-category",
  props: ["categorys"],
  data() {
    return {};
  },
};
</script>
