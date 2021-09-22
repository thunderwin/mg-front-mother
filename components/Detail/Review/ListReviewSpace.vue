<template>
  <div>
    <section
      class=""
      id="reviews"
      style="margin-top: 2rem; max-width: 600px; margin: 2rem auto"
    >
      <div class="review_section_titile" style="text-align: center">
        {{ total.rank }}
        <span>
          <van-rate
            color="#ffd21e"
            allow-half
            v-model="total.rank"
            readonly
            style="margin-right: 0.5rem"
        /></span>

        <span> {{ total.count }} Reviews</span>
      </div>

      <div class="review_tab" style="margin: 1rem 0">
        <div class="tabs is-boxed">
          <ul>
            <li class="is-active">
              <a>
                <span>Reviews</span>
              </a>
            </li>
            <!-- <li>
              <a>
                <span>Questions</span>
              </a>
            </li> -->
          </ul>

          <div class="buttons">
            <van-button
              :color="$store.state.S.mainColor"
              class="button"
              icon="comment-o"
              type="default"
            >
              Write a review
            </van-button>
            <!-- <van-button
              :color="$store.state.S.mainColor"
              class="button"
              icon="service-o"
              type="default"
            >
              Ask a question
            </van-button> -->
          </div>
        </div>
      </div>

      <DetailReviewEachReview
        v-for="(review, index) in list"
        :key="index"
        :review="review"
        style="margin-bottom: 1rem"
      />

      <nav
        class="pagination is-small"
        role="navigation"
        aria-label="pagination"
      >
        <a class="pagination-previous" @click="lastPage">Previous</a>
        <a class="pagination-next" @click="nextPage">Next page</a>
      </nav>
    </section>
  </div>
</template>

<script>
// https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
export default {
  props: ["sku"],
  data() {
    return {
      list: [],
      total: {},

      sort: "published_at:DESC",
      limit: 10,
      start: 0,
    };
  },
  async mounted() {
    this.getReviewList();
  },
  methods: {
    async lastPage() {
      this.start = this.start - this.limit;

      if (this.start < 0) return;

      let query = {
        sku: this.sku,
        _sort: this.sort,
        _limit: this.limit,
        _start: this.start,
      };

      console.log("%c query", "color:green;font-weight:bold");
      console.log(JSON.stringify(query));

      let r = await this.$axios.get("/space/reviews", { params: query });

      this.list = r;
    },
    async nextPage() {
      this.start = this.start + this.limit;

      let query = {
        sku: this.sku,
        _sort: this.sort,
        _limit: this.limit,
        _start: this.start,
      };

      console.log("%c nextPage", "color:green;font-weight:bold");
      console.log(JSON.stringify(query));

      let r = await this.$axios.get("/space/reviews", { params: query });

      this.list = r;
    },
    async getReviewList() {
      let query = {
        sku: this.sku,
        _sort: this.sort,
        _limit: this.limit,
        _start: this.start,
      };
      let r = await this.$axios.get("/space/reviews", { params: query });

      console.log("%c 获取的评论", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      this.list = r;

      let countQuery = {
        sku: this.sku,
      };

      let count = await this.$axios.get("/space/reviews/count", {
        params: countQuery,
      });

      if (count.data || count.data == 0) {
        count = 0;
        this.total = {
          count: 0,
          summy: 0,
          rank: 0,
        };
        return;
      }
      console.log("%c 评论数量 count", "color:green;font-weight:bold");
      console.log(JSON.stringify(count.data));

      let summy = await this.$axios.get(`/space/reviews/summy/${this.sku}`, {});
      summy = summy["sum(`score`)"];
      console.log("%c 评论统计", "color:green;font-weight:bold");
      console.log(JSON.stringify(summy));

      let rank = Number((summy / count).toFixed(2));

      this.total = {
        count,
        summy,
        rank,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
