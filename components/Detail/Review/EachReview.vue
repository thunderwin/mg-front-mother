<template>
  <div>
    <div class="review-item">
      <div
        class="box has-background-white has-text-grey-dark"
        style="padding: 1rem"
      >
        <div class="reviewer my-flex" style="justify-content: flex-start">
          <div>
            <van-image
              v-if="review.user_avatar && review.user_avatar.length > 0"
              height="30px"
              width="30px"
              style="margin-right: 1rem"
              lazy-load
              round
              fit="contain"
              :src="
                $store.state.strapi_url +
                review.user_avatar[0][0].formats.thumbnail.url
              "
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>

          <div class="user_display_name">
            {{ review.display_name }}
          </div>
        </div>
        <div
          class="is-flex is-align-items-center is-justify-content-start mt-4"
        >
          <div
            class="is-flex is-flex-direction-column is-align-content-space-between"
          >
            <span class="font-semibold has-text-weight-bold">
              {{ new Date(review.published_at).toLocaleString() }}
            </span>
            <!-- <span class="is-size-7 is-flex is-align-items-center">
                  User of Bulma-css
                </span> -->
          </div>
        </div>

        <div class="review-date has-text-grey">
          Reviewed on {{ review.published_at }}
        </div>

        <div class="review-item-verifyed">
          <span>Color: A-grey</span>
          <span>Size: Medium</span>
          <span v-if="review.verified_buyer" class="tag is-success"
            >Verified Purchase</span
          >
        </div>

        <div class="is-size-6 my-flex" style="justify-content: flex-start">
          <van-rate
            color="#ffd21e"
            v-model="review.score"
            readonly
            style="margin-right: 10px"
          />

          <span class="has-text-weight-bold">{{ review.review_title }}</span>
        </div>
        <div>
          <span>{{ review.review_content }}</span>
        </div>

        <div
          v-if="review.remote_image_list && review.remote_image_list.length > 0"
          class="review-images my-flex"
          style="justify-content: flex-start"
        >
          <div v-for="(img, findex) in review.remote_image_list" :key="findex">
            <van-image
              height="auto"
              width="100px"
              style="margin-right: 1rem"
              lazy-load
              fit="contain"
              :src="$store.state.strapi_url + img[0].formats.thumbnail.url"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>

          <!-- <van-grid :border="false" :column-num="3">
            <van-grid-item
              v-for="(img, findex) in review.remote_image_list"
              :key="findex"
            >
              <van-image
                height="auto"
                width="100px"
                lazy-load
                fit="contain"
                :src="'http://localhost:1337' + img[0].formats.thumbnail.url"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </van-grid-item>
          </van-grid> -->
        </div>

        <div class="review-actions">
          <div class="help-faul">
            {{ review.votes_up ? review.votes_up : 0 }} people found this
            helpful
          </div>

          <div class="actionsss">
            <van-button
              icon="arrow-up"
              size="mini"
              round
              @click="vote(review.votes_up)"
              class="button"
              type="default"
            >
              Helpful
            </van-button>

            <!-- <span>Report abuses</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["review"],
  methods: {
    async vote(num) {
      await this.$axios.put(`/space/reviews/${this.review.id}`, {
        votes_up: Number(num) + 1,
      });

      this.review.votes_up = Number(this.review.votes_up) + 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
