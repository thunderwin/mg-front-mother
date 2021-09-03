<template>
  <div style="padding: 1rem" class="pagging">
    <nav
      class="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <a class="pagination-previous" @click="click(pageInfo.current_page - 1)"
        >Previous</a
      >
      <a class="pagination-next" @click="click(pageInfo.current_page + 1)"
        >Next page</a
      >
      <ul class="pagination-list">
        <li v-if="pageInfo.current_page - 1 > 2">
          <a
            @click="click(1)"
            class="pagination-link"
            aria-label="Goto page 86"
            >{{ 1 }}</a
          >
        </li>
        <li v-if="pageInfo.current_page - 1 > 3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>

        <div
          v-for="(x, index) in pageInfo.total_pages"
          :key="index"
          class="each-pager"
        >
          <li v-if="Math.abs(x - pageInfo.current_page) < 3">
            <a
              @click="click(x)"
              class="pagination-link"
              :style="{
                backgroundColor:
                  x === pageInfo.current_page
                    ? $store.state.S.mainButtonColor
                    : '',
                color: '#222',
              }"
              :class="x === pageInfo.current_page ? 'is-current' : ''"
              >{{ x }}</a
            >
          </li>
        </div>

        <li v-if="pageInfo.total_pages - pageInfo.current_page > 3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="pageInfo.total_pages - pageInfo.current_page > 2">
          <a
            @click="click(pageInfo.total_pages)"
            class="pagination-link"
            aria-label="Goto page 86"
            >{{ pageInfo.total_pages }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["pageInfo"],

  methods: {
    click(page) {
      this.$store.dispatch("listing", {
        currentPage: page,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagging .is-current {
  color: #fff;
}
</style>
