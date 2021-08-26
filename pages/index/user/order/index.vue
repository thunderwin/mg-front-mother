<template>
  <div class="section">
    <div class="container" style="padding-bottom: 40px">
      <div class="is-size-3" style="margin-bottom: 1rem">
        {{ $t("c.my_orders") }}
      </div>

      <!-- {{ userInfo }} -->

      <div class="all-orders" v-if="!!orders">
        <div v-if="orders.length === 0" class="no-order">
          {{ $t("c.no_order_history") }}
        </div>

        <div v-else class="has-order">
          <div v-for="(x, index) in orders" :key="index" class="each_order box">
            <!-- {{ x }} -->
            <UserOrderItem :id="x.entity_id" :x="x" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: 0,
      showIndex: 0,
    };
  },

  computed: {
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
  },

  methods: {
    showdetail() {},
  },

  fetch() {
    console.log("%c ???", "color:green;font-weight:bold");
  },

  async mounted() {
    let orders = await this.$axios.post("/api/order/orderByEmail", {
      email: this.userInfo.email,
    });
    console.log("%c orders", "color:green;font-weight:bold");
    console.log(JSON.stringify(orders));

    this.orders = orders.items;
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
