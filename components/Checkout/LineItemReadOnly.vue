<template>
  <div
    class="wrappeprr shadow"
    style="width: 100%; margin-bottom: 1rem; padding: 1rem"
  >
    <!-- {{ x.list }} -->
    <div class="checkout_line_item" style="width: 100%; align-items: center">
      <van-card
        style="background-color: #fff !important; padding: 0 !important"
        :title="item.product.name"
        :thumb="thumb"
        :style="'100%'"
      >
        <template #tags>
          <!-- // 自定义选项 -->
          <!-- 选项-->
          <div class="customizable_options">
            <div
              v-for="(x, indx) in item.customizable_options"
              :key="indx"
              style="color: #707070"
              class="my-flex"
            >
              <div class="is-capitalized">{{ x.label }}:</div>
              <div
                class="is-capitalized"
                v-for="(z, zindex) in x.values"
                :key="zindex"
                style=""
              >
                {{ z.label }}
              </div>
            </div>
          </div>

          <!-- // 数量和价格 -->
          <div class="my-flex" style="justify-content: flex-end">
            <div style="font-size: 1.3rem; flex-shrink: 0" class="pricr">
              <span>{{
                item.prices.price.currency === "USD"
                  ? "$"
                  : item.prices.price.currency
              }}</span>
              <span
                >{{ item.prices.price.value.toFixed(2) }}
                <span class="has-text-grey">x {{ item.quantity }}</span>
              </span>
            </div>
          </div>

          <!-- // 可配置产品 -->
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
    thumb() {
      if (!!this.x.product.imglist) {
        let imgs = JSON.parse(this.x.product.imglist);
        return imgs[0].url;
      }
      return this.x.product.media_gallery.length > 0
        ? this.x.product.media_gallery[0].url
        : "";
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
