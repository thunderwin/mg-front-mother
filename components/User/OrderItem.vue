<template>
  <div class="container order_details">
    <!-- {{ id }} -->

    <!-- {{ x.state }} -->
    <div class="header">
      <div class="left">
        <!-- <h2 style="font-size: 24px; font-weight: bold">
          {{ $t("c.order_detail") }}
        </h2> -->

        <!-- {{ x }} -->
        <div class="is-size-5">
          {{ $t("c.order_number") }}: {{ x.increment_id }}
        </div>
        <div class="is-size-6">
          {{ $t("c.order_date") }}: {{ x.created_at }}
        </div>

        <div class="size-area">
          <!-- {{ x.items }} -->

          <div
            v-for="(item, index) in x.items"
            class="each-product"
            :key="index"
          >
            <!-- {{ item }} -->
            <div class="is-size-6">
              {{ item.name }} X {{ item.qty_ordered }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <button class="button is-light" v-if="x.state === 'new'" @click="rePay">
          {{ $t("c.wait_payment") }}
        </button>

        <button
          class="button is-light"
          v-else-if="x.state === 'complete' || x.state === 'processing'"
        >
          {{ $t("c.finished") }}
        </button>

        <button class="button is-light" v-else>
          {{ $t("c.payment_failed") }}
        </button>
      </div>
    </div>

    <!-- <OrderItemsRead
      v-if="itemList.length > 0"
      ref="orderItems"
      :edit="false"
      :items="itemList"
      :showDetailOnly="true"
    /> -->
  </div>
</template>

<script>
import Helper from "@/assets/js/helper";

export default {
  props: ["id", "x"],

  async mounted() {
    this.realId = this.id;
    await this.fetchOrder();
  },

  data() {
    return {
      payObj: {},

      showRedeem: false,
      showRefund: false,

      needRefund: false,
      refundAtts: [
        {
          name: "first name",
          value: "",
          type: "text",
          is: "my-text",
          label: "first name",
          placeholder: "first name",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "phone number",
          value: "",
          type: "text",
          is: "my-text",
          label: "Telephone No.",
          placeholder: "Telephone No.",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "Refund Method",
          value: "",
          type: "text",
          is: "my-text",
          label: "Refund Method",
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "Refund Amount",
          value: "",
          type: "text",
          is: "my-text",
          label: "Refund Amount",
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "last name",
          value: "",
          type: "text",
          is: "my-text",
          label: "last name",
          placeholder: "last name",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "email",
          value: "",
          type: "text",
          is: "my-text",
          label: "email address",
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
        {
          name: "amount info",
          value: "",
          type: "text",
          is: "my-text",
          label: "Refund Account Information",
          placeholder: "",
          validation: "required",
          help: "",
          options: "",
        },
      ],
      refundAtts2: [],
      changedItmes: [],
      refundItems: [],
      readOnlyList: [],
      refundInfo: {},
      fakeId: "",

      itemList: [],
    };
  },

  computed: {
    readOnlyListSplited() {
      return this.$store.getters["adminOrderDetail/readOnlyListSplited"];
    },

    ifRefund() {
      let one = this.readOnlyListSplited.find((x) => x.type === "refund");
      return one.list.length > 0;
    },

    order() {
      return this.$store.getters["adminOrderDetail/orderInfo"];
    },
  },
  methods: {
    async fetchOrder() {
      return;
      let r = await this.$store.dispatch("adminOrderDetail/getOrderDetail", {
        realId: this.realId,
      });

      // console.log("%c 订单产品详情", "color:green;font-weight:bold");
      // console.log(JSON.stringify(r));

      this.itemList = r;
    },

    async rePay() {
      this.payObj = await this.$store.dispatch("cart/pay", {
        orderId: this.x.increment_id,
      });

      console.log("%c payObj", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.payObj));

      console.log("%c document", "color:green;font-weight:bold");
      console.log(document);

      this.$nextTick(() => {
        document["payFormCcard" + this.id].submit();
      });
    },
  },
};
</script>

<style lang="scss">
.order_details .header,
.order_details .main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order_right .title {
  font-size: 16px;
  margin-bottom: 10px !important;
}
.red_notes {
  background-color: #f5e3e1;
  border: 1px solid #e66e6a;
  color: #e66e6a;
  padding: 5px 10px;
  font-size: 13px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.inner_scroll {
  overflow-y: scroll;
  height: 400px;
}
</style>
