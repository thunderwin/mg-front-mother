<template>
  <div>
    <client-only>
      <van-popup round v-model="showSubs" style="padding: 2rem; width: 80%">
        <div class="is-size-4">Get extra 20% off</div>

        <p style="margin-bottom: 1rem">For new subscriber</p>

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

        <div class="button-wrapper" style="width: 100%; text-align: center">
          <button
            @click="$formulate.submit('subscrib')"
            :class="subLoading ? 'is-loading' : ''"
            class="button is-light"
            :style="{
              backgroundColor: $store.state.S.mainColor,
              width: '200px',
              margin: '1rem 0 0 0',
            }"
          >
            SUBSCRIBE
          </button>
        </div>
      </van-popup>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSubs: true,
      formValues: {},
      formErrors: [],

      subLoading: false,
    };
  },
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

<style lang="scss" scoped></style>
