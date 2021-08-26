<template>
  <div>
    <div class="seach-box formulate-input-element">
      <van-search
        class="input is-medium"
        v-model="value"
        clear-trigger="focus"
        :placeholder="$t('c.search_for_product')"
        @search="onSearch"
        @input="realTimeSearch"
        @clear="clear"
        style="font-size: 16px; padding: 0"
        @keydown.enter.prevent="context.model = selection.label"
        @keydown.down.prevent="increment"
        @keydown.up.prevent="decrement"
      >
        <!-- <b-icon slot="left-icon" icon="search" /> -->
      </van-search>
    </div>

    <ul v-if="filteredOptions.length" class="box formulate-input-dropdown">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        :data-is-selected="selection && selection.value === option"
        @mouseenter="selectedIndex = index"
        @click="context.model = selection.label"
      >
        <div v-if="!!option.sku" class="product">
          <van-card
            :price="option.price_range.minimum_price.final_price.value"
            :title="option.name"
            :thumb="option.image.url"
            origin-price="10.00"
          />
        </div>

        <div v-else class="only-text">
          {{ option }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Helper from "@/assets/js/helper";

export default {
  props: ["apiEndpoint"],
  data() {
    return {
      value: "",
      showPopover: true,

      selectedIndex: 0,
      filteredOptions: [],
    };
  },
  computed: {
    selection() {
      if (this.filteredOptions[this.selectedIndex]) {
        return this.filteredOptions[this.selectedIndex];
      }
      return false;
    },

    // filteredOptions() {
    //   if (Array.isArray(this.context.options) && this.context.model) {
    //     const isAlreadySelected = this.context.options.find(
    //       (option) => option.label === this.context.model
    //     );
    //     if (!isAlreadySelected) {
    //       return this.context.options.filter((option) =>
    //         option.label
    //           .toLowerCase()
    //           .includes(this.context.model.toLowerCase())
    //       );
    //     }
    //   }
    //   return [];
    // },
  },
  methods: {
    // https://www.cnblogs.com/dreamsqin/p/11305028.html  防抖和节流的区别
    onSearch(keyword) {
      console.log("%c 哈哈", "color:green;font-weight:bold");
      console.log(JSON.stringify(keyword));
      Helper.debounce(async function (event) {
        let that = this;
        event.preventDefault();
        // 调接口
        // ...
        this.seachResult = await this.$axios
          .post("/api/store/googleCategory", { keyword })
          .then();
      }, 300);
    },
    clear() {
      console.log("%c ??", "color:green;font-weight:bold");
      console.log(JSON.stringify());

      this.value = "1212";
    },

    realTimeSearch: Helper.debounce(async function (keyword) {
      if (!keyword) return;
      let seachResult = await this.$axios.post(this.apiEndpoint, { keyword });
      // console.log("%c seachResult", "color:green;font-weight:bold");
      // console.log(JSON.stringify(seachResult));

      this.filteredOptions = seachResult.products.items;
    }, 300),

    increment() {
      const length = this.filteredOptions.length;
      if (this.selectedIndex + 1 < length) {
        this.selectedIndex++;
      } else {
        this.selectedIndex = 0;
      }
    },
    decrement() {
      const length = this.filteredOptions.length;
      if (this.selectedIndex - 1 >= 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = length - 1;
      }
    },
  },
};
</script>

<style>
.seach-box .van-field__value {
  font-size: 1rem !important;
}
.formulate-input-dropdown {
  width: 400px;
  height: 600px;
  background-color: #fff;
  z-index: 100000;
  position: absolute;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
