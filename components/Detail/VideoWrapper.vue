<template>
  <div>
    <van-grid :border="false" :center="false" :column-num="2">
      <van-grid-item v-for="(x, index) in videoList" :key="index">
        <BaseVideoPlayer :x="x" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ["videoList"],
};
</script>

<style lang="scss" scoped></style>
