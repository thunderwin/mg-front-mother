<template>
  <div class="contact-box box" style="padding: 2rem">
    <div class="is-size-4">{{ $t("c.send_us_message") }}</div>

    <FormulateForm
      :form-errors="formErrors"
      v-model="formValues"
      name="contact-us"
      @submit="submit"
    >
      <FormulateInput
        name="title"
        :label="$t('c.name')"
        type="text"
        validation="required"
        class="is-medium"
      />

      <FormulateInput
        name="firstname"
        :label="$t('form.email')"
        validation="required"
        class="is-medium"
      />

      <FormulateInput
        name="message"
        type="textarea"
        :label="$t('form.message')"
        validation="required|email"
        class="is-medium"
      />

      <FormulateErrors />
    </FormulateForm>

    <!-- <van-area title="标题" :area-list="chinaAddress" :columns-num="2" /> -->

    <!-- <AgreeTerm @submit="submitContact" /> -->
  </div>
</template>

<script>
export default {
  components: {},
  beforeMount() {},
  data() {
    return {
      formValues: {},
      formErrors: [],
    };
  },
  computed: {},
  mounted() {},

  methods: {
    async submit(e) {
      this.$emit("submit", e);
    },
  },
};
</script>

<style lang="scss">
.morecloc .formulate-input-label {
  font-size: 13px;
}
</style>
