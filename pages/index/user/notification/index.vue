<template>
  <div>
    <div class="container" style="padding-bottom: 40px">
      <van-row gutter="30">
        <van-col span="6">
          <!-- <UserCenterNav /> -->
        </van-col>

        <van-col span="16">
          <h1>{{ $t("c.notification_preferences") }}</h1>
          <!-- <p>What email notification do you want to see?</p> -->

          <!-- {{ value }} -->
          <client-only>
            <FormulateInput
              v-model="value"
              :options="{
                yes: $t('c.yes'),
                no: $t('c.no'),
              }"
              type="radio"
              :label="$t('c.update_promotions')"
            />
            <van-button
              square
              color="#D15B4C"
              style="border-radius: 4px; width: 100px"
              type="info"
              @click="submit"
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
  data() {
    return {
      value: 0,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
  },
  beforeMount() {
    let userInfo = this.$store.getters["user/userInfo"];
    this.value = !!userInfo.is_subscribed ? "yes" : "no";
  },
  methods: {
    async submit() {
      let r = await this.$store.dispatch("user/updateUserInfo", {
        input: {
          is_subscribed: this.value === "yes" ? true : false,
        },
      });

      if (r.updateCustomerV2) {
        this.$store.dispatch("info/success", this.$t("c.succeed"));
        this.$nuxt.refresh();
      }
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
