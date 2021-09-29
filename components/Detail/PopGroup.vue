<template>
  <div>
    <van-cell-group style="margin: 1rem 0">
      <van-cell
        icon="diamond-o"
        title="Return policy"
        @click="showPopup"
        is-link
      />
    </van-cell-group>

    <!-- <van-cell-group>
      <van-cell title="Size" @click="showDynamic('Size')" is-link />

      <van-cell-group>
        <van-cell title="Shipping" @click="showDynamic('Shipping')" is-link />
      </van-cell-group>

      <van-cell
        title="Description"
        @click="showDynamic('Desc')"
        is-link
        value="Description"
      />
    </van-cell-group> -->

    <van-popup
      closeable
      v-model="showPopup"
      :lock-scroll="true"
      :safe-area-inset-bottom="true"
      get-container="body"
      position="bottom"
      :duration="0.1"
      :style="{ height: '80%', width: '100%' }"
    >
      <component :x="x" :is="'Detail' + curretPopupComponent" />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["x"],
  data() {
    return {
      showPopup: false,
      curretPopupComponent: "Desc", // 当前显示的弹出
    };
  },
  methods: {
    showDynamic(name) {
      this.curretPopupComponent = name;
      this.showPopup = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
