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
          <div
            v-for="(x, indx) in item.product.options"
            :key="indx"
            style="color: #707070; magrin-top: 0.5rem"
            class="my-flex"
          >
            <div>{{ x.title }}:</div>
            <div v-for="(z, zindex) in x.value" :key="zindex" style="">
              {{ z.title }}
            </div>
          </div>

          <!-- // 数量和价格 -->
          <div class="my-flex" style="">
            <div class="qty" style="font-size: 1rem">
              {{ $t("c.qty") }} : {{ item.quantity }}
            </div>
            <div style="font-size: 1.3rem; flex-shrink: 0" class="pricr">
              <span>{{
                item.prices.price.currency === "USD"
                  ? "$"
                  : item.prices.price.currency
              }}</span>
              <span>{{
                (item.prices.price.value * item.quantity).toFixed(2)
              }}</span>
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
