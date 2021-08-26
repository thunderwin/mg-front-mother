<template>
  <div>
    <div class="container" style="padding-bottom: 40px">
      <van-row gutter="30">
        <van-col span="6">
          <!-- <UserCenterNav /> -->
        </van-col>

        <van-col span="16">
          <h1>{{ $t("c.contact_details") }}</h1>
          <!-- {{ userInfo }} -->
          <client-only>
            <FormBuilder
              style="font-size: 16px; font-weight: bold"
              name="contactEdit"
              :atts="atts"
              @submit="submit"
            />

            <FormulateInput
              style="font-size: 16px; font-weight: bold"
              type="text"
              name="email"
              :label="$t('form.email')"
              aria-disabled
              disabled
              :placeholder="userInfo.email"
            />
            <van-button
              square
              color="#D15B4C"
              style="border-radius: 4px; width: 100px"
              type="info"
              @click="submitForm"
              >{{ $t("c.submit") }}
            </van-button>
          </client-only>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
    atts() {
      let x = this.userInfo;
      let a = this.userInfo.addresses[0];

      return [
        {
          name: "firstname",
          value: x.firstname,
          type: "text",
          label: this.$t("form.firstname"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "lastname",
          value: x.lastname,
          type: "text",
          label: this.$t("form.lastname"),
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },

        // {
        //   name: "email",
        //   value: x.email,
        //   type: "text",
        //   label: this.$t("c.email"),
        //   placeholder: "",
        //   validation: "required",
        //   help: "",
        //   disabled: true,
        // },
      ];
    },
  },

  methods: {
    async submit(e) {
      // console.log("%c 最终的提交", "color:green;font-weight:bold");
      // console.log(JSON.stringify(e));

      let r = await this.$store.dispatch("user/updateUserInfo", {
        input: {
          firstname: e.firstname,
          lastname: e.lastname,
          gender: e.gender,
        },
      });

      console.log("%c r", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      if (r.updateCustomerV2) {
        this.$store.dispatch("info/success", this.$t("c.succeed"));
        this.$nuxt.refresh();
      }
    },
    submitForm() {
      this.$formulate.submit("contactEdit");
    },
  },

  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    await store.dispatch("user/getUser");
  },
};
</script>

<style lang="scss" scoped></style>
