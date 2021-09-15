<template>
  <van-grid
    style="margin: 1rem 0"
    :border="false"
    :center="false"
    :gutter="'1rem'"
    :column-num="$device.isDesktop ? 6 : 2"
  >
    <van-grid-item v-for="(x, index) in 12" :key="index">
      <content-placeholders rounded>
        <content-placeholders-img style="height: 250px" />
        <content-placeholders-text :lines="2" />
      </content-placeholders>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
