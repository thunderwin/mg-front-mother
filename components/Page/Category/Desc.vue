<template>
  <section class="">
    <div class="container" style="margin-top: 1rem">
      <div class="is-size-4" style="text-align: center">
        {{ categorys.name }}
      </div>
      <div
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
