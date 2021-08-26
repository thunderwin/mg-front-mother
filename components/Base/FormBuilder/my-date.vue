<template>
  <div>
    <!-- {{ x }} -->
    <p class="formulate-input-label">{{ x.label }}</p>
    <!-- <p style="font-size:20px">{{ month }}</p> -->
    <van-calendar
      :show-title="false"
      :title="x.label"
      :poppable="false"
      :show-subtitle="false"
      :show-confirm="false"
      :style="{ height: '350px' }"
      @select="select"
      @month-show="monthShow"
      :max-date="maxDate"
      :min-date="minDate"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: ["x"],
  model: {
    // prop: 'msg',
    event: "cc"
  },

  beforeMount() {
    if (this.x.sku) {
      console.log("%c 限制存在", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.x.sku));
      let dateSlot = this.x.sku.split("/");
      this.minDate = new Date(dateSlot[0]);
      this.maxDate = new Date(dateSlot[1]);
    } else {
      let today = new Date().getTime() + 1000 * 60 * 60 * 24 * 14; // 默认限制14天
      this.minDate = new Date();

      this.maxDate = new Date(today);
    }
  },

  computed: {},

  data() {
    return {
      value: "",
      month: "",
      maxDate: "",
      minDate: ""
    };
  },
  methods: {
    select(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
      this.value = e;

      let d = dayjs(e).format("YYYY-MM-DD HH:mm:ss"); // display

      this.$emit("cc", d);
    },
    monthShow(e) {
      console.log("%c monthShow", "color:green;font-weight:bold");
      console.log(JSON.stringify(e.date));

      let d = dayjs(e.date).format("YYYY-MM-DD HH:mm:ss"); // display

      this.$emit("cc", d);

      this.month = new Date(e.date).toLocaleString();
    }
  }
};
</script>

<style lang="scss">
.van-calendar__header {
  box-shadow: none !important;
}
.van-calendar__month-title {
  display: none;
}
</style>
