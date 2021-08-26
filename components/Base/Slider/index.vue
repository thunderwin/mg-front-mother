<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        :style="{
          backgroundImage: `url()`,
          backgroundSize: 'cover',
          backgroundColor: '#ededed',
        }"
        v-for="(x, index) in fileList"
        :key="index"
      >
        <div class="item-images" v-if="x.file">
          <van-image width="1024px" height="439px" fit="contain" :src="x.file">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </div>
    </div>
    <div v-if="fileList.length > 1" class="swiper-pagination"></div>
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
</template>

<script>
// import rowSwipeItem from "@/components/front/common/rowSwipeItem";
// import rowSwipeItemMob from "@/components/front/common/rowSwipeItemMob";
export default {
  props: ["fileList"],

  data() {
    return {};
  },
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
  components: {
    // rowSwipeItemMob,
    // rowSwipeItem,
  },

  methods: {
    goforceUpdate() {
      console.dir("重新更新");
    },
  },
};
</script>

<style lang="scss" scoped></style>
