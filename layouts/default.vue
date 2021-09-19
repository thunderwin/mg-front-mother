<template>
  <!-- 默认的结构 -->

  <div
    class="webapp"
    :style="{
      fontFamily:
        $store.state.S.fontFamilyContent +
        ',DM Sans, system-ui, -apple-system, Segoe UI, Roboto !important;',
    }"
  >
    <div class="van-hairline--bottom">
      <CommonHeader class="van-hairline--bottom" />
    </div>
    <Nuxt keep-alive :keep-alive-props="{ include: ['product-list-page'] }" />

    <CommonFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      font: "Avenir Next",
    };
  },

  components: {},

  head() {
    // seo
    const canonicalUrl = "https://pre-vue.web.app" + this.$route.path;
    return {
      link: [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ],
      meta: [{ property: "og:url", content: canonicalUrl }],
    };
  },
};
</script>

<style></style>
