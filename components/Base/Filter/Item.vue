<template>
  <div class="filter-item">
    <!-- {{ x }} -->
    <ul v-if="$device.isDesktop" class="menu-list">
      <p class="ml-4 is-size-6 has-text-weight-bold mb-3 mt-3">
        {{ x.label }} : ({{ x.count }})
      </p>
      <!-- <BaseFilterPrice
        v-if="x.attribute_code === 'price'"
        :priceOptions="x.options"
      /> -->
      <li class="each-one" v-for="(option, index) in x.options" :key="index">
        <a style="">
          <label
            class="checkbox is-capitalized"
            style="width: 100%; line-height: 1.75rem; margin: 0 1rem"
          >
            <input
              :name="option.label"
              v-model="option.checked"
              @click="choose(index)"
              type="checkbox"
            />

            <span> {{ option.label }}</span>

            <span class="has-text-grey">{{ option.count }}</span>
          </label>
        </a>
      </li>
    </ul>

    <div v-if="$device.isMobileOrTablet">
      <div class="ml-4 is-size-6 has-text-weight-bold mb-3 mt-3 is-capitalized">
        {{ x.label }} : ({{ x.count }})
      </div>
      <!-- <BaseFilterPrice
        v-if="x.attribute_code === 'price'"
        :priceOptions="x.options"
      /> -->

      <div class="tags are-medium" style="padding: 0 1rem">
        <div
          class="each-one tag is-light"
          :class="option.checked ? 'is-dark' : ''"
          v-for="(option, index) in x.options"
          :key="index"
          @click="choose(index)"
        >
          <span class="is-capitalized"
            >{{ option.label }} : {{ option.count }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],

  data() {
    return {
      chosen: "",
    };
  },

  methods: {
    choose(index) {
      this.$emit("filterChange", {
        attributeCode: this.x.attribute_code,
        optionIndex: index,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item .each-one a {
  padding: 0;
}
</style>
