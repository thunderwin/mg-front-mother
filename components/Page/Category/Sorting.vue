<template>
  <div class="sorter">
    <client-only>
      <div class="shadow" style="padding: 0.5rem 1rem">
        <div class="container my-flex" style="padding: 0">
          <!-- <div class="result-summay">
            1 - {{ pageInfo.page_size }} of over {{ total }} results
          </div> -->

          <div style="flex-shrink: 0" class="result-summay">
            {{ total }} results
          </div>

          <!-- {{ sort }} -->

          <div class="sort my-flex">
            <span style="margin-right: 1rem; flex-shrink: 0">Sort by</span>
            <div class="">
              <FormulateInput
                name="sort"
                type="select"
                :options="[
                  { value: 'sortby_position_DESC', label: 'Position' },
                  {
                    value: 'sortby_price=ASC',
                    label: 'Price (low to high)',
                    id: '2',
                  },
                  {
                    value: 'sortby_price=DESC',
                    label: 'Price (high to low)',
                    id: '3',
                  },
                ]"
                class=""
                @input="change"
              />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["pageInfo", "total"],
  data() {
    return {
      chosen: "",
    };
  },
  computed: {
    itemNumber() {
      let pageSize = this.x.page_info.page_size;

      if (pageSize > this.x.total_count) {
        return this.x.total_count;
      } else {
        return pageSize;
      }
    },
  },

  mounted() {
    // 把当前选择的放在第一个
  },
  methods: {
    change(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
      this.$router.push("/c" + "/" + this.$route.params.id) + "?" + e;
    },
  },
};
</script>

<style lang="scss">
.sorter {
  .formulate-input,
  .formulate-input {
    margin-bottom: 0 !important;
  }

  .formulate-input[data-classification="select"] select {
    padding: 0.45rem 2rem 0.45rem 1rem !important;
  }
}
</style>
