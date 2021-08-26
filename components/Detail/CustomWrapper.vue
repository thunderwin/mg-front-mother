<template>
  <div class="" style="justify-content: flex-start; flex-wrap: wrap">
    <!-- {{ chosen }} -->
    <div class="each-option" v-for="(o, oindex) in option" :key="oindex">
      <div
        class="option-label is-capitalized is-size-5"
        style="margin-top: 1rem"
      >
        {{ o.title }}
      </div>
      <div class="option-options">
        <DetailCustomOption
          :options="o.value"
          :option_id="o.option_id"
          @chosenOption="chosenOption"
        />
      </div>

      <div
        v-if="o.option_id == showErrorOptionId"
        style="color: #960505; margin-top: 0.5rem"
        class="err-msg is-warning"
      >
        {{ o.title }} is required
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["option"],
  data() {
    return {
      chosen: {},
      showErrorOptionId: "", // 显示错误的Id
    };
  },
  mounted() {
    this.option.forEach((x) => {
      this.chosen[x.option_id] = "";
    });

    console.log("%c this.chosen", "color:green;font-weight:bold");
    console.log(JSON.stringify(this.chosen));
  },
  methods: {
    chosenOption(option_id, option_type_id) {
      this.showErrorOptionId = "";
      // console.log("%c ", "color:green;font-weight:bold");
      console.log(JSON.stringify(option_id));
      console.log(JSON.stringify(option_type_id));
      this.chosen[option_id] = option_type_id;
    },

    checkIfChosen() {
      for (let x in this.chosen) {
        if (!this.chosen[x]) {
          this.showErrorOptionId = x;
          return false;
        }
      }

      return true;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
