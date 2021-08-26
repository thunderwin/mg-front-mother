<template>
  <div>
    <div class="section">
      <div class="container" style="padding-bottom: 2rem">
        <div class="shadow" style="max-width: 500px; margin: 0 auto">
          <FormulateForm
            :form-errors="formErrors"
            v-model="formValues"
            name="contact"
            @submit="submit"
          >
            <FormulateInput
              name="oldpassword"
              type="password"
              label="Old password"
              validation="required"
              class="is-medium"
            />

            <FormulateInput
              name="password"
              type="password"
              label="New password"
              validation="required|confirm"
              class="is-medium"
            />
            <FormulateInput
              name="password_confirm"
              type="password"
              label="Confirm new password"
              validation="required|confirm"
              class="is-medium"
            />
            <FormulateErrors />
          </FormulateForm>
        </div>
        <button class="button is-light">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formErrors: [],
      formValues: {},
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
    atts() {
      let x = this.userInfo;
      return [
        {
          name: "oldpassword",
          value: "",
          type: "password",
          label: this.$t("form.old_password"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "password",
          value: "",
          type: "password",
          label: this.$t("c.new_password"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "password_confirm",
          value: "",
          type: "password",
          label: this.$t("form.password_confirm"),
          placeholder: "",
          validation: "required|confirm",
          help: "",
          options: "",
        },
      ];
    },
  },
  methods: {
    async submit(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));

      let r = await this.$store.dispatch("user/changeCustomerPassword", {
        newPassword: e.password,
        currentPassword: e.oldpassword,
      });
      if (!r) {
        this.$store.dispatch("info/error", this.$t("c.error"));
        return;
      }
      if (r.changeCustomerPassword) {
        this.$store.dispatch("info/success", this.$t("c.succeed"));
        this.$nuxt.refresh();
      }
    },
    submitForm() {
      this.$formulate.submit("change_pass");
    },
  },
};
</script>

<style lang="scss" scoped></style>
