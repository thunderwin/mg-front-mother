<template>
  <section class="section">
    <div class="container">
      <PageLogin style="max-width: 500px; margin: 0 auto" />

      <div class="create-account" style="text-align: center; margin: 2rem auto">
        <nuxt-link class="button is-light" to="/reg"
          >Create an account</nuxt-link
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  scrollToTop: true,
};
</script>
