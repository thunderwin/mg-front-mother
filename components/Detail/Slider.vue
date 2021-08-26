<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
      <van-swipe-item v-for="(slider, index) in imgs" :key="index">
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
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["x"],
  computed: {
    imgs() {
      if (this.x.imglist) {
        let ary = JSON.parse(this.x.imglist);
        return ary;
      }

      return this.x.media_gallery;
    },
  },
};
</script>

<style lang="scss" scoped></style>
