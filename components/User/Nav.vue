<template>
  <div class="card box" style="margin-top: 30px">
    <div
      class="headdd"
      style="font-size: 18px; margin-bottom: 20px; font-weight: bold"
    >
      {{ $t("c.my_account") }}
    </div>
    <ul>
      <nuxt-link
        v-for="(x, index) in menu"
        :key="index"
        :to="localePath('/user') + x.url"
      >
        <li style="margin-bottom: 10px; font-size: 16px">{{ x.name }}</li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return [
        {
          name: this.$t("c.order_history"),
          url: "/order",
          icon: "",
        },
        {
          name: this.$t("c.contact_details"),
          url: "/contact",
          icon: "",
        },
        {
          name: this.$t("c.change_password"),
          url: "/password",
          icon: "",
        },
        {
          name: this.$t("c.notification_preferences"),
          url: "/notification",
          icon: "",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
