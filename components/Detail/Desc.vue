<template>
  <div>
    <div class="container detail_desc" style="padding: 1rem">
      <div
        style=""
        id="review"
        v-if="x.description"
        class="desc"
        v-html="x.description.html"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],
};
</script>

<style lang="scss" scoped></style>
