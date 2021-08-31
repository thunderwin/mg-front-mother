<template>
  <div style="padding: 0">
    <!-- {{ allItem.length }} -->

    <van-sticky style="">
      <!-- <BaseFilterResult
        :readOnly="true"
        :list="$store.state.filter"
        @removefilter="removefilter"
      /> -->

      <div
        class="my-flex bg-white"
        style="padding: 0.3rem 1rem; background-color: #fff"
      >
        <BaseFilterReadOnly
          style="max-width: 70%; overflow-x: scroll; overflow-y: hidden"
          class="is-capitalized"
        />

        <button
          style="max-width: 30%"
          class="button is-light"
          @click="$store.commit('setFilterPopup', true)"
        >
          <van-icon class="is-light" name="filter-o" />
          Filter
        </button>
      </div>
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="No more"
      loading-text="Loading..."
      @load="loadMore"
    >
      <van-grid
        :border="false"
        :center="false"
        :gutter="'1rem'"
        :clickable="true"
        :column-num="2"
      >
        <van-grid-item v-for="(x, index) in allItem" :key="index">
          <!-- {{ x.name }} -->
          <BaseProduct class="shadow" :x="x" />
        </van-grid-item>
      </van-grid>
    </van-list>

    <van-popup
      v-model="showFilter"
      class=""
      closeable
      :duration="0.1"
      :position="'right'"
      :style="{ height: '100%', width: '80%' }"
    >
      <BaseFilter
        v-if="products.aggregations"
        :x="products.aggregations"
        :filter="filter"
        ref="baseWrapper"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["categorys", "products", "filter"],

  data() {
    return {
      loading: false,
      finished: false,
      moreItems: [],
    };
  },

  watch: {
    products(v) {
      console.log("%c 第一波产品有变化", "color:green;font-weight:bold");
      console.log(JSON.stringify(v));
      this.moreItems = [];
    },
  },

  mounted() {
    // 初始化翻页状态
    this.finished = false;
    let pageInfo = this.products.page_info;
    console.log("%c 当前页", "color:green;font-weight:bold");
    console.log(JSON.stringify(pageInfo.current_page));
    console.log("%c 一共多少页", "color:green;font-weight:bold");
    console.log(JSON.stringify(pageInfo.total_pages));
    console.log("%c 是否完成", "color:green;font-weight:bold");
    console.log(JSON.stringify(this.finished));
    if (pageInfo.current_page === pageInfo.total_pages) {
      this.finished = true;
    }
  },

  computed: {
    showFilter: {
      set(e) {
        this.$store.commit("setFilterPopup", e);
      },
      get() {
        return this.$store.getters["showFilter"];
      },
    },
    allItem() {
      return this.products.items.concat(this.moreItems);
    },
  },

  methods: {
    loadMore(e) {
      console.log("%c 触发下拉加载", "color:green;font-weight:bold");
      this.$emit("loadMore");
    },

    removefilter(code, index) {
      this.$refs.baseWrapper.removefilter(code, index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
