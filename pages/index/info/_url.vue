<template>
  <div class="my-cms">
    <section class="section">
      <div class="container">
        <h2 class="is-size-3">{{ r.title }}</h2>
        <div class="is-size-6" v-html="r.content"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  validate({ params, query }) {
    if (params["url"]) {
      return true;
    }
    return false; // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
  },

  data() {
    return {};
  },
  async asyncData({ params, $axios }) {
    let url = params.url;
    let r = await $axios.post("/api/page/cmsPage", {
      url,
    });

    return {
      r,
    };
  },
};
</script>

<style lang="scss">
.my-cms {
  h2 {
    font-size: 2rem;
    text-transform: uppercase;
    margin-top: 1rem;
  }
  p {
    margin-top: 0.5rem;
  }
}
</style>
