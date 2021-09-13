<template>
  <div>
    <div class="container" style="text-align: center">
      <div
        v-if="paymentResult"
        class="shadow"
        style="justify-content: center; margin: 2rem; padding: 2rem"
      >
        <van-icon
          style="display: block; margin-right: 1rem"
          size="3rem"
          color="#4ca98f"
          name="passed"
        />
        <div style="font-size: 1.6rem; font-weight: bold">
          {{ $t("c.payment_succeed") }}
        </div>
      </div>

      <button class="button is-light" style="" @click="goto">Buy more</button>
      <!-- <van-button square style="border-radius: 4px" type="info" @click="submit"
        >{{ $t("c.download_pdf") }}
      </van-button> -->
    </div>

    <!-- <TicketInfo
      id="pdfDom"
      :showPrint="true"
      @submit="submit"
      :orderRef="orderRef"
      :showQr="true"
    /> -->
    <!-- <TicketInfoPDF id="pdfDom" @submit="submit" :orderRef="orderRef" /> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      htmlTitle: "Payment suceessed",

      paymentResult: null,
    };
  },
  async fetch() {
    let r = await this.$axios.post("/api/payment/paypalCapture", {
      token: this.$route.query.token,
      orderId: this.$route.params.orderId,
    });

    console.log("%c 查询订单支付状态的结果", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (!r.order_number) {
      this.paymentResult = false;
    }

    let code = this.$i18n.locale;
    this.$store.commit("cart/removeCart", code);
    this.$store.commit("cart/setCartQTY", { code, qty: 0 });
    this.paymentResult = true;
  },
  methods: {
    submit() {
      console.log("%c ??", "color:green;font-weight:bold");
      this.toPdf();
    },
    toPdf() {
      var title = this.htmlTitle;
      html2Canvas(document.querySelector("#pdfDom"), {
        allowTaint: true,
      }).then(function (canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = (contentWidth / 592.28) * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 595.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        let PDF = new JsPDF("", "pt", "a4");
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save(title + ".pdf");
      });
    },

    goto() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
