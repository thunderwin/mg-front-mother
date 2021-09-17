<template>
  <div>
    <section
      class=""
      id="reviews"
      v-if="x.reviews && x.reviews.items.length > 0"
    >
      <div class="container review">
        <div class="is-size-4 has-text-centered m-4">Customer reviews</div>

        <div class="review-item">
          <div
            v-for="(review, rindex) in x.reviews.items"
            :key="rindex"
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
                  {{ review.nickname }}
                </span>
                <!-- <span class="is-size-7 is-flex is-align-items-center">
                  User of Bulma-css
                </span> -->
              </div>
            </div>

            <div class="review-date has-text-grey">
              Reviewed on {{ review.created_at }}
            </div>

            <div class="is-size-6 my-flex" style="justify-content: flex-start">
              <van-rate
                color="#ffd21e"
                v-model="review.average_rating"
                readonly
                style="margin-right: 10px"
              />

              <span class="has-text-weight-bold">{{ review.summary }}</span>
            </div>
            <div>
              <span>{{ review.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
