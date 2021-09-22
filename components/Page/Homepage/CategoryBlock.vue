<template>
  <div style="padding: 1rem 0">
    <div :class="x.fullScreen ? '' : 'container'">
      <van-grid
        v-if="$device.isMobileOrTablet"
        :border="false"
        :center="false"
        :column-num="2"
        gutter="10"
        :clickable="true"
      >
        <van-grid-item v-for="(z, index) in categoryList" :key="index">
          <nuxt-link
            :style="{
              textAlign: 'center',
              backgroundColor: $store.state.S.mainBgColor,
            }"
            class=""
            :to="localePath('/c') + '/' + z.id"
          >
            <div class="subcate" style="">
              <van-image width="100%" :src="z.image" />

              <!-- <div
                class="is-centered is-capitalized is-size-5"
                style="text-align: center"
              >
                {{ z.name }}
              </div> -->
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
            :style="{
              backgroundColor: $store.state.S.mainBgColor,
            }"
            class="shadow"
            :to="localePath('/c') + '/' + z.id"
          >
            <!-- {{ z }} -->
            <van-image width="100%" :src="z.image" />

            <!-- <div class="subcate">
              <div
                class="is-centered is-capitalized is-size-5"
                style="text-align: center; margin-top: 1rem"
              >
                {{ z.name }}
              </div>
            </div> -->
          </nuxt-link>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=20778
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=14795
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=15272
export default {
  props: ["x"],

  computed: {
    categoryList() {
      let menu = this.$store.state.menu;
      let cate = menu.filter((z) => this.x.ids.includes(JSON.stringify(z.id)));

      return cate;
    },
  },
};
</script>

<style lang="scss" scoped></style>
