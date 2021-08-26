<template>
  <div class="">
    <van-sticky>
      <div class="van-hairline--bottom">
        <CommonHeader class="van-hairline--bottom" />
      </div>
    </van-sticky>

    <div class="container" style="padding: 1rem">
      <h1 class="" v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>{{ error.message }}</h1>

      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "blog", // you can set a custom layout for the error page
};
</script>
