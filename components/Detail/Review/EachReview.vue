<template>
  <div>
    <div class="review-item">
      <div
        class="box has-background-white has-text-grey-dark"
        style="padding: 1rem"
      >
        <div
          class="is-flex is-align-items-center is-justify-content-start mt-4"
        >
          <!-- <a href="#" class="image is-48x48">
              <img alt="profil" src="/images/person/1.jpg" class="is-rounded" />
            </a> -->
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
          class="my-flex"
          style="justify-content: flex-start"
        >
          <div v-for="(img, findex) in review.remote_image_list" :key="findex">
            <van-image
              height="auto"
              width="100px"
              style="margin-right: 1rem"
              lazy-load
              fit="contain"
              :src="'http://localhost:1337' + img[0].formats.thumbnail.url"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["review"],
};
</script>

<style lang="scss" scoped></style>
