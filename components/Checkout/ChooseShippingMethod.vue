<template>
  <div>
    <van-radio-group v-model="choosenShippingMethod">
      <van-cell-group>
        <van-cell
          v-for="(x, index) in shippingOption"
          :key="index"
          class="shadow"
          clickable
          @click="chooseShipping(index)"
        >
          <template #title>
            <span class="custom-title is-size-6">{{ x.carrier_title }}</span>

            <span class="shipping-price">
              {{ x.amount.currency }}{{ x.amount.value }}
            </span>
          </template>
          <van-radio slot="right-icon" :name="index" />
          <!-- <van-icon slot="icon" size="25" name="/logos/wechat.svg" /> -->
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: ["shippingOption"],
  data() {
    return {
      choosenShippingMethod: 0,
    };
  },
  methods: {
    chooseShipping(index) {
      this.choosenShippingMethod = index;

      let { carrier_code, method_code } = this.shippingOption[index];

      this.$store.dispatch("cart/setShippingMethodsOnCart", {
        carrier_code,
        method_code,
        cartId: this.$route.params.cartId,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
