<template>
  <div>
    <div class="listingWrapper">
      <div v-if="$fetchState.pending" class="loading">
        <section class="section">
          <div class="container">
            <content-placeholders rounded style="padding: 1rem 1rem">
              <content-placeholders-text :lines="1" />
              <content-placeholders-text :lines="5" />

              <content-placeholders-img />
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
            <van-grid-item v-for="(x, index) in list" :key="index">
              <!-- {{ x.name }} -->
              <BaseProduct class="shadow" :x="x" />
            </van-grid-item>
          </van-grid>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  watchQuery: true,
  data() {
    return {
      loading: false,
      finished: false,
      moreItems: [],
      pageInfo: "",
      list: [],

      categorys: {},

      currentPage: 1,
    };
  },

  watch: {
    "$route.params.id": function (id) {
      console.log("%c id", "color:green;font-weight:bold");
      console.log(JSON.stringify(id));
      this.currentPage = 1;
      this.list = [];
      this.categorys = {};
      this.$fetch();
    },
  },

  methods: {
    async loadMore(e) {
      this.loading = true;
      this.currentPage += 1;
      console.log("%c 触发下拉加载", "color:green;font-weight:bold");
      await this.$fetch();
      this.loading = false;
    },
  },

  async fetch() {
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
    console.log("%c 拿到的产品和子分类", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

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

<style lang="scss" scoped></style>
