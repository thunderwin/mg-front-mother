<template>
  <div class="detail-slider">
    <van-swipe
      v-if="$device.isMobileOrTablet"
      class="my-swipe"
      :loop="false"
      indicator-color="black"
      width="260"
    >
      <van-swipe-item v-for="(slider, index) in imgs" :key="index">
        <van-image height="auto" lazy-load fit="contain" :src="slider.url">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
      <!-- <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template> -->
    </van-swipe>

    <div
      v-if="$device.isDesktop"
      class="desktop-alumn my-flex"
      style="align-items: flex-start"
    >
      <div class="verfuilal-list" style="">
        <div v-for="(z, index) in imgs" :key="index">
          <div class="" style="margin-bottom: 0.5rem">
            <van-image
              @mouseenter.native="hoverImg(index)"
              width="100%"
              :src="z.url"
            />
          </div>
        </div>
      </div>

      <div class="slll" style="width: 88%">
        <van-swipe
          ref="swipe"
          class="my-swipe"
          :loop="false"
          indicator-color="black"
        >
          <van-swipe-item v-for="(slider, index) in imgs" :key="index">
            <van-image height="auto" lazy-load fit="contain" :src="slider.url">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </van-swipe-item>
          <!-- <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/4</div>
          </template> -->
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],
  data() {
    return {
      current: 0,
      swiperOption: {
        // slidesPerView: this.fileList.length,
        // grabCursor: true,
        spaceBetween: 10,
        direction: "vertical",
        slidesPerView: 5,

        //显示分页
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    imgs() {
      if (this.x.imglist) {
        let ary = JSON.parse(this.x.imglist);
        return ary;
      }

      return this.x.media_gallery;
    },

    pcImgs() {},
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    hoverImg(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
      this.current = e;
      this.$refs.swipe.swipeTo(e, { immediate: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-slider {
  .swiper-button-prev {
    top: -30px !important;
    transform: rotate(-270deg);
  }
  .swiper-button-next {
    top: 100% !important;
    transform: rotate(90deg);
  }
  .verfuilal-list {
    margin-right: 1rem;
    max-height: 800px;
    width: 10%;
    overflow-y: scroll;
    cursor: pointer;
  }
  .verfuilal-list:-webkit-scrollbar {
    display: none;
  }
  .custom-indicator {
    position: absolute;
    bottom: 1rem;
    left: -2rem;
  }
}
</style>
