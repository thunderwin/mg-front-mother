<template>
  <div>
    <div class="buttons" style="width: 100%">
      <div
        style="margin: 0.5rem 1rem 0 0"
        v-for="(x, xindex) in options"
        :key="xindex"
      >
        <div
          style="font-size: 1rem; color: #333"
          class="button is-capitalized is-light"
          :style="{
            border: option_type_id === x.option_type_id ? '1px solid #333' : '',
          }"
          @click="click(x.option_type_id)"
        >
          {{ x.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options", "option_id"],
  data() {
    return {
      option_type_id: "",
    };
  },
  methods: {
    click(option_type_id) {
      this.option_type_id = option_type_id;
      this.$emit("chosenOption", this.option_id, option_type_id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
