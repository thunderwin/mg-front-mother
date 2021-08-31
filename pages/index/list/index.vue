<template>
  <div>
    <!-- <progress class="progress is-small is-primary" max="100">15%</progress> -->

    <section v-if="products.total_count == 0" class="section">
      <article class="container message">
        <div class="message-body">No product found</div>
      </article>
    </section>

    <div v-else class="has-product">
      <PageListSorting
        v-if="$device.isDesktop"
        :x="products"
        :sort="productsPayload.sort"
      />

      <PageListPcListing
        v-if="$device.isDesktop"
        :products="products"
        :filter="productsPayload.filter"
      />

      <PageListMobListing
        v-if="$device.isMobileOrTablet"
        :products="products"
        :filter="productsPayload.filter"
        @loadMore="mobLoadMore"
        ref="mobListing"
      />
    </div>
  </div>
</template>

<script>
function convertQueryToGQLPayload(query) {
  let payload = {
    // 默认数据
    filter: {},
    pageSize: 28,
    currentPage: 1,
    search: "",
    sort: {
      price: "DESC",
    },
  };

  for (let x in query) {
    if (x.indexOf("sortby") > -1) {
      let key = x.split("_")[1];
      let value = query[x];
      payload.sort[key] = value;
    } else if (x.indexOf("pagesize") > -1) {
      payload.pageSize = query[x];
    } else if (x.indexOf("currentpage") > -1) {
      payload.currentPage = query[x];
    } else if (x === "price") {
      // 价格需要特殊处理下
      let priceRange = query.price.split("_");
      payload.filter.price = {
        from: priceRange[0],
        to: priceRange[1],
      };
    } else {
      payload.filter[x] = {
        in: query[x].split(","),
      };
    }
  }

  return payload;
}

function covertQueryToDisplayFilterAndPageInfo(payload, aggregations) {
  let filer = {};
  let sorting;
  let pageInfo;
}

export default {
  scrollToTop: true,
  watchQuery: true,
  data() {
    return {
      products: "",
      categorys: [],

      mobCurrentPage: 1, // 手机的当前页面存在本地
    };
  },
  // watch: {
  //   "$route.params.id": function (v) {
  //     console.log("%c v ", "color:green;font-weight:bold");
  //     console.log(JSON.stringify(v));
  //     this.getList();
  //   },
  // },
  methods: {
    async getList() {},
  },

  // async fetch() {
  //   let id = this.$route.params.id;

  //   let productsPayload = {
  //     filter: {
  //       category_id: {
  //         eq: id,
  //       },
  //     },
  //     pageSize: 30,
  //     currentPage: 1,
  //     search: "",
  //     sort: {
  //       price: "DESC",
  //     },
  //   };

  //   let p1 = this.$store.dispatch(
  //     "product/productWithFilterSort",
  //     productsPayload
  //   );

  //   let categoryPayload = {
  //     filters: {
  //       ids: {
  //         eq: id,
  //       },
  //     },
  //     pageSize: 20,
  //     currentPage: 1,
  //     search: "",
  //     sort: {
  //       price: "DESC",
  //     },
  //   };

  //   let p2 = this.$store.dispatch("category/list", categoryPayload);

  //   console.log("%c 拿到的产品 和子分类", "color:green;font-weight:bold");

  //   let r = await Promise.all([p1, p2]);
  //   console.log(JSON.stringify(r));

  //   this.products = r[0].products;
  //   this.categorys = r[1].categoryList[0]; // 这里是数组
  // },

  methods: {
    async mobLoadMore() {
      // console.log("%c 手机上加载更多", "color:green;font-weight:bold");
      let query = this.$route.query;

      // console.log("%c 当前的参数", "color:green;font-weight:bold");
      // console.log(JSON.stringify(query));

      let productsPayload = convertQueryToGQLPayload(query);

      // console.log("%c 当前的请求参数", "color:green;font-weight:bold");
      // console.log(JSON.stringify(productsPayload));

      productsPayload.currentPage = this.mobCurrentPage + 1; // 翻页

      console.log("%c 当前请求第几页", "color:green;font-weight:bold");
      console.log(JSON.stringify(productsPayload.currentPage));

      let r = await this.$store.dispatch(
        "product/productWithFilterSort",
        productsPayload
      );

      this.$refs.mobListing.loading = false;

      console.log("%c 新加载的产品", "color:green;font-weight:bold");
      console.log(JSON.stringify(r.products.items.map((x) => x.name)));

      this.$refs.mobListing.moreItems = this.$refs.mobListing.moreItems.concat(
        r.products.items
      );

      console.log("%c 当前已经加载的产品总数", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.$refs.mobListing.moreItems.length));

      this.mobCurrentPage = r.products.page_info.current_page; // 更新当前的页面

      let pageInfo = r.products.page_info;
      if (pageInfo.current_page === pageInfo.total_pages) {
        this.$refs.mobListing.finished = true;
        return;
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
    let id = params.id;

    console.log("%c 看看query", "color:green;font-weight:bold");
    console.log(JSON.stringify(query));

    let productsPayload = convertQueryToGQLPayload(query);

    console.log("%c productsPayload", "color:green;font-weight:bold");
    console.log(JSON.stringify(productsPayload));

    let p1 = store.dispatch("product/productWithFilterSort", productsPayload);

    let categoryPayload = {
      filters: {
        ids: {
          eq: id,
        },
      },
      pageSize: 20,
      currentPage: 1,
      search: "",
      sort: {
        price: "DESC",
      },
    };

    // 🌶️
    // let p2 = store.dispatch("category/list", categoryPayload);
    // console.log("%c 拿到的产品 和子分类", "color:green;font-weight:bold");

    let r = await Promise.all([p1]);

    // console.log("%c 拿到的产品 和子分类", "color:green;font-weight:bold");
    // console.log(JSON.stringify(r));

    return {
      products: r[0].products,
      productsPayload,
      // categorys: r[1].categoryList[0], // 这里是数组
    };
  },
};
</script>

<style lang="scss" scoped></style>
