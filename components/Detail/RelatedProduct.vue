<template>
  <div>
    <section v-if="$device.isDesktop" class="section">
      <div class="container">
        <div class="">
          <div class="is-size-4 has-text-centered m-4">Related products</div>
        </div>

        <van-tabs scrollspy :color="$store.state.S.mainColor">
          <van-tab
            v-for="(x, index) in categories"
            :title="x.name"
            :key="index"
          >
            <van-grid
              style="padding: 1rem 0 1rem 1rem"
              :border="false"
              :center="false"
              :gutter="'20px'"
              :clickable="true"
              :column-num="6"
            >
              <van-grid-item
                v-for="(y, index) in x.products.items"
                :key="index"
              >
                <BaseProduct class="shadow" :x="y" />
              </van-grid-item>
            </van-grid>
          </van-tab>
        </van-tabs>
      </div>
    </section>

    <div v-if="$device.isMobileOrTablet" class="shadow">
      <van-tabs scrollspy sticky :color="$store.state.S.mainColor">
        <van-tab v-for="(x, index) in categories" :title="x.name" :key="index">
          <van-grid
            style="padding: 1rem 0 1rem 1rem"
            :border="false"
            :center="false"
            :gutter="'1rem'"
            :clickable="true"
            :column-num="2"
          >
            <van-grid-item v-for="(y, index) in x.products.items" :key="index">
              <!-- {{ y }} -->
              <BaseProduct class="shadow" :x="y" />
            </van-grid-item>
          </van-grid>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Helper from "@/assets/js/helper";

export default {
  props: ["catgoryIds"],
  data() {
    return {
      categories: [],
    };
  },
  async fetch() {
    // let random = Helper.randomNum(0, this.catgoryIds.length - 1);

    // let cateId = this.catgoryIds[random];

    // console.log("%c 随机的cateId", "color:green;font-weight:bold");
    // console.log(JSON.stringify(cateId));

    let categoryPayload = {
      filters: {
        ids: {
          in: this.catgoryIds.map((x) => x.id),
        },
      },
      pageSize: 12,
      currentPage: 1,
      search: "",
      sort: {
        price: "DESC",
      },
    };

    let r = await this.$store.dispatch("category/list", categoryPayload);

    console.log("%c 当前的数据", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    this.categories = r.categoryList;
  },
};
</script>

<style lang="scss">
.van-tabs__wrap {
  padding: 0 1rem;
}
</style>
