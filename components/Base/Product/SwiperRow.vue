<template>
  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper" style="padding: 1rem 0">
        <div
          class="swiper-slide"
          v-for="(item, index) in products"
          :key="index"
        >
          <div class="">
            <!-- {{ item }} -->
            <BaseProduct style="background-color: #fff" class="" :x="item" />
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
</template>

<script>
export default {
  props: ["products"],
  computed: {
    swiperOption() {
      return {
        slidesPerView: this.$device.isDesktop ? 4 : 2,
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
};
</script>

<style lang="scss" scoped></style>
