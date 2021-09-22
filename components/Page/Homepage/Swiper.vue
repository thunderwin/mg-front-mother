<template>
  <div class="" style="padding: 0.5rem 0">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          :style="{
            backgroundImage: `url()`,
            backgroundSize: 'cover',
            backgroundColor: '#ededed',
          }"
          v-for="(img, index) in x.fileList"
          :key="index"
        >
          <div class="item-images" v-if="img" style="text-align: center">
            <van-image width="" height="" fit="cover" :src="img">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </div>
      </div>
      <div v-if="x.fileList.length > 1" class="swiper-pagination"></div>
      <div
        v-if="x.fileList.length > 1"
        class="swiper-button-prev"
        :style="{
          color: $store.state.S.mainColor,
        }"
        slot="button-prev"
      ></div>
      <div
        v-if="x.fileList.length > 1"
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
  props: ["x"],

  computed: {
    swiperOption() {
      return {
        // slidesPerView: this.fileList.length,
        // grabCursor: true,
        // spaceBetween: 10,

        //显示分页
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },
  },

  methods: {
    goforceUpdate() {
      console.dir("重新更新");
    },
  },
};
</script>

<style lang="scss" scoped></style>
