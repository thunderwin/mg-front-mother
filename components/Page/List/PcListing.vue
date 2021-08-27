<template>
  <!-- {{ category }} -->
  <section class="section">
    <!-- {{ categorys }} -->
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <!-- <BaseChildCategoryTree :categorys="categorys" /> -->

          <!-- <PageListChosenFilter :filter="filter" /> -->

          <BaseFilter
            v-if="products.aggregations"
            :x="products.aggregations"
            :filter="filter"
            @filterResult="filterResult"
          />
        </div>

        <div class="column">
          <!-- <BaseChildCategory :categorys="categorys" style="margin-bottom: 2rem" /> -->
          <van-grid
            :border="false"
            :center="false"
            :gutter="20"
            :clickable="true"
            :column-num="4"
          >
            <van-grid-item v-for="(x, index) in products.items" :key="index">
              <BaseProduct class="shadow" :x="x" />
            </van-grid-item>
          </van-grid>

          <PageListPagination :pageInfo="products.page_info" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["categorys", "products", "filter"],
  methods: {
    filterResult(e) {
      console.log("%c 过滤器的返回", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));

      return;
      let obj = {};
      e.forEach((x) => {
        x.options.forEach((z) => {
          if (z.checked) {
            if (obj[x.attribute_code]) {
              obj[x.attribute_code] = obj[x.attribute_code] += "," + z.value;
            } else {
              obj[x.attribute_code] = z.value;
            }
          }
        });
      });

      console.log("%c 过滤器", "color:green;font-weight:bold");
      console.log(JSON.stringify(obj));

      let qs = Object.keys(obj)
        .map((key) => `${key}=${obj[key]}`)
        .join("&");

      this.$store.commit("setQs", qs);

      console.log("%c qs", "color:green;font-weight:bold");
      console.log(JSON.stringify(qs));

      this.$router.push(this.localePath("/list") + "?" + this.$store.state.qs);
    },
  },
};
</script>

<style lang="scss" scoped></style>
