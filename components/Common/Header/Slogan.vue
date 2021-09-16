<template>
  <div class="my-flex">
    <!-- <van-grid
      class=""
      style="font-weight: bold; font-size: 1.3rem"
      direction="horizontal"
      :column-num="2"
      :border="false"
      :color="'#fff'"
    >
      <van-grid-item icon="logistics" text="MONEY BACK GUARANTEE" />
      <van-grid-item icon="logistics" text="ONLINE SUPPORT 24/7 " />
    </van-grid> -->

    <div
      v-for="(x, index) in icons"
      :key="index"
      class="each-alo my-flex"
      style="margin-right: 1rem"
    >
      <van-icon size="20" :name="x.icon" style="margin-right: 1rem" />
      <div class="text">
        {{ x.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          icon: "refund-o",
          text: "MONEY BACK GUARANTEE",
        },
        {
          icon: "flower-o",
          text: "ONLINE SUPPORT 24/7",
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
