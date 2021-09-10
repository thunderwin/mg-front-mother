<template>
  <div class="container user_center" style="padding-bottom: 30px">
    <div class="account_page_header">
      <h1>My account</h1>
      <p>
        {{ $t("c.welcome") }}, {{ userInfo.firstname }} {{ userInfo.lastname }}.
      </p>
    </div>

    <van-grid
      style="max-width: 800px; margin: 0 auto"
      :column-num="2"
      icon-size="2rem"
      :gutter="20"
    >
      <van-grid-item
        v-for="(x, index) in menu"
        :key="index"
        style="cursor: pointer"
        :text="x.name"
        :to="localePath('/user') + '/' + x.url"
      >
        <van-icon
          style="margin-top: 1rem"
          slot="icon"
          size="2rem"
          :name="x.icon"
        />
        <div
          style="
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0px;
            width: 70%;
            text-align: center;
            margin-bottom: 1rem;
          "
          slot="text"
        >
          {{ x.name }}
        </div>
      </van-grid-item>
    </van-grid>

    <div class="buttnnss" style="text-align: center; margin-top: 30px">
      <button
        class="button"
        :style="{
          backgroundColor: $store.state.S.mainColor,
        }"
        @click="logout"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    menu() {
      return [
        {
          name: "Orders",
          url: "order",
          icon: "orders-o",
        },
        // {
        //   name: "Contact details",
        //   url: "contact",
        //   icon: "logistics",
        // },
        {
          name: "Change password",
          url: "password",
          icon: "points",
        },
        // {
        //   name: "Notification preferences",
        //   url: "/notification",
        //   icon: "notification.svg",
        // },
      ];
    },
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    click(path) {
      this.$router.push("/user/" + path);
    },
    getUser() {
      this.$store.dispatch("user/getUser");
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push(this.localePath("/"));
    },
  },
};
</script>

<style>
.user_center .van-grid-item__content {
  background-color: #d15b4c0d !important;
}
.account_page_header {
  text-align: center;
  margin-bottom: 30px;
}
.account_page_header h1 {
  font-size: 28px;
  color: #1b1c1e;
  font-weight: bold;
}
.account_page_header p {
  font-size: 14px;
}
</style>
