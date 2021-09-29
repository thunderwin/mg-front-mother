<template>
  <div
    class="choose-option"
    style="justify-content: flex-start; flex-wrap: wrap"
  >
    <!-- {{ formValues }}
    {{ option }} -->
    <client-only>
      <FormulateForm
        :form-errors="formErrors"
        v-model="formValues"
        name="customOption"
        @submit="submit"
      >
        <FormulateInput
          v-for="(o, oindex) in option"
          :key="oindex + 3"
          :name="JSON.stringify(o.option_id)"
          :validation-name="o.title"
          :label="o.title"
          type="radio"
          :options="
            o.value.map((x) => ({
              label: x.title,
              value: x.option_type_id,
            }))
          "
          validation="required"
          class="is-medium"
        />
      </FormulateForm>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["option"],
  data() {
    return {
      formValues: {},
      formErrors: [],
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
    submit(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
      this.$emit("doAddCart", e);
    },
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

<style lang="scss">
.choose-option {
  .formulate-input-label {
    text-transform: capitalize;
  }
  .formulate-input-group-item[data-has-value="true"] {
    border: 1px solid #000;
  }
  .formulate-input-element--group {
    display: flex !important;
    flex-flow: wrap;
  }
  .formulate-input-group-item:hover {
    box-shadow: 0 2px 5px 0 rgb(213 217 217 / 50%);
  }
  .formulate-input-group-item {
    background-color: #eee;
    margin-right: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;

    .formulate-input-element--radio {
      display: none;
    }
    .formulate-input-wrapper {
    }
    .formulate-input-label--after {
      text-align: center;
      width: 70px;
      height: 35px;
      line-height: 35px;
      margin-left: 0;
      cursor: pointer;
    }
  }
}
</style>
