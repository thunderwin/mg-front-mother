<template>
  <div>
    <div class="tags my-flex" style="flex-wrap: nowrap">
      <span
        class="tag"
        :style="{
          backgroundColor: $store.state.S.mainColor,
          color: '#fff',
        }"
        v-for="(f, findex) in flatOption"
        :key="findex + 110"
        >{{ f.label }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    flatOption() {
      let list = this.$store.state.filter;
      let ary = [];

      if (list.length > 0) {
        list.forEach((x) => {
          x.options.forEach((z) => {
            if (z.checked) {
              ary.push(z);
            }
          });
        });
      }

      return ary;
    },
  },
};
</script>

<style lang="scss" scoped></style>
