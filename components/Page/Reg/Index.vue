<template>
  <div class="box reg-box" style="padding: 2rem">
    <div class="has-text-centered is-size-4 mb-4" style="font-weight: bold">
      {{ $t("c.creat_user_account") }}
    </div>

    <client-only>
      <BaseFormBuilder style="" name="register" :atts="atts" @submit="submit" />
    </client-only>

    <!-- <AgreeTerm /> -->

    <div class="buttsss is-capitalized" style="text-align: center">
      <button
        class="button is-black is-capitalized"
        style="border-radius: 4px"
        @click="reg"
        :style="{
          backgroundColor: $store.state.S.mainButtonColor,
        }"
      >
        {{ $t("c.register") }}
      </button>
    </div>
  </div>
</template>

<script>
// import AgreeTerm from "@/components/common/userEdit/agreeTerm.vue";

export default {
  computed: {
    atts() {
      return [
        // {
        //   name: "prefix",
        //   value: "",
        //   type: "select",
        //   label: this.$t("form.title"),
        //   validation: "required",
        //   help: "",
        //   options: [
        //     { value: "mr", label: this.$t("form.mrs") },
        //     { value: "mrs", label: this.$t("form.miss") },
        //   ],
        // },
        {
          name: "firstname",
          value: "",
          type: "text",
          label: this.$t("c.firstname"),
          validation: "required",
          help: "",
        },
        {
          name: "lastname",
          value: "",
          type: "text",
          label: this.$t("c.lastname"),
          validation: "required",
          help: "",
        },
        // {
        //   name: "country",
        //   value: "",
        //   type: "text",
        //   label: this.$t("form.place_of_residence"),
        //   validation: "required",
        //   help: ""
        // },
        // {
        //   name: "phone",
        //   value: "",
        //   type: "tel",
        //   label: this.$t("form.mobile_number"),
        //   placeholder: "+85",
        //   validation: "required",
        //   help: ""
        // },
        {
          name: "email",
          type: "email",
          label: this.$t("c.email"),
          value: "",
          validation: "^required|email",
        },
        {
          name: "password",
          type: "password",
          label: this.$t("c.password"),
          value: "",
          validation: "required|min:8,length",
        },
        {
          name: "password_confirm",
          type: "password",
          label: this.$t("c.confirm_password"),
          value: "",
          validation: "required|confirm",
        },
      ];
    },
  },
  beforeMount() {},
  methods: {
    async submit(e) {
      console.dir("注册表单的提交");
      console.log(JSON.stringify(e));

      let r = await this.$store.dispatch("user/reg", e);

      console.log("%c 注册结果", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      if (r.code === 400) {
        this.$formulate.handle(
          {
            formErrors: [this.$t("c.already_used")],
          },
          "register"
        );
        return;
      }
      this.$store.dispatch("info/success", this.$t("c.succeed"));

      let redpath = this.$route.query.red;
      redpath = redpath
        ? this.localePath("/login") + "?red=" + redpath
        : this.localePath("/login");
      this.$router.push(redpath);

      return;
    },
    reg() {
      console.log("%c ", "color:green;font-weight:bold");

      this.$formulate.submit("register");
    },
  },
};
</script>
