<template>
  <div style="margin-bottom: 30px" class="my-cool-form">
    <!-- {{ finalAtts }} -->
    <!-- {{ atts }} -->
    <!-- {{ customComponent }} -->
    <!-- {{ formValues }} -->
    <!-- <AddItem style="width: 100%" /> -->
    <FormulateForm
      :form-errors="formErrors"
      v-model="formValues"
      :name="name"
      @submit="submitHandler"
      @failed-validation="failedValidation"
    >
      <!-- <div class="form-line" style="display: block"> -->
      <!-- <p class="mynote">{{ x.help }}</p> -->

      <div
        class="form_item"
        v-for="(x, xindex) in finalAtts"
        :key="xindex + 122"
      >
        <component
          v-model="customComponent[x.name]"
          v-if="x.is"
          style="font-size: 1rem"
          :is="'BaseFormBuilder' + x.is"
          :x="x"
        />

        <FormulateInput
          v-else
          style="font-size: 1rem"
          :name="x.name"
          :value="x.value"
          :type="x.type"
          :label="x.label"
          v-model="x.value"
          :validation="x.validation"
          :validation-name="x.validationName"
          :validation-messages="x.validationMessages"
          :placeholder="x.placeholder"
          :help="x.help"
          :options="x.options"
          @input="input"
          class="is-medium"
        />
      </div>

      <FormulateErrors />

      <!-- </div> -->
      <FormulateInput
        v-if="submitBtnText"
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : submitBtnText"
      />
    </FormulateForm>

    <!-- <u-button class="primary" @click="submit">提交</u-button> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    atts: {
      type: Array,
      default() {
        return [];
      },
    },

    id: {
      type: String,
      default() {
        return "";
      },
    },

    submitBtnText: {
      type: String,
      default() {
        return "";
      },
    },
    name: {
      type: String,
      default() {
        return "form";
      },
    },
    translateLabel: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isLoading: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  data() {
    return {
      customComponent: {},
      rules: {}, // 规则
      formValues: {},

      formErrors: [],
    };
  },

  computed: {
    finalAtts() {
      return this.atts.map((x) => {
        if (!x.validation) {
          return x;
        }

        x.validationName = x.name;
        x.validationMessages = {};

        if (x.validation.indexOf("required") > -1) {
          let label = this.translateLabel ? this.$t("c." + x.label) : x.label;
          x.validationMessages["required"] = label + this.$t("c.is_required");
        }

        if (x.validation.indexOf("email") > -1) {
          x.validationMessages["email"] = this.$t("rule.is_email");
        }

        return x;
      });
    },
  },

  beforeMount() {},
  mounted() {},
  methods: {
    input() {
      this.formErrors = [];
    },
    submit() {
      this.$formulate.submit(this.name);
    },
    submitHandler() {
      // 增加验证规则
      // this.$formulate.handle(
      //   {
      //     inputErrors: { first_name: "This address doesn’t appear valid" },
      //     formErrors: ["Also, this form isn’t hooked up yet"]
      //   },
      //   this.name
      // );

      console.log("%c this.customComponent", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.customComponent));

      // 合并来自表单和自定义组件的值
      let obj = Object.assign(this.formValues, this.customComponent);

      console.log("%c 最终提交", "color:green;font-weight:bold");
      console.log(JSON.stringify(obj));

      // console.log("%c finalAtts", "color:green;font-weight:bold");
      // console.log(JSON.stringify(this.finalAtts));

      let requiredKeys = this.finalAtts.filter((x) => {
        return !obj[x.name];
      });

      // console.log("%c requiredKeys", "color:green;font-weight:bold");
      // console.log(JSON.stringify(requiredKeys));
      if (requiredKeys.length > 0) {
        let errorMsg = requiredKeys.map(
          (x) => x.label + this.$t("c.is_required")
        );

        this.formErrors = errorMsg;
        return;
      }

      this.$emit("submit", obj);

      // this.initFormValues(); // 提交数据成功，初始化表单
    },

    failedValidation(e) {
      console.log("%c 表单验证失败", "color:green;font-weight:bold");
      console.log(e);
    },

    initFormValues() {
      // 初始化表单
      this.$formulate.reset(this.name);
      this.formValues = {};
    },
  },
};
</script>

<style></style>
