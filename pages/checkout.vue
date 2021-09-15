<template>
  <div class="">
    <div>
      <div class="container" style="max-width: 1000px">
        <CheckoutNiceHeader />
        <CheckoutSteps />

        <!-- <div class="is-size-4 is-capitalized" style="margin: 1rem 0">
          {{ $t("c.checkout") }}
        </div> -->
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,

  data() {
    return {
      cart: {},
    };
  },

  name: "global-header",
  mounted() {},
  computed: {},

  methods: {
    // continueTo() {
    //   let routeName = this.$route.name;
    //   if (routeName === this.checkoutSteps[0]) {
    //     // 第一步
    //     this.$formulate.submit("contact"); // 提交地址
    //     this.$router.push("/checkout/shipping-payment/" + cartId);
    //   } else if (routeName === this.checkoutSteps[1]) {
    //     this.$router.push();
    //   }
    //   return;
    // },
  },
};
</script>

<style>
.action-bar {
  position: fixed;
  width: calc(100% - 320px);
  top: 60px;
  background-color: #ddd;
  z-index: 999;
}
.home-left {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  z-index: 1;
  min-width: 320px;
  max-width: 320px;
  overflow-y: scroll;
  background-color: #fff;
  border-right: 1px solid #e1e4e8;
}
.home-right {
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 320px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #fff;
}
</style>
