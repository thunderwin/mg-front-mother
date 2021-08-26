<template>
  <div class="container order_details">
    <!-- {{ id }} -->

    <!-- {{ x.state }} -->
    <div class="header">
      <div class="left">
        <!-- <h2 style="font-size: 24px; font-weight: bold">
          {{ $t("c.order_detail") }}
        </h2> -->
        <div style="font-size: 20px; font-weight: bold">
          {{ $t("c.order_number") }}: {{ x.increment_id }}
        </div>
        <div style="font-size: 16px; font-weight: bold">
          {{ $t("c.order_date") }}: {{ x.created_at }}
        </div>
      </div>
      <div class="right">
        <van-button
          v-if="x.state === 'new'"
          square
          color="#D15B4C"
          style="border-radius: 4px; margin-left: 20px"
          type="info"
          @click="rePay"
          >{{ $t("c.wait_payment") }}</van-button
        >

        <van-button
          v-else-if="x.state === 'complete' || x.state === 'processing'"
          square
          color="#06215c"
          style="border-radius: 4px; margin-left: 20px"
          type="info"
          >{{ $t("c.finished") }}</van-button
        >

        <van-button
          v-else
          square
          disabled
          color="#b02318"
          style="border-radius: 4px; margin-left: 20px"
          type="info"
          >{{ $t("c.payment_failed") }}</van-button
        >
      </div>
    </div>

    <!-- <OrderItemsRead
      v-if="itemList.length > 0"
      ref="orderItems"
      :edit="false"
      :items="itemList"
      :showDetailOnly="true"
    /> -->

    <form
      v-if="!!payObj"
      :id="'payFormCcard' + id"
      :name="'payFormCcard' + id"
      method="post"
      action="https://test.paydollar.com/b2cDemo/eng/payment/payForm.jsp"
    >
      <div class="handen" style="display: none">
        <input v-for="(v, k) in payObj" :key="k" :name="k" :value="v" />
      </div>
    </form>
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
