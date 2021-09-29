<template>
  <div>
    <div
      v-if="$device.isMobileOrTablet"
      class="container"
      gutter="30"
      style="background-color: #fafafa"
    >
      <DetailSlider style="overflow: hidden" :x="x" />

      <DetailProductTitle
        @scrollToId="scrollToId"
        style="padding: 0.5rem 1rem"
        :x="x"
      />

      <DetailCustomWrapper
        id="custom-option-wrapper"
        v-if="x.options && x.options.length > 0"
        :option="x.options"
        ref="customOption"
        style="padding: 1rem; background-color: #fff"
        @doAddCart="doAddCart"
      />

      <!-- <DetailAttList
        class="van-hairline--bottom text-capitalize"
        style="padding: 1rem"
        v-if="x.atts && x.atts.length > 0"
        :atts="x.atts"
      /> -->

      <DetailPopGroup :x="x" />

      <div class="detail_desc" style="padding: 1rem; background-color: #fff">
        <div
          style=""
          id="review"
          v-if="x.description"
          class="desc"
          v-html="x.description.html"
        ></div>
      </div>
    </div>

    <van-row
      v-if="$device.isDesktop"
      class="container"
      gutter="30"
      style="margin-top: 1.5rem"
    >
      <van-col span="12">
        <div class="detail_pc" style="margin-bottom: 2rem; margin-top: 8px">
          <DetailSlider :x="x" />
        </div>
      </van-col>

      <van-col span="12">
        <div class="right">
          <DetailProductTitle
            @scrollToId="scrollToId"
            :x="x"
            style="margin-bottom: 1rem"
          />

          <div class="action-area" v-if="isSpecialItem === 'nomal'">
            <DetailCustomWrapper
              v-if="x.options && x.options.length > 0"
              :option="x.options"
              ref="customOption"
              id="custom-option-wrapper"
              @doAddCart="doAddCart"
            />

            <div v-if="x.__typename === 'BundleProduct'" class="is-bundle">
              {{ x.__typename }} 还不被支持，请别使用
            </div>

            <div class="action-btns" style="margin: 2rem 0">
              <!-- <button class="button" @click="buyNow">Buy now</button> -->

              <button
                class="button is-medium"
                :class="addingCart ? 'is-loading' : ''"
                :style="{
                  backgroundColor: $store.state.S.mainColor,
                }"
                @click="addToCart"
              >
                Add to bag
              </button>
            </div>
          </div>

          <DetailAttList
            class="van-hairline--bottom"
            style="padding: 10px 0"
            v-if="x.atts && x.atts.length > 0"
            :atts="x.atts"
          />

          <div
            v-if="x.short_description && x.short_description.html"
            v-html="x.short_description.html"
            class="van-hairline--bottom"
            style="padding: 10px 0"
          ></div>

          <div class="container detail_desc">
            <div
              style=""
              id="review"
              v-if="x.description"
              class="desc"
              v-html="x.description.html"
            ></div>
          </div>
        </div>
      </van-col>
    </van-row>

    <!-- 如果有视频 -->
    <!-- <section v-if="videos.length > 0" class="section video-wrapper">
      <DetailVideoWrapper class="container" :videoList="videos" />
    </section> -->

    <!--
    <section class="section">
      <div class="container is-capitalized tabs is-centered is-boxed is-medium">
        <ul>
          <li
            v-for="(tab, tindex) in tabs"
            :key="tindex"
            :class="activeTab === tindex ? 'is-active' : ''"
          >
            <a :href="'#' + tab.href" @click="activeTab = tindex">{{
              tab.label
            }}</a>
          </li>
        </ul>
      </div>

      <div class="container desc">
        <div
          style=""
          id="review"
          v-if="x.description"
          class="desc"
          v-html="x.description.html"
        ></div>
      </div>
    </section> -->

    <!-- // 相关产品 -->

    <LazyDetailRelatedProduct style="" :catgoryIds="x.categories" />

    <LazyDetailReviewListReviewSpace :sku="$route.params.sku" />

    <section
      class=""
      id="reviews"
      style="margin-top: 30px; max-width: 600px; margin: 30px auto"
    >
      <div id="leave_review">
        <div class="is-size-4 has-text-centered">Leave review</div>
        <client-only>
          <DetailReviewAddReviewSpace :sku="$route.params.sku" />
        </client-only>
      </div>
    </section>

    <van-goods-action
      v-if="$device.isMobileOrTablet"
      style="overflow: hidden; width: 100%; z-index: 1000"
      class="van-hairline--top bg-white"
    >
      <van-goods-action-icon :to="'/'" icon="shop-o" text="Home" />
      <van-goods-action-icon :to="'/cart'" icon="cart-o" text="Cart" />

      <van-goods-action-button
        :color="'#000'"
        type="danger"
        @click="addToCart"
        :loading="addingCart"
        text="Add to Bag"
        style="font-weight: bold"
      />
    </van-goods-action>
  </div>
</template>

<script>
// import AgoraRTM from "@/static/js/agora-rtm-sdk-1.4.2.js";

export default {
  scrollToTop: true,
  watchQuery: ["sku"],
  validate({ params, query }) {
    if (params["sku"]) {
      return true;
    }
    return false; // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
  },

  mounted() {
    // console.log(this.$route);
  },
  // middleware: ["auth"],
  data() {
    return {
      x: "",
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

  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    let r = await store.dispatch("product/detail", { sku: params.sku });

    console.log("%c 产品详情", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    let media = r.media_gallery;

    let videos = media.filter((x) => x.video_content);

    return {
      x: r,
      videos,
    };
  },

  methods: {
    async doAddCart(chosenOption) {
      console.log("%c 执行加入", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      let payload = {
        qty: 1,
        sku: this.$route.params.sku,
      };

      if (!!chosenOption) {
        payload.chosenOption = chosenOption;
      }

      this.addingCart = true;

      await this.$store.dispatch("cart/universalAddCart", {
        payload,
        item: this.x,
      });

      this.addingCart = false;

      return true;
    },
    addToCart() {
      //1  判断是什么类型的产品
      if (this.x.options && this.x.options.length > 0) {
        // console.log("%c this.$refs", "color:green;font-weight:bold");
        // console.log(this.$refs);

        this.$formulate.submit("customOption");

        // console.log("%c checkRsult", "color:green;font-weight:bold");
        // console.log(JSON.stringify(checkRsult));

        // if (!checkRsult) {
        //   this.scrollToId("#custom-option-wrapper");
        //   return;
        // }

        // chosenOption = this.$refs.customOption.chosen;

        // console.log("%c this.chosenOption", "color:green;font-weight:bold");
        // console.log(JSON.stringify(chosenOption));
      }
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

    scrollToId(item) {
      console.log("%c ?", "color:green;font-weight:bold");
      console.log(JSON.stringify(item));

      // let idItem = document.getElementById(item);
      let anchor = this.$el.querySelector(item); //计算传进来的id到顶部的距离
      this.$nextTick(() => {
        // console.log(anchor.offsetTop)
        window.scrollTo(0, anchor.offsetTop); //滚动距离因为导航栏固定定位130px的高度
      });
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
