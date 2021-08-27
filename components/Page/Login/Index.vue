<template>
  <div class="box login_box" style="padding: 2rem; text-transform: capitalize">
    <!-- <h1 class="title has-text-centered">{{T.signin}}</h1> -->
    <div class="has-text-centered is-size-4 mb-4" style="font-weight: bold">
      Customer Login
    </div>
    <client-only>
      <BaseFormBuilder
        style=""
        ref="loginForm"
        name="login"
        :atts="atts"
        @submit="submitInfo"
      />

      <div class="buttsss" style="text-align: center">
        <button
          :class="isLoading ? 'is-loading' : ''"
          class="button is-black"
          :style="{
            backgroundColor: $store.state.S.mainButtonColor,
          }"
          @click="submit"
        >
          {{ $t("c.login") }}
        </button>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.commit("user/logout");
  },
  data() {
    return {
      atts: [
        {
          name: "email",
          value: "",
          type: "text",
          label: this.$t("form.email"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "password",
          value: "",
          type: "password",
          label: this.$t("c.password"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
      ],

      isLoading: false,
    };
  },
  methods: {
    submit() {
      this.$formulate.submit("login");
    },
    async submitInfo(e) {
      this.isLoading = true;
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));

      let r = await this.$store.dispatch("user/login", e);
      this.isLoading = false;

      if (r === "ok") {
        this.$router.push("/user");
        return;
      }
      if (r) {
        this.$refs.loginForm.formErrors.push(r);
        return;
      }
    },
    // async onSubmit(e) {
    //   try {
    //     let response = await this.$store.dispatch("permission/login", e).then();

    //     console.log(response);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  },
};
</script>

<style lang="scss"></style>
