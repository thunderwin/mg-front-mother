<template>
  <div class="section">
    <div class="container" style="max-width: 500px; margin: 0 auto">
      <PageReg class="is-capitalized" />

      <div
        class="create-account is-capitalized"
        style="text-align: center; margin: 2rem auto"
      >
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
