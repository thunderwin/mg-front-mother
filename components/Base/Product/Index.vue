<template>
  <div class="product-all">
    <div class="">
      <nuxt-link :to="localePath('/p') + '/' + x.sku">
        <van-image fit="cover" :src="img" />

        <div class="" style="padding: 0.5rem 1rem 1rem 1rem">
          <!-- <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">John Smith</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div> -->

          <div class="">
            <div class="is-size-6 van-multi-ellipsis--l2 has-text-grey">
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
              <BaseShowItemPrice
                v-if="x.price_range"
                :fontSize="6"
                :price_range="x.price_range"
              />
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-detail",
  props: ["x"],
  data() {
    return {};
  },
  computed: {
    img() {
      if (!!this.x.imglist) {
        let imgs = JSON.parse(this.x.imglist);

        if (imgs.length > 0) {
          return imgs[0].url;
        }
      }
      return this.x.image.url;
    },
  },
};
</script>
