<template>
  <div>
    <!-- {{ x.data }} -->

    <!-- {{ fakeOptions }} -->

    <FormulateForm v-model="formValues" :name="'qua'">
      <FormulateInput
        v-for="(option, index) in fakeOptions"
        :key="index"
        :name="option.name"
        type="radio"
        :label="option.label"
        validation="required"
        :options="option.options"
        class="is-medium"
      />
    </FormulateForm>

    <div class="price_otppns" v-if="priceOptions.length > 0">
      <div
        style="font-weight: bold; margin-top: 0.75rem"
        v-for="(y, yindex) in priceOptions"
        :key="yindex"
        class="line-itm"
      >
        <p style="font-size: 1rem">{{ y.label }}</p>
        <div class="my-flex">
          <span>HK$ {{ y.price.final_price.value }}</span>
          <van-stepper @change="change" :min="0" v-model="y.qty" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from "@/assets/js/helper";

function formartO(x) {
  return {
    name: x.attribute_code,
    value: "",
    type: "radio",
    label: x.label,
    placeholder: x.label,
    options: x.values.map((y) => {
      return {
        value: y.value_index,
        label: y.label,
      };
    }),
    validation: ["required"],
    validationName: x.label,
  };
}

export default {
  model: {
    // prop: 'msg',
    event: "cc",
  },
  props: ["x"],
  data() {
    return {
      formValues: {},
      fakeOptions: [],
      fakeOptionhelp: [],

      priceOptions: [], // 单独的价格选项
      specialOptions: {}, // 特殊的那个
      nomalOptionLength: 0,
    };
  },
  beforeMount() {
    this.formatOptions(this.x.data.configurable_options);
  },
  watch: {
    formValues: function (v) {
      this.handleOptionLogic(v); // 处理选项上下级之间的逻辑

      let isAllOk = Object.keys(v)
        .map((x) => v[x])
        .every((x) => !!x);

      console.log("%c isAllOk", "color:green;font-weight:bold");
      console.log(JSON.stringify(isAllOk));
      if (!isAllOk) {
        return;
      }

      if (this.nomalOptionLength !== Object.keys(v).length) {
        console.log("%c 还有属性没选", "color:green;font-weight:bold");
        console.log(JSON.stringify());

        return;
      }
      console.log("%c v", "color:green;font-weight:bold");
      console.log(JSON.stringify(v));
      console.log("%c 开始处理价格", "color:green;font-weight:bold");

      if (
        !!this.specialOptions &&
        this.specialOptions.values &&
        this.specialOptions.values.length > 0
      ) {
        console.log("%c 有特殊的需要处理价格", "color:green;font-weight:bold");
        console.log(JSON.stringify());

        this.handlePrices();
      } else {
        console.log("%c 直接返回值给结账表格", "color:green;font-weight:bold");

        let str = Object.keys(v)
          .map((x) => x + v[x])
          .sort()
          .join("");

        this.$emit("cc", [{ str: str, qty: 1 }]);
      }
    },
  },
  methods: {
    ChangOptions(index) {
      console.log("%c index", "color:green;font-weight:bold");
      console.log(JSON.stringify(index));
    },

    formatOptions(options) {
      console.log("%c 参与的options", "color:green;font-weight:bold");
      console.log(JSON.stringify(options));

      this.specialOptions = options.find(
        (x) => x.attribute_code === "cable_age"
      );

      options = options.filter((x) => x.attribute_code !== "cable_age"); // cabel age 单独处理
      this.nomalOptionLength = options.length;

      let labels = options.map((x) => {
        this.formValues[x.attribute_code] = ""; // 先把key 的位置占掉
        return formartO(x);
      });

      this.fakeOptions = labels;
    },

    handleOptionLogic(v) {
      let key = Object.keys(v)[0];
      let value = Number(v[Object.keys(v)[0]]);

      // console.log("%c key value", "color:green;font-weight:bold");
      // console.log(JSON.stringify(key));
      // console.log(JSON.stringify(value));

      let changingIndex = this.fakeOptions.findIndex((x) => x.name === key);
      console.log("%c changingIndex", "color:green;font-weight:bold");
      console.log(JSON.stringify(changingIndex));

      let target = this.fakeOptions[changingIndex + 1];

      let infoSource = this.x.data.variants.map((x) =>
        x.attributes.map((x) => x.value_index)
      );
      // console.log("%c infoSource", "color:green;font-weight:bold");
      // console.log(JSON.stringify(infoSource));

      let whoinclude = infoSource.filter((x) => x.includes(value));

      // console.log("%c whoinclude", "color:green;font-weight:bold");
      // console.log(JSON.stringify(whoinclude));

      // console.log("%c target", "color:green;font-weight:bold");
      // console.log(JSON.stringify(target));

      let avaliabelOptions = whoinclude.map((x) => x[changingIndex + 1]);
      avaliabelOptions = Helper.uniq(avaliabelOptions);

      // console.log("%c 选项之间的关系", "color:green;font-weight:bold");
      // console.log(JSON.stringify(avaliabelOptions));

      let orgainalO = this.x.data.configurable_options[changingIndex + 1];
      console.log("%c orgainalO", "color:green;font-weight:bold");
      console.log(JSON.stringify(orgainalO));

      if (!orgainalO || orgainalO === "undefined") {
        return;
      }

      // let source =
      let finalOptions = orgainalO.values.filter((x) =>
        avaliabelOptions.includes(x.value_index)
      );

      // 改下下面一个的options

      target.options = finalOptions.map((y) => ({
        value: y.value_index,
        label: y.label,
      }));
      // console.log("%c target.options", "color:green;font-weight:bold");
      // console.log(JSON.stringify(target.options));
    },

    handlePrices() {
      this.priceOptions = this.specialOptions.values.map((x) => {
        // 最主要的是确定价格

        let a = Object.assign(this.formValues, { cable_age: x.value_index });

        let str = Object.keys(a)
          .map((o) => o + a[o])
          .sort()
          .join("");

        let optionsStr = this.x.data.variants.map((p) =>
          p.attributes
            .map((t) => t.code + t.value_index)
            .sort()
            .join("")
        );

        let sIndex = optionsStr.findIndex((k) => k === str);

        console.log("%c 找到当前的index", "color:green;font-weight:bold");
        console.log(JSON.stringify(sIndex));

        x.price = this.x.data.variants[
          sIndex
        ].product.price_range.maximum_price;

        x.label = x.label;
        x.id = x.value_index;
        x.qty = 0;

        return x;
      });

      console.log("%c this.priceOptions", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.priceOptions));
    },
    change() {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.priceOptions));

      let a = this.priceOptions.filter((x) => x.qty > 0); // 去掉数量为0的
      a = a.map((x) => {
        let obj = Object.assign(this.formValues, {
          [this.specialOptions.attribute_code]: x.value_index,
        });

        let str = Object.keys(obj)
          .map((z) => z + obj[z])
          .sort()
          .join("");
        return {
          str: str,
          qty: x.qty,
        };
      });

      console.log("%c 最终的提交", "color:green;font-weight:bold");
      console.log(JSON.stringify(a));

      this.$emit("cc", a);
    },
  },
};
</script>

<style lang="scss" scoped></style>
