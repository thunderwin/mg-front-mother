<template>
  <div
    class="wrappeprr shadow"
    style="width: 100%; margin-bottom: 2rem; padding: 1rem 1.5rem"
  >
    <!-- {{ x.list }} -->
    <div
      class="checkout_line_item"
      style="
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: auto 1rem;
        align-items: center;
      "
    >
      <van-card
        style="background-color: #fff !important; padding: 0 !important"
        :title="item.product.name"
        :thumb="
          item.product.media_gallery.length > 0
            ? item.product.media_gallery[0].url
            : ''
        "
        :style="'100%'"
      >
        <template #tags>
          <div
            v-for="(x, indx) in item.customizable_options"
            :key="indx"
            style="color: #707070"
          >
            <span>{{ x.label }}:</span>
            <span style="">{{ x.values[0].label || x.values[0].value }}</span>
          </div>
          <div
            v-if="
              item.configurable_options && item.configurable_options.length > 0
            "
            class="config_options"
          >
            <div
              v-for="(x, indx) in item.configurable_options"
              :key="indx"
              style="color: #707070"
            >
              <span>{{ x.option_label }}:</span>
              <span style="">{{ x.value_label }}</span>
            </div>
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],
  computed: {
    item() {
      return this.x;
    },
    formatedCusAtts() {
      return this.item.customizable_options.map((x) => {
        if (x.label === "date") {
          x.values = x.values.map((y) => {
            y.value = new Date(y.values).toLocaleDateString();
            return y.value;
          });
        }
        return x;
      });
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.checkout_line_item .van-card__title {
  font-size: 20px;
  line-height: 20px;
  overflow: inherit;
}
</style>
