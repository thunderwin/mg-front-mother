<template>
  <div class="">
    <div v-if="$device.isDesktop" class="section">
      <div :class="!!x.fullScreen ? '' : 'container'">
        <div
          v-if="x.title"
          class="is-size-5 is-capitalized"
          style="padding: 1rem"
        >
          {{ x.title }}
        </div>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper" style="padding: 1rem 0">
            <div
              class="swiper-slide"
              v-for="(item, index) in category.products.items"
              :key="index"
            >
              <div class="">
                <!-- {{ item }} -->
                <BaseProduct
                  style="background-color: #fff"
                  class=""
                  :x="item"
                />
              </div>
            </div>
          </div>
          <div v-if="products.length > 1" class="swiper-pagination"></div>
          <div
            class="swiper-button-prev"
            :style="{
              color: $store.state.S.mainColor,
            }"
            slot="button-prev"
          ></div>
          <div
            :style="{
              color: $store.state.S.mainColor,
            }"
            class="swiper-button-next"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="$device.isMobileOrTablet">
      <div :class="!!x.fullScreen ? '' : 'container'">
        <div
          v-if="x.title"
          class="is-size-5 is-capitalized"
          style="padding: 1rem 2rem; text-align: center"
        >
          {{ x.title }}
        </div>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper" style="">
            <div
              class="swiper-slide"
              v-for="(item, index) in category.products.items"
              :key="index"
            >
              <div class="">
                <!-- {{ item }} -->
                <BaseProduct
                  style="background-color: #fff"
                  class=""
                  :x="item"
                />
              </div>
            </div>
          </div>
          <div v-if="products.length > 1" class="swiper-pagination"></div>
          <div
            class="swiper-button-prev"
            :style="{
              color: $store.state.S.mainColor,
            }"
            slot="button-prev"
          ></div>
          <div
            :style="{
              color: $store.state.S.mainColor,
            }"
            class="swiper-button-next"
            slot="button-next"
          ></div>
        </div>
      </div>
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

  computed: {
    category() {
      return this.$store.getters["getCateViaId"](this.x.id);
    },
    swiperOption() {
      return {
        slidesPerView: this.$device.isDesktop ? 6 : 2,
        grabCursor: true,
        spaceBetween: 20,

        //显示分页
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },
  },

  methods: {
    getCategoryItems(condition) {
      return this.$store.dispatch("product/productWithFilterSort", condition);
    },

    goforceUpdate() {
      console.dir("重新更新");
    },
  },
};
</script>

<style lang="scss" scoped></style>
