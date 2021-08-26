<template>
  <div>
    <div class="box my-flex" style="padding: 0.5rem 2rem">
      <!-- {{ x }} -->

      <div class="result-summay">
        1 - {{ itemNumber }} of over {{ x.total_count }} results
      </div>

      <!-- {{ sort }} -->

      <div class="sort my-flex">
        <span style="margin-right: 1rem">Sort by</span>
        <div class="select is-small is-normal">
          <!-- <select @change="change">
            <option
              :selected="s.value === sort"
              v-for="(s, sindex) in x.sort_fields.options"
              :key="sindex"
            >
              {{ s.label }}
            </option>
          </select> -->

          <FormulateInput
            name="sort"
            type="select"
            validation="required"
            :options="x.sort_fields.options"
            class="is-medium"
            @input="change"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x", "sort"],
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
      this.$store.dispatch("listing", {
        sortBy: e,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
