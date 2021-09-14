<template>
  <div>
    <DetailSlider style="overflow: hidden" :x="x" />

    <div class="is-size-4 has-text-grey-dark" style="padding: 1rem 1rem 0 1rem">
      {{ x.name }}
    </div>

    <div class="review_summy" style="padding: 0 1rem">
      <div
        v-if="!!x.review_count"
        class="item-ranking-review my-flex van-hairline--bottom"
        style="justify-content: flex-start; padding: 10px 0"
        @click="goReview"
      >
        <van-rate
          color="#ffd21e"
          v-model="x.rating_summary"
          readonly
          style="margin-right: 10px"
        />
        <a @click="scrollToId('#reviews')">{{ x.review_count }} ratings</a>
      </div>

      <a v-else href="#leave_review" class="" style="color: #7bcbc1">
        Be the first to review this product
      </a>
    </div>

    <BaseShowItemPrice
      v-if="x.price_range"
      :price_range="x.price_range"
      :fontSize="4"
      style="padding: 0 1rem"
    />

    <!-- // 简单描述 -->
    <div
      v-if="x.short_description && x.short_description.html"
      v-html="x.short_description.html"
      class="desc van-hairline--bottom"
      style="padding: 1rem"
    ></div>

    <DetailCustomWrapper
      id="custom-option-wrapper"
      v-if="x.options && x.options.length > 0 && isSpecialItem === 'nomal'"
      :option="x.options"
      ref="customOption"
      style="padding: 1rem"
    />

    <DetailAttList
      class="van-hairline--bottom text-capitalize"
      style="padding: 1rem"
      v-if="x.atts && x.atts.length > 0"
      :atts="x.atts"
    />
    <div class="container detail_desc" style="padding: 1rem">
      <div
        style=""
        id="review"
        v-if="x.description"
        class="desc"
        v-html="x.description.html"
      ></div>
    </div>

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
  </div>
</template>

<script>
// import AgoraRTM from "@/static/js/agora-rtm-sdk-1.4.2.js";

export default {
  props: ["x"],

  data() {
    return {
      sku: "",
      activeTab: 0,

      addingCart: false,
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
    goReview() {
      console.log("%c ????", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      this.scrollToId("#reviews");
    },
    scrollToId(item) {
      console.log("%c ?", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      // let idItem = document.getElementById(item);
      let anchor = this.$el.querySelector(item); //计算传进来的id到顶部的距离
      this.$nextTick(() => {
        // console.log(anchor.offsetTop)
        window.scrollTo(0, anchor.offsetTop); //滚动距离因为导航栏固定定位130px的高度
      });
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
