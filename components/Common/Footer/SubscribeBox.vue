<template>
  <div class="contact-box" style="margin: 1rem 0">
    <div class="booox my-flex" style="">
      <client-only>
        <FormulateForm
          :form-errors="formErrors"
          v-model="formValues"
          name="subscrib"
          @submit="submit"
          style="width: 100%"
        >
          <!-- <div class="form-line" style="display: block"> -->
          <!-- <p class="mynote">{{ x.help }}</p> -->

          <FormulateInput
            name="Email"
            validation="required|email"
            class="is-medium"
            placeholder="Email"
            style="width: 100%"
          />

          <FormulateErrors />
        </FormulateForm>

        <button
          @click="$formulate.submit('subscrib')"
          :class="subLoading ? 'is-loading' : ''"
          class="button is-light"
          style="margin-left: 1rem"
        >
          SIGN UP
        </button>
      </client-only>
    </div>

    <div class="tetxtt mt-4">
      By signing up for email, you agree to {{ $store.state.domain }}'s Terms of
      Service and Privacy Policy.
    </div>
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

      subLoading: false,
    };
  },
  computed: {},
  mounted() {},

  methods: {
    async submit(e) {
      this.subLoading = true;
      await this.$store.dispatch("user/subscribeEmailToNewsletter", {
        email: e.Email,
      });

      this.subLoading = false;
    },
  },
};
</script>

<style lang="scss">
.contact-box .formulate-input .formulate-input-element {
  max-width: 100% !important;
}
.contact-box .formulate-input {
  margin-bottom: 0 !important;
}
</style>
