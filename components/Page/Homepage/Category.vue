<template>
  <div>
    <div class="container">
      <van-grid
        v-if="$device.isMobileOrTablet"
        :border="false"
        :center="false"
        :column-num="3"
        :clickable="true"
      >
        <van-grid-item v-for="(x, index) in categoryList" :key="index">
          <nuxt-link :to="localePath('/list') + '?category_id=' + x.id">
            <div class="subcate card-content">
              <van-image width="100%" :src="x.image" />
              <div
                class="is-centered is-capitalized"
                style="text-align: center; margin-top: 10px"
              >
                {{ x.name }}
              </div>
            </div>
          </nuxt-link>
        </van-grid-item>
      </van-grid>

      <van-grid
        v-if="$device.isDesktop"
        :border="false"
        :center="false"
        :column-num="6"
        :gutter="20"
        :clickable="true"
      >
        <van-grid-item v-for="(x, index) in categoryList" :key="index">
          <nuxt-link :to="localePath('/list') + '?category_id=' + x.id">
            <div class="subcate shadow card-content">
              <van-image width="100%" :src="x.image" />
              <div
                class="is-centered is-capitalized"
                style="text-align: center; margin-top: 10px"
              >
                {{ x.name }}
              </div>
            </div>
          </nuxt-link>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categoryList"],
};
</script>

<style lang="scss" scoped></style>
