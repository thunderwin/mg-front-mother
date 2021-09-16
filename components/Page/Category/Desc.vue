<template>
  <section class="">
    <div class="container" style="margin: 1rem auto">
      <div class="is-size-4" style="text-align: center">
        {{ categorys.name }}
      </div>
      <div
        v-if="categorys.description"
        class="description"
        style="padding: 1rem"
        v-html="categorys.description"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["categorys"],
};
</script>

<style lang="scss" scoped></style>
