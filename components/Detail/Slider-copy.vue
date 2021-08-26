<template>
  <div class="wrapper">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          :style="{
            backgroundImage: `url()`,
            backgroundSize: 'cover',
            backgroundColor: '#ededed',
          }"
          v-for="(slider, index) in x.media_gallery"
          :key="index"
        >
          <div class="item-images">
            <van-image
              height="auto"
              width="100%"
              lazy-load
              fit="contain"
              :src="slider.url"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </div>
        <div class="swiper-pagination">1</div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </div>

    <div
      v-swiper:mySwiper="swiperOptionThumbs"
      class="swiper gallery-thumbs my-flex"
      ref="swiperThumbs"
    >
      <div
        v-for="(slider, index) in x.media_gallery"
        :key="index"
        class="swiper-slide"
      >
        <van-image height="auto" lazy-load fit="contain" :src="slider.url">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
  </div>
</template>

<script>
//https://www.swiper.com.cn/api/index.html
export default {
  props: ["x"],

  data() {
    return {
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },

  mounted() {
    console.dir("x.media_gallery");
    console.log(JSON.stringify(this.x.media_gallery.length));
  },

  computed: {
    swiperOption() {
      return {
        // slidesPerView: this.fileList.length,
        // grabCursor: true,
        // spaceBetween: 10,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        //显示分页
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
</style>
