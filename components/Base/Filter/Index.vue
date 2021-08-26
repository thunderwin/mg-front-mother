<template>
  <div class="">
    <!-- {{ x }} -->

    <!-- {{ filter }} -->

    <BaseFilterResult
      style="padding: 0 1rem"
      :list="list"
      @removefilter="removefilter"
    />

    <BaseFilterItem
      @filterChange="filterChange"
      v-for="(filter, index) in list"
      :key="index + 100"
      :x="filter"
      ref="filter_item"
      class="van-hairline--bottom"
      style="padding-bottom: 1rem"
    />
  </div>
</template>

<script>
export default {
  props: ["x", "filter"],

  data() {
    return {
      list: [],
    };
  },

  watch: {
    x: {
      handler: function () {
        this.list = this.x.map((z) => {
          let isPreSelected = Object.keys(this.filter).includes(
            z.attribute_code
          );
          let selectedOption = [];
          if (isPreSelected) {
            if (z.attribute_code === "price") {
              // 选择的价格需要特殊处理
              let priceRange = this.filter.price;
              selectedOption.push(priceRange.from + "_" + priceRange.to);
            } else {
              selectedOption = this.filter[z.attribute_code].in;
            }
          }

          z.options = z.options.map((p) => {
            p.checked = selectedOption.includes(p.value); // 已经被中
            return p;
          });

          return z;
        });

        this.$store.commit("setFilterResult", this.list);
      },
      immediate: true,
    },
  },

  methods: {
    changeListOptionValue(attributeCode, optionIndex) {
      this.list = this.list.map((x) => {
        if (x.attribute_code === attributeCode) {
          x.options = x.options.map((z, zindex) => {
            if (zindex === optionIndex) {
              z.checked = !z.checked;
            }
            return z;
          });
        }
        return x;
      });

      this.$store.commit("setFilterResult", this.list);

      // console.log("%c 当前增加的url", "color:green;font-weight:bold");
      // console.log(JSON.stringify(this.$store.getters["qs"]));

      this.$emit("filterResult", this.list);

      this.$store.dispatch("listing", {});
    },
    filterChange({ attributeCode, optionIndex }) {
      this.changeListOptionValue(attributeCode, optionIndex);
    },
    removefilter(attributeCode, optionIndex) {
      this.changeListOptionValue(attributeCode, optionIndex);
    },
  },
};
</script>

<style lang="scss" scoped></style>
