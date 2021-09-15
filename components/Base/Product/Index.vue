<template>
  <div class="product-all">
    <div class="">
      <!-- {{ x.imglist }} -->
      <a @click="jump">
        <!-- <van-image fit="cover" :src="img" /> -->
        <van-image
          height="auto"
          width="100%"
          lazy-load
          fit="contain"
          :src="img"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>

        <div class="" style="padding: 0.2rem 0.8rem 0.5rem 0.8rem">
          <div class="">
            <div class="base_item_price" style="">
              {{ x.name }}
            </div>

            <div
              v-if="x.rating_summary"
              class="review-sum my-flex"
              style="justify-content: flex-start"
            >
              <van-rate
                color="#ffd21e"
                v-model="x.rating_summary"
                readonly
                allow-half
                size="15"
                style="margin-right: 0.75rem"
              />
              <span class="is-size-6"> {{ x.review_count }} </span>
            </div>

            <div class="price-sum has-text-dark" style="margin-top: 0.2rem">
              <BaseShowItemPrice v-if="x" :x="x" />
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-detail",
  props: {
    x: {
      type: Object,
      default() {
        return {};
      },
    },
    isClickable: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    img() {
      if (!!this.x.imglist) {
        try {
          let imgs = JSON.parse(this.x.imglist);
          if (imgs.length > 0) {
            return imgs[0].url;
          }
        } catch (error) {
          console.log("%c 转化失败", "color:green;font-weight:bold");
          console.log(JSON.stringify(error));

          return this.x.image.url;
        }
      }
    },
  },

  methods: {
    jump() {
      if (this.isClickable) {
        this.$router.push(this.localePath("/p") + "/" + this.x.sku);
      }
    },
  },
};
</script>

<style>
.base_item_price {
  color: #767676;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 13px;
}
</style>
