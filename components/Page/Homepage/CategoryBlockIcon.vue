<template>
  <div style="padding: 0.5rem 0">
    <!-- {{ x }} -->
    <div :class="x.fullScreen ? '' : 'container'">
      <div
        class="is-size-6 is-capitalized"
        style="padding: 0 1rem 1rem 1rem; text-align: center; font-weight: bold"
      >
        Shop by category
      </div>
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
            <div class="subcate my-flex" style="padding: 1rem">
              <van-image width="3rem" :src="'/clothing/' + z.icon + '.svg'" />

              <div
                class="is-centered is-capitalized is-size-6"
                style="text-align: center"
              >
                {{ z.name }}
              </div>

              <!-- <div

                class="is-centered is-capitalized"
                style="text-align: center; margin-top: 1rem"
                v-html="z.description"
              ></div> -->
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
              padding: '1rem',
            }"
            class="shadow my-flex"
            :to="localePath('/c') + '/' + z.id"
          >
            <van-image width="4rem" :src="'/clothing/' + z.icon + '.svg'" />

            <div class="subcate">
              <div
                class="is-centered is-capitalized is-size-6"
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
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=20778
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=14795
// https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=15272
export default {
  props: ["x"],

  computed: {
    categoryList() {
      let menu = this.$store.state.flatMenu;
      // let cate = menu.filter((z) => this.x.ids.includes(JSON.stringify(z.id)));

      let cate = this.x.ids.map((id) => menu.find((z) => z.id == id));

      console.log("%c cate11", "color:green;font-weight:bold");
      console.log(JSON.stringify(cate));

      const avaliableIcons = [
        "bottoms",
        "blousesshirts",
        "coats",
        "dresses",
        "jumpsuits",
        "sets",
        "twopieceset",
        "shorts",
        "skirts",
        "sweaters",
        "sweaterscardigans",
        "danim",
        "t-shirts",
        "coatsjackets",
      ];

      cate = cate.map((x) => {
        let iconIndex = avaliableIcons.indexOf(
          x.name.toLowerCase().replace(/\s/g, "").replace("&", "")
        );
        if (iconIndex > -1) {
          x.icon = avaliableIcons[iconIndex];
        }

        return x;
      });

      return cate;
    },
  },
};
</script>

<style lang="scss" scoped></style>
