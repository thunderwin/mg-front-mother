<template>
  <div>
    <div
      class="tags are-medium is-center container"
      style="font-size: 1rem; margin: 1rem; color: #999"
    >
      <nuxt-link class="" :to="'/checkout/' + $route.params.cartId">
        <span
          :style="{
            color: $route.name === 'checkout-cartId___en' ? '#333' : '',
            margin: '0 .5rem 0 0 ',
          }"
          >Infomation</span
        >
      </nuxt-link>
      <span
        :style="{
          color: $store.state.S.mainColor,
        }"
        >></span
      >
      <div class="">
        <span
          :style="{
            color:
              $route.name === 'checkout-shipping-payment-cartId___en'
                ? '#333'
                : '',
            margin: '0 0.5rem',
          }"
          >Shipping & Payment</span
        >
      </div>
      <span
        :style="{
          color: $store.state.S.mainColor,
        }"
        >></span
      >
      <span class="" :style="{ margin: '0 0.5rem' }">Finished</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  computed: {},
};
</script>

<style lang="scss" scoped></style>
