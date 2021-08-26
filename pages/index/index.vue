<template>
  <div style="">
    <div class="container banner">
      <!-- <BaseSlider :fileList="$store.state.slider" /> -->
    </div>

    <!-- {{ homepageConfig }} -->

    <component
      v-for="(x, index) in homepageConfig"
      :key="index"
      :is="'PageHomepage' + x.name"
      :x="x"
    />

    <!-- <PageHomepageCategory :categoryList="menu" style="margin-top: 30px" /> -->

    <!-- <BaseProductRow v-for="(x, index) in list" :key="index" :x="x" /> -->
  </div>
</template>

<script>
export default {
  scrollToTop: true,

  data() {
    return {
      list: [],
    };
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },

    homepageConfig() {
      return this.$store.state.S.homepageConfig;
    },
  },
  async fetch() {
    // let r = await this.$store.dispatch("category/list", {
    //   filters: {
    //     ids: {
    //       in: ["44", "38"], //  新产品，热门产品 and hot
    //     },
    //   },
    //   sort: { price: "DESC" },
    //   currentPage: 1,
    //   pageSize: 10,
    // });
    // this.list = r.categoryList;
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
    let categoryPayload = {
      filters: {
        ids: {
          eq: 2,
        },
      },
      pageSize: 20,
      currentPage: 1,
      search: "",
      sort: {
        price: "DESC",
      },
    };

    return;

    let cate = await store.dispatch("category/list", categoryPayload);

    console.log("%c cate", "color:green;font-weight:bold");
    console.log(JSON.stringify(cate));

    let cates = cate.categoryList[0].children;

    return {
      categoryList: cates.filter((x) => x.include_in_menu),
    };
  },
};
</script>

<style lang="scss" scoped></style>
