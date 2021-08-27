<template>
  <div class="cart-wapper">
    <client-only>
      <div v-if="$fetchState.pending" class="loading">
        <section class="section">
          <div class="container">
            <van-row class="" gutter="30">
              <van-col span="16">
                <content-placeholders rounded>
                  <content-placeholders-text :lines="2" />
                  <content-placeholders-img />
                  <content-placeholders-img />
                </content-placeholders>
              </van-col>

              <van-col span="8">
                <content-placeholders rounded>
                  <content-placeholders-text :lines="3" />
                  <content-placeholders-img />
                  <content-placeholders-img />
                </content-placeholders>
              </van-col>
            </van-row>
          </div>
        </section>
      </div>

      <div v-else class="done">
        <div v-if="!!cart" class="cart-has-items">
          <section v-if="$device.isDesktop" class="section">
            <div class="container">
              <CartPromo />
              <div class="shopping_cart">
                <div class="checkout-container container">
                  <!-- {{ cart }} -->
                  <div
                    class="is-size-4"
                    style="text-transform: capitalize; margin-bottom: 1rem"
                  >
                    <span> {{ $t("c.shopping_cart") }}</span>
                    <span style="font-weight: normal">
                      ( {{ cart.total_quantity }} {{ $t("c.items") }} )</span
                    >
                  </div>

                  <van-row class="" gutter="30">
                    <van-col span="16">
                      <div
                        class="cart-item shadow"
                        style="margin-bottom: 2rem"
                        v-for="(items, index) in cart.items"
                        :key="index"
                      >
                        <CartLineItem :x="items" :mob="false"></CartLineItem>
                      </div>
                    </van-col>

                    <van-col span="8">
                      <div class="is-size-4">Summary</div>

                      <CartCoupon
                        v-if="cart"
                        @reloadCart="reloadCart"
                        :cart="cart"
                      />
                      <CartSummy :cart="cart" style="margin-top: 1rem" />

                      <CartGoCheckoutButtons />
                    </van-col>
                  </van-row>
                </div>

                <!-- 建议 -->
                <!-- <mq-layout mq="sm">
        <div class="spacer"></div>
        <van-submit-bar :price="12" button-text="提交订单" @submit="onSubmit" />
      </mq-layout> -->
              </div>
            </div>
          </section>

          <CheckoutMobCartPopup v-if="$device.isMobileOrTablet" />
        </div>

        <div v-else>
          <div
            class="container has-text-grey is-uppercase"
            style="text-align: center; margin: 2rem auto"
          >
            <van-icon color="#eaeaea" size="50" name="cart-o" />
            <div class="is-size-4" style="">
              <p>Your Cart is empty</p>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  scrollToTop: true,

  components: {},
  created() {
    this.$fetch();
  },
  data() {
    return {
      emptyCart: false,
      crossItems: [],
      isLoading: false,
      cart: null,
      cartId: "",
    };
  },
  async fetch() {
    if (process.client) {
      let code = this.$i18n.locale;
      let cartIds = this.$store.state.cart.cartId;
      let cartId = cartIds[code];

      this.cartId = cartId;

      if (!cartId) return;
      this.cart = await this.$store.dispatch("cart/fetchCart", {
        cartId: this.cartId,
      });
    }
  },

  methods: {
    async reloadCart() {
      console.log("%c 重新load购物车", "color:green;font-weight:bold");
      this.cart = await this.$store.dispatch("cart/fetchCart", {
        cartId: this.cart.id,
      });

      // this.getShoppingCartCross();
    },

    async paypalPay() {
      this.$store.dispatch("payment/createPaypalExpressToken");
    },

    onSubmit() {
      this.$router.push(this.localePath("/checkout"));
    },
    checkout() {
      this.$router.push(this.localePath("/checkout"));
    },

    async getShoppingCartCross() {
      return;
      let r = await this.$store.dispatch("product/list", { categoryId: 13 });
      console.log("%c 交叉销售产品", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));
      this.crossItems = r;
    },

    async getCrossSell() {
      let obj = {};

      let crossSellSku = this.cart.items.map((x) => x.product.sku);

      console.log("%c crossSellSku", "color:green;font-weight:bold");
      console.log(JSON.stringify(crossSellSku));
      crossSellSku.forEach((x) => {
        if (obj[x] || obj[x] === 0) {
          obj[x] += 1;
        } else {
          obj[x] = 0;
        }
      });
      // console.log("%c crossSellSku", "color:green;font-weight:bold");
      // console.log(JSON.stringify(obj));

      let finalSkus = Object.keys(obj)
        .map((x) => ({
          sku: x,
          qty: obj[x],
        }))
        .sort((a, b) => a.qty - b.qty);

      console.log("%c finalSkus", "color:green;font-weight:bold");
      console.log(JSON.stringify(finalSkus));

      let sku = finalSkus[0].sku;

      this.crossItems = await this.$store
        .dispatch("product/related", { sku: sku })
        .then();

      console.log("%c this.crossItems", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.crossItems));
    },
  },
};
</script>

<style lang="scss">
.shopping_cart .van-grid-item__content {
  padding: 0 !important;
}
</style>
