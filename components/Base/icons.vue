<template>
  <span :style="{ fontSize: size + 'px' }">
    {{ icons[name] }}
  </span>
</template>

<script>
export default {
  props: ["name", "size"],
  data() {
    return {
      icons: {
        egg: "🥚",
        apple: "🍎",
        watermelon: "🍉 ",
        chicken: "🐔",
        sheep: "🐑 ",
        pig: "🐷",
        cow: "🐂",
        elephant: "🐘",
        dinosaur: "🦖",
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
