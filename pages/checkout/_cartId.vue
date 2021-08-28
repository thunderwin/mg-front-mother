<template>
  <div>
    <div class="cather" style="overflow: hidden; max-width: 100%">
      <!-- <PromoteEyeCatcher></PromoteEyeCatcher> -->
      <!-- <OrderReverseNote /> -->
    </div>

    <client-only>
      <div class="columns" v-if="$device.isDesktop">
        <div class="column is-7">
          <div style="margin-bottom: 3rem; padding: 2rem" class="shadow">
            <UserEditContact
              style="width: 100%"
              @submit="contactSubmit"
              ref="editAddress"
            ></UserEditContact>

            <button
              v-if="$device.isDesktop"
              class="button is-capitalized"
              :class="isLoading ? 'is-loading' : ''"
              style="margin-top: 2rem"
              :style="{
                backgroundColor: $store.state.S.mainButtonColor,
              }"
              @click="$refs.editAddress.submitContact()"
            >
              {{ $t("c.continue_to_payment") }}
            </button>
          </div>
        </div>
        <div style="padding: 0.75rem 1rem" class="column">
          <CheckoutSummary />
        </div>
      </div>

      <div class="mob" v-if="$device.isMobileOrTablet">
        <!-- <LazyCheckoutRightBlock :cartId="cartId" /> -->

        <CheckoutDropdownSummary v-if="cart" :cart="cart" />

        <UserEditContact
          style="padding: 1.5rem"
          @submit="contactSubmit"
          ref="editAddress"
        ></UserEditContact>
      </div>
    </client-only>

    <!-- 编辑地址 -->
    <!-- <div class="">
      <EditAddress ref="addressEditer" @submit="FinalCheckPass"></EditAddress>
    </div> -->
    <!-- 编辑地址 -->
    <!-- 选择物流方式 -->
    <!-- <ShippingMethod
      :options="$store.getters['checkout/checkoutShippingMethod']"
      :emptyText="T['inputAddressFirst']"
    ></ShippingMethod> -->
    <!-- 选择物流方式 -->
    <!-- 选择支付方式 -->

    <!-- <ChoosePayment :options="paymentMethod"></ChoosePayment> -->
    <!-- 选择支付方式 -->
    <!-- <CheckoutSummy style="margin-top:1rem"></CheckoutSummy> -->

    <!-- <mq-layout mq="md+" style="margin-bottom:2rem">
      <MyButton :text="T['completeOrder']" @click="submit"></MyButton>
    </mq-layout> -->

    <!--
    <van-submit-bar
      class="shadow"
      style="z-index: 50"
      :currency="$store.getters['cart/cartCurrency']"
      :label="'Total'"
      :price="0"
      button-text="Continue to shipping"
      @submit="submit"
      :button-color="$store.state.C.shopColor"
    /> -->
    <div class="spacer"></div>

    <van-goods-action
      v-if="$device.isMobileOrTablet"
      style="overflow: hidden; width: 100%"
      class="van-hairline--top bg-white"
    >
      <van-goods-action-button
        :color="'#000'"
        type="danger"
        :loading="isLoading"
        @click="$refs.editAddress.submitContact()"
        text="Continue "
        style="font-weight: bold"
      />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  layout: "checkout",

  async validate({ params, query, store }) {
    if (!params.cartId) return false;
    return true;
  },

  scrollToTop: true,

  components: {},

  beforeMount() {
    this.initCheckout();
  },

  data() {
    return {
      cartId: "",
      address: null,
      cart: {},

      isLoading: false,
    };
  },

  methods: {
    goShippingPayment() {
      console.log("%c ????", "color:green;font-weight:bold");
      console.log(JSON.stringify(11));

      this.$formulate.submit("contact"); // 提交地址
      this.$router.push("/checkout/shipping-payment/" + this.cartId);
    },
    async initCheckout() {
      let cartId = this.$route.params.cartId;
      this.cartId = cartId;

      console.dir("购物车ID");
      console.log(JSON.stringify(cartId));

      let cart = await this.$store.dispatch("cart/fetchCart", {
        cartId,
      });

      if (!cart) {
        this.$nuxt.error({ message: "page not found", statusCode: 404 });
        return;
      }

      // console.log("%c 购物车信息", "color:green;font-weight:bold");
      // console.log(JSON.stringify(cart));

      let oldAddress = {};

      if (cart.shipping_addresses && cart.shipping_addresses.length > 0) {
        oldAddress = cart.shipping_addresses[0];
      }

      if (cart.email) {
        oldAddress.email = cart.email;
      }

      this.cart = cart;

      // region 要特殊处理下
      if (oldAddress.region) {
        oldAddress.province = oldAddress.region.label;
      }
      this.$refs.editAddress.oldAddress = oldAddress;
    },

    async FinalCheckPass(e) {
      // 真正的开始支付

      console.log("%c 开始支付", "color:green;font-weight:bold");

      console.dir("最终表单的输入");
      console.log(JSON.stringify(e));

      // let realTimeEmail = this.$store.state.checkout.inputedEmail;
      // let orderSummyEmail = this.$store.getters[
      //   "checkout/savedCheckoutSummyEmail"
      // ];
      // if (realTimeEmail !== orderSummyEmail) {
      //   console.log("%c 结账邮箱被改变", "color:green;font-weight:bold");
      //   console.log(JSON.stringify(realTimeEmail));
      //   console.log(JSON.stringify(orderSummyEmail));
      //   await this.$store.dispatch("checkout/update"); // 要等到地址更新好啦才结账
      // }

      // 结账之前，需要先看下地址有没有被修改过
      let realTimeAddress = e;

      let inputedAddress = this.$store.state.checkout.inputedAddress;

      console.log("%c 已经被保存的地址", "color:green;font-weight:bold");
      console.log(JSON.stringify(inputedAddress));

      for (let x in realTimeAddress) {
        if (realTimeAddress[x] !== inputedAddress[x]) {
          console.log("%c 有一个地址被改变", "color:green;font-weight:bold");
          console.log(JSON.stringify(x + ":" + inputedAddress[x]));
          await this.$store.dispatch("checkout/update"); // 要等到地址更新好啦才结账
          break; // 只要检测到有任何地方改掉，就重新存一次地址，
        }
      }

      console.log("%c 没毛病啦，正式去支付", "color:green;font-weight:bold");

      this.$store.dispatch("payment/create");
    },

    async contactSubmit(contactInfo) {
      this.isLoading = true;
      console.log("%c 最终的地址信息", "color:green;font-weight:bold");
      console.log(JSON.stringify(contactInfo));
      this.contactInfo = contactInfo;

      console.log("%c this.$route", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.$route.params));

      let r = await this.$store.dispatch("cart/addContactCart", {
        contact: contactInfo,
        cartId: this.$route.params.cartId,
      });

      this.isLoading = false;

      if (!!r) {
        console.log(
          "%c 设置两个地址成功，开始选择物流和支付方式",
          "color:green;font-weight:bold"
        );

        // this.shippingOption =
        //   r.cart.shipping_addresses[0].available_shipping_methods;

        return;
      }

      if (r) {
        // this.orderId = r;
        // this.activeName = "2";
        let newOrderId = await this.$store.dispatch("cart/pay", { orderId: r }); // 直接  下单
        console.log("%c 新订单id", "color:green;font-weight:bold");
        console.log(JSON.stringify(newOrderId));
        this.payObj = await this.$store.dispatch("cart/pay", {
          orderId: r,
        });

        console.log("%c 准备支付的参数", "color:green;font-weight:bold");
        console.log(JSON.stringify(this.payObj));

        // return;

        this.$nextTick(() => {
          document.payFormCcard.submit();
        });
      }
    },

    // async chosenShippingMethod(value) {
    //   console.log("%c 被选中的物流方式", "color:green;font-weight:bold");

    //   console.log(JSON.stringify(value));

    //   this.$store.dispatch("checkout/update", {
    //     shippingLine: { shippingRateHandle: value }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.checkout-wrapper .is-fullwidth {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
.checkout-wrapper .is-size-5 {
  margin-bottom: 1rem;
}

.van-collapse-item__content {
  color: #000000 !important;
  font-size: 16px !important;
}

.section_title {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  padding: 1rem 0;
  display: flex;
}
.dot_number {
  width: 30px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  text-align: center;
  color: #fff;
}
</style>
