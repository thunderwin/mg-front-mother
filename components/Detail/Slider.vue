<template>
  <div>
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

    <div v-if="$device.isDesktop" class="desktop-alumn">
      <van-grid
        :border="false"
        :center="false"
        :column-num="2"
        gutter="0"
        :clickable="true"
      >
        <van-grid-item v-for="(z, index) in imgs" :key="index">
          <div
            :style="{
              textAlign: 'center',
            }"
            class=""
          >
            <div class="subcate" style="">
              <van-image width="100%" :src="z.url" />
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
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

    pcImgs() {},
  },
};
</script>

<style lang="scss" scoped></style>
