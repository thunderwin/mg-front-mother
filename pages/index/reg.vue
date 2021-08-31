<template>
  <div class="section">
    <div class="container" style="max-width: 500px; margin: 0 auto">
      <PageReg class="" />

      <div class="create-account" style="text-align: center; margin: 2rem auto">
        <nuxt-link class="button is-light" to="/login"
          >Already have an account</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
};
</script>
