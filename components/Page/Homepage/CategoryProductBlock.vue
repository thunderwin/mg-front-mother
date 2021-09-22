<template>
  <div style="padding: 1rem 0">
    <div :class="x.fullScreen ? '' : 'container'">
      <van-grid
        v-if="$device.isMobileOrTablet"
        :border="false"
        :center="false"
        :column-num="x.rowNumM"
        :clickable="true"
      >
        <!-- <van-grid-item v-for="(z, index) in categoryList" :key="index">
          <nuxt-link
            class="shadow"
            :to="localePath('/list') + '?category_id=' + x.id"
          >
            <van-image width="100%" :src="z.image" />

            <div class="subcate" style="padding: 1rem">
              <div
                class="is-centered is-capitalized is-size-5"
                style="text-align: center; margin-top: 1rem"
              >
                {{ z.name }}
              </div>

              <div
                class="is-centered is-capitalized"
                style="text-align: center; margin-top: 1rem"
                v-html="z.description"
              ></div>
            </div>
          </nuxt-link>
        </van-grid-item> -->
      </van-grid>

      <div class="pc-in" v-if="$device.isDesktop">
        {{ category }}
        <!-- <van-image width="100%" fit="cover" :src="category.image">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image> -->

        <!-- {{ category }} -->

        <!-- <div class="container">
          <van-grid
            v-if="category.products"
            :border="false"
            :center="false"
            :column-num="6"
            :gutter="20"
            :clickable="true"
          >
            <van-grid-item
              v-for="(z, index) in category.products.items"
              :key="index"
            >
              <BaseProduct class="shadow" :x="z" />
            </van-grid-item>
          </van-grid>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],

  computed: {
    category() {
      return this.$store.getters["getCateViaId"](this.x.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
