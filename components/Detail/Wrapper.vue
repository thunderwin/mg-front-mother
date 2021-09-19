<template>
  <div id="detailTop">
    <DetailSlider style="overflow: hidden" :x="x" />

    <DetailProductTitle :x="x" />

    <DetailCustomWrapper
      id="custom-option-wrapper"
      v-if="x.options && x.options.length > 0 && isSpecialItem === 'nomal'"
      :option="x.options"
      ref="customOption"
      style="padding: 1rem"
    />

    <!-- <DetailDesc :x="x" /> -->

    <van-cell-group style="margin: 1rem 0">
      <van-cell
        icon="diamond-o"
        title="Return policy"
        @click="showPopup"
        is-link
      />
    </van-cell-group>

    <van-cell-group>
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
    </van-cell-group>

    <van-popup
      closeable
      v-model="showPopup"
      :lock-scroll="true"
      :safe-area-inset-bottom="true"
      get-container="body"
      :duration="0.1"
      :style="{ height: '80%', width: '100%' }"
    >
      <component :x="x" :is="'Detail' + curretPopupComponent" />
    </van-popup>

    <DetailAttList
      class="van-hairline--bottom text-capitalize"
      style="padding: 1rem"
      v-if="x.atts && x.atts.length > 0"
      :atts="x.atts"
    />

    <!-- <van-goods-action
      v-if="$device.isMobileOrTablet && isSpecialItem === 'nomal'"
      style="overflow: hidden; width: 100%; z-index: 100000"
      class="van-hairline--top bg-white"
    >
      <van-goods-action-icon :to="'/'" icon="shop-o" text="Home" />
      <van-goods-action-icon :to="'/cart'" icon="cart-o" text="Cart" />

      <van-goods-action-button
        :color="'#000'"
        type="danger"
        @click="addToCart"
        :loading="addingCart"
        text="Add to Cart"
        style="font-weight: bold"
      />
    </van-goods-action> -->

    <!-- <van-popup
      closeable
      v-model="showDesc"
      :lock-scroll="true"
      :safe-area-inset-bottom="true"
      get-container="body"
      position="bottom"
      :duration="0.1"
      :style="{ height: '80%', width: '100%' }"
    >
      <div class="container detail_desc" style="padding: 1rem">
        <div
          style=""
          id="review"
          v-if="x.description"
          class="desc"
          v-html="x.description.html"
        ></div>
      </div>
    </van-popup> -->

    <LazyDetailRelatedProduct style="" :catgoryIds="x.categories" />

    <LazyDetailReviewListReviewSpace :sku="x.sku" />

    <section
      class=""
      id="leave_review"
      style="margin-top: 30px; max-width: 600px; margin: 30px auto"
    >
      <div class="">
        <div class="is-size-4 has-text-centered">Leave review</div>
        <client-only>
          <DetailReviewAddReviewSpace :sku="x.sku" />
        </client-only>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["x"],

  data() {
    return {
      sku: "",
      activeTab: 0,

      addingCart: false,
      showDesc: false,
      showPopup: false,

      curretPopupComponent: "Desc", // 当前显示的弹出
    };
  },
  computed: {
    tabs() {
      return [
        {
          label: this.$t("c.desc"),
          href: "desc",
        },
        {
          label: this.$t("c.review"),
          href: "review",
        },
      ];
    },

    isSpecialItem() {
      if (this.x.categories.find((x) => x.id === 216)) {
        return "cabinets";
      } else if (this.x.categories.find((x) => x.id === 48)) {
        return "spcflooring";
      } else {
        return "nomal";
      }
    },
  },

  methods: {
    showDynamic(name) {
      this.curretPopupComponent = name;
      this.showPopup = true;
    },
    descriptionClick() {
      this.showDesc = true;
    },
    goReview() {
      console.log("%c ????", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      this.scrollToId("#reviews");
    },

    async addToCart() {
      let chosenOption; // 自定义属性

      //1  判断是什么类型的产品
      if (this.x.options && this.x.options.length > 0) {
        console.log("%c this.$refs", "color:green;font-weight:bold");
        console.log(this.$refs);

        let checkRsult = this.$refs.customOption.checkIfChosen();

        console.log("%c checkRsult", "color:green;font-weight:bold");
        console.log(JSON.stringify(checkRsult));

        if (!checkRsult) {
          this.scrollToId("#custom-option-wrapper");
          return;
        }

        chosenOption = this.$refs.customOption.chosen;

        console.log("%c this.chosenOption", "color:green;font-weight:bold");
        console.log(JSON.stringify(chosenOption));
      }

      let payload = {
        qty: 1,
        sku: this.$route.params.sku,
      };

      if (!!chosenOption) {
        payload.chosenOption = chosenOption;
      }

      this.addingCart = true;
      let addedResult = await this.$store.dispatch("cart/universalAddCart", {
        payload,
        item: this.x,
      });

      this.addingCart = false;

      return true;
    },
    buyNow() {},

    async login(id) {
      await this.rtm.login(id);
      let newChannel = await this.rtm.createChannel("asasd");

      console.log("%c newcgabe ", "color:green;font-weight:bold");
      console.log(JSON.stringify(newChannel));

      this.rtm.on("MessageFromPeer", async (message, peerId) => {
        console.log("%c 收到消息", "color:green;font-weight:bold");
        console.log(JSON.stringify(message));

        console.log("%c 来自", "color:green;font-weight:bold");
        console.log(JSON.stringify(peerId));
      });
    },

    async getProductDetail() {
      let r = await this.$store.dispatch("product/detail", { sku: this.sku });

      console.log("%c 产品详情", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      this.x = r;

      return;
    },

    scroll() {
      this.$refs.scroll.scrollTop = 0;
    },
  },
};
</script>

<style lang="scss">
.detail_desc {
  strong {
    margin-bottom: 1rem;
  }
  .sc {
    margin: 1rem 0;
    tr {
      color: #666;
      line-height: 40px;
      padding: 0 1rem;
      td {
        padding: 0 1rem;
        text-align: center;
        vertical-align: middle;
      }
    }
    tr:nth-child(odd) {
      background-color: #f5f6f8;
    }
  }

  .sizetable {
    margin-bottom: 1rem;
    tr {
      td {
        border: 1px solid #ddd;
        text-align: center;
        vertical-align: middle;
        padding: 0.2rem;
      }
    }
    font-size: 0.8rem;
  }
}
</style>
