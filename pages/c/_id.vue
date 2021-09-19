<template>
  <div>
    <div class="listingWrapper">
      <div v-if="$fetchState.pending" class="loading">
        <section :class="$device.isDesktop ? 'section' : ''">
          <div class="container">
            <content-placeholders rounded style="padding: 1rem 1rem">
              <content-placeholders-text :lines="2" />

              <content-placeholders-img style="height: 50px" />
            </content-placeholders>

            <PageCategoryItemPlaceholder slot="loading" />
          </div>
        </section>
      </div>

      <div style="padding: 0" v-if="list.length > 0">
        <!-- {{ allItem.length }} -->

        <PageCategoryDesc style="" :categorys="categorys" />

        <!-- {{ categorys.products.page_info }} -->
        <van-sticky>
          <PageCategorySorting
            style="background-color: #fff"
            :pageInfo="categorys.products.page_info"
            :total="categorys.products.total_count"
          />
        </van-sticky>

        <van-list
          style="margin-top: 1rem"
          v-model="loading"
          :finished="finished"
          finished-text="No more"
          loading-text="Loading..."
          @load="loadMore"
          class="container"
        >
          <PageCategoryItemPlaceholder slot="loading" />

          <van-grid
            :border="false"
            :center="false"
            :gutter="'1rem'"
            :clickable="true"
            :column-num="$device.isDesktop ? 6 : 2"
          >
            <van-grid-item
              v-for="(x, index) in list"
              :key="index"
              @click="openDetail(x)"
            >
              <!-- {{ x.name }} -->
              <BaseProduct :isClickable="false" class="shadow" :x="x" />
            </van-grid-item>
          </van-grid>
        </van-list>
      </div>
    </div>

    <van-popup
      closeable
      v-if="showDetail"
      v-model="showDetail"
      :lock-scroll="true"
      :safe-area-inset-bottom="true"
      get-container="body"
      :duration="0.1"
      :style="{ height: '100%', width: '100%' }"
    >
      <DetailWrapper ref="productdetail" :x="injectDetail" />
      <div class="spacer"></div>
    </van-popup>

    <van-submit-bar
      v-show="showDetail && $device.isMobileOrTablet"
      style="z-index: 20000"
      :price="
        injectDetail.price_range
          ? injectDetail.price_range.minimum_price.final_price.value * 100
          : 0
      "
      button-text="Add to cart"
      currency="$"
      :label="' '"
      :button-color="$store.state.S.mainColor"
      :loading="addingCart"
      @submit="onSubmit"
      class="van-hairline--top add-cart-box"
    >
      <!-- <van-icon name="arrow-left" size="1.5rem" />
      <van-icon name="cart-o" size="1.5rem" /> -->
      <van-button
        icon="arrow-left"
        @click="showDetail = false"
        type="default"
      />
      <van-button icon="cart-o" @click="clickCart" type="default" />

      <template #tip>
        <DetailCustomWrapper
          v-if="showDetail && showOptionChoosen"
          id="custom-option-wrapper"
          :option="injectDetail.options"
          ref="customOption"
          style="padding: 1rem"
          class="van-hairline--bottom"
        />
      </template>
    </van-submit-bar>

    <!-- <van-goods-action
      v-show="showDetail && $device.isMobileOrTablet"
      style="overflow: hidden; width: 100%; z-index: 100000"
      class="van-hairline--top bg-white"
    >
      <van-goods-action-icon :to="'/'" icon="shop-o" text="Home" />
      <van-goods-action-icon :to="'/cart'" icon="cart-o" text="Cart" />

      <van-goods-action-button
        :color="'#000'"
        type="danger"
        @click="addToCart"
        text="Add to Cart"
        style="font-weight: bold"
      />
    </van-goods-action> -->
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  watchQuery: true,

  name: "product-list-page",
  data() {
    return {
      showOptionChoosen: false, // 下面弹出选择选项的弹窗

      injectDetail: {},
      showDetail: false,
      addingCart: false,
      loading: false,
      finished: false,
      moreItems: [],
      pageInfo: "",
      list: [],

      categorys: {},

      currentPage: 1,
    };
  },
  mounted() {
    // this.scrollBackLastPostion();
  },

  // next-child 下不需要使用
  // watch: {
  //   "$route.params.id": function (id) {
  //     console.log("%c id", "color:green;font-weight:bold");
  //     console.log(JSON.stringify(id));
  //     this.currentPage = 1;
  //     this.list = [];
  //     this.categorys = {};
  //     this.$fetch();
  //   },
  // },

  methods: {
    scrollBackLastPostion() {
      let scroll = this.$store.state.scroll;

      console.log("%c mounted", "color:green;font-weight:bold");
      console.log(JSON.stringify(scroll));

      if (scroll > 0) {
        console.log("%c 没执行？", "color:green;font-weight:bold");
        console.log(JSON.stringify());

        this.$nextTick(() => {
          window.scrollTo(0, scroll);
        });
      }
    },
    clickCart() {
      this.showDetail = false;
      this.$store.commit("setCartPopup", true);
    },
    async onSubmit() {
      let chosenOption; // 自定义属性

      //1  判断是什么类型的产品
      if (this.injectDetail.options && this.injectDetail.options.length > 0) {
        //2 如果选项弹出层已经打开
        if (this.showOptionChoosen) {
          let checkOptionPopupResult = this.$refs.customOption.checkIfChosen();
          if (!checkOptionPopupResult) {
            console.log("%c 弹出层选项都没", "color:green;font-weight:bold");
            return;
          }
          chosenOption = this.$refs.customOption.chosen;
        } else {
          let checkRsult = this.$refs.productdetail.$refs.customOption.checkIfChosen();

          console.log("%c checkRsult", "color:green;font-weight:bold");
          console.log(JSON.stringify(checkRsult));

          if (!checkRsult) {
            console.dir("选项没选");

            this.showOptionChoosen = true;
            return;
          }

          chosenOption = this.$refs.productdetail.$refs.customOption.chosen;
        }
      }

      let payload = {
        qty: 1,
        sku: this.injectDetail.sku,
      };

      if (!!chosenOption) {
        payload.chosenOption = chosenOption;
      }

      this.addingCart = true;
      let addedResult = await this.$store.dispatch("cart/universalAddCart", {
        payload,
        item: this.injectDetail,
      });

      console.log("%c addedResult", "color:green;font-weight:bold");
      console.log(JSON.stringify(addedResult));

      this.showDetail = false;

      this.addingCart = false;

      return true;
    },
    openDetail(x) {
      let crollHeight = document.documentElement.scrollTop;

      this.$store.commit("setScroll", crollHeight);

      console.log("%c 离开之前的位置", "color:green;font-weight:bold");
      console.log(JSON.stringify(crollHeight));

      this.$router.push("/p" + "/" + x.sku);

      return;

      // console.log("%c crollHeight", "color:green;font-weight:bold");
      // console.log(JSON.stringify(crollHeight));

      // return;

      if (this.$device.isMobileOrTablet) {
        this.showDetail = true;
        this.showOptionChoosen = false; //
        this.injectDetail = x;
      }

      if (this.$device.isDesktop) {
        // PC 下打开新窗口
        console.log("%c this.routername", "color:green;font-weight:bold");
        console.log(this.$route);

        let routeData = this.$router.resolve({
          name: "index-p-sku___en",
          params: { sku: x.sku },
        });

        // console.log("%c routeData", "color:green;font-weight:bold");
        // console.log(routeData);

        window.open(routeData.href);
      }
    },

    async loadingMoreItem() {
      let categoryId = this.$route.params.id;

      let categoryPayload = {
        filters: {
          ids: {
            in: [categoryId],
          },
        },
        pageSize: 18,
        currentPage: this.currentPage,
        search: "",
        sort: {
          price: "DESC",
        },
      };

      // 🌶️
      let r = await this.$store.dispatch("category/list", categoryPayload);
      // console.log("%c 拿到的产品和子分类", "color:green;font-weight:bold");
      // console.log(JSON.stringify(r));

      this.categorys = r.categoryList[0]; // 这里是数组
      let pageInfo = this.categorys.products.page_info;
      this.pageInfo = pageInfo;
      console.log("%c 当前页", "color:green;font-weight:bold");
      console.log(JSON.stringify(pageInfo.current_page));
      console.log("%c 一共多少页", "color:green;font-weight:bold");
      console.log(JSON.stringify(pageInfo.total_pages));
      console.log("%c 是否完成", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.finished));
      if (pageInfo.current_page === pageInfo.total_pages) {
        this.finished = true;
        return;
      }

      this.list = this.list.concat(r.categoryList[0].products.items);
    },
    async loadMore(e) {
      this.loading = true;
      this.currentPage += 1;
      console.log("%c 触发下拉加载", "color:green;font-weight:bold");
      await this.loadingMoreItem();
      this.loading = false;
    },
  },

  async fetch() {
    await this.loadingMoreItem();
  },

  beforeRouteLeave(to, from, next) {
    console.log("%c 触发离开", "color:green;font-weight:bold");
    console.log(JSON.stringify());
    if (!!this.showDetail) {
      this.showDetail = false;
      return;
    }
    next();
  },

  // async asyncData({
  //   isDev,
  //   route,
  //   store,
  //   env,
  //   params,
  //   query,
  //   req,
  //   res,
  //   redirect,
  //   error,
  // }) {
  //   let categoryId = params.id;

  //   let categoryPayload = {
  //     filters: {
  //       ids: {
  //         in: [categoryId],
  //       },
  //     },
  //     pageSize: 40,
  //     currentPage: 1,
  //     search: "",
  //     sort: {
  //       price: "DESC",
  //     },
  //   };

  //   // 🌶️
  //   let r = await store.dispatch("category/list", categoryPayload);
  //   console.log("%c 拿到的产品和子分类", "color:green;font-weight:bold");
  //   console.log(JSON.stringify(r));

  //   return {
  //     categorys: r.categoryList[0], // 这里是数组
  //   };
  // },
};
</script>

<style lang="scss" scoped>
.add-cart-box {
  .van-submit-bar__tip {
    color: #000;
  }
}
</style>
