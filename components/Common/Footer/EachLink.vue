<template>
  <nuxt-link
    class="navbar-item has-text-dark"
    style="line-height: 2rem"
    :to="localePath('/info') + '/' + x.code"
  >
    <span>{{ x.label || x.name }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: ["x"],
};
</script>

<style lang="scss" scoped></style>
