<template>
  <div style="padding: 30px">
    <h1>用户中心</h1>

    <van-grid :gutter="20">
      <van-grid-item v-for="(value, index) in list" :key="index">
        {{ value.name }}
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  scrollToTop: true,

  data() {
    return {};
  },
  computed: {
    list() {
      return [
        {
          name: "我的产品",
          url: "p",
        },
        {
          name: "我的订单",
          url: "order",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
