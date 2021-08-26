<template>
  <div>
    <div :class="x.fullScreen ? '' : 'container'">
      <van-grid
        v-if="$device.isMobileOrTablet"
        :border="false"
        :center="false"
        :column-num="x.rowNumM"
        :clickable="true"
      >
        <van-grid-item v-for="(z, index) in categoryList" :key="index">
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
        </van-grid-item>
      </van-grid>
      <!-- {{ categoryList }} -->
      <van-grid
        v-if="$device.isDesktop"
        :border="false"
        :center="false"
        :column-num="x.rowNum"
        :gutter="20"
        :clickable="true"
      >
        <van-grid-item v-for="(z, index) in categoryList" :key="index">
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
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],

  computed: {
    categoryList() {
      let menu = this.$store.state.menu;

      return menu.filter((z) => this.x.ids.includes(JSON.stringify(z.id)));
    },
  },
};
</script>

<style lang="scss" scoped></style>
