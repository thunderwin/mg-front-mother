<template>
  <div class="checkout is-capitalized">
    <client-only>
      <!-- {{ formValues }} -->
      <FormulateForm
        :form-errors="formErrors"
        v-model="formValues"
        name="contact"
        @submit="submit"
      >
        <div class="is-size-5">Contact information</div>
        <FormulateInput
          name="email"
          :label="$t('c.email')"
          validation="required|email"
          class="is-medium is-capitalized"
        />

        <div class="is-size-5">Shipping address</div>

        <FormulateInput
          name="firstname"
          :label="$t('c.firstname')"
          validation="required"
          class="is-medium"
        />

        <FormulateInput
          name="lastname"
          :label="$t('c.lastname')"
          validation="required"
          class="is-medium"
        />

        <FormulateInput
          name="street"
          :label="$t('c.street')"
          validation="required"
          class="is-medium"
        />

        <FormulateInput
          name="postcode"
          type="number"
          label="Postcode"
          validation="required"
          class="is-medium"
        />

        <FormulateInput
          name="city"
          type="text"
          label="City"
          validation="required"
          class="is-medium"
        />

        <FormulateInput
          name="country"
          type="select"
          label="country/region"
          validation="required"
          :options="countries"
          class="is-medium"
          @input="countryChange"
        />

        <!-- {{ countries }} -->
        <!-- {{ country }} -->

        <FormulateInput
          v-if="provinces.length > 0"
          name="province"
          type="select"
          :label="$t('c.province')"
          validation="required"
          :options="provinces"
          @input="provinceChange"
          class="is-medium"
        />

        <!-- {{ provinces }} -->

        <!-- {{ province }} -->

        <FormulateInput
          name="telephone"
          type="number"
          label="Phone"
          validation="required"
          class="is-medium"
        />

        <FormulateErrors />
      </FormulateForm>

      <!-- <van-area title="标题" :area-list="chinaAddress" :columns-num="2" /> -->

      <!-- <AgreeTerm @submit="submitContact" /> -->
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["options", "sku"],
  components: {},

  data() {
    return {
      countries: [],
      formErrors: [],
      formValues: {
        email: "",
      },
      country: "",
      chinaAddress: "",

      available_regions: [],
      provinces: [],

      chinaCity: [],

      countriesOrgianl: [],

      oldAddress: "",
    };
  },

  async mounted() {
    await this.getCountries();
  },
  watch: {
    oldAddress(v) {
      this.initOldAddress(v);
    },
  },
  methods: {
    initOldAddress(v) {
      console.log("%c v", "color:green;font-weight:bold");
      console.log(JSON.stringify(v));

      for (let x in v) {
        // console.log("%c xxxxx", "color:green;font-weight:bold");
        // console.log(JSON.stringify(x));

        if (x === "country") {
          this.formValues[x] = v[x].code;
        } else if (x === "province") {
          this.formValues[x] = v[x] ? v[x].code : ""; // fix 省份可能为0
        } else if (x === "street") {
          this.formValues[x] = v[x][0];
        } else {
          this.formValues[x] = v[x];
        }
      }

      console.log("%c this.formValues", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.formValues));
    },
    countryChange(v) {
      console.log("%c 国家改变", "color:green;font-weight:bold");
      console.log(JSON.stringify(v));

      this.provinces = [];

      let one = this.countriesOrgianl.find((x) => x.id === v);

      console.log("%c one", "color:green;font-weight:bold");
      console.log(JSON.stringify(one));

      if (one && !!one.available_regions) {
        this.available_regions = one.available_regions;
        this.provinces = one.available_regions.map((x) => {
          return {
            value: x.code,
            label: x.name,
          };
        }); // 防止这里出现重复keybug

        let defaulProvinceCode = this.available_regions[0].code;
        this.formValues.region = defaulProvinceCode; // 省份默认设置为第一个
        this.formValues.province = defaulProvinceCode; // 省份默认设置为第一个
      }
    },

    provinceChange(v) {
      console.log("%c 被选中的province", "color:green;font-weight:bold");
      console.log(v);
      if (v) {
        let thatOne = this.available_regions.find((x) => x.code === v);
        this.formValues.region = thatOne.code;
      }
    },

    async getCountries() {
      let r = await this.$axios.post("/api/store/countries");

      console.log("%c 全部的国家", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      this.countriesOrgianl = r.countries;

      this.countries = r.countries.map((x) => ({
        value: x.id,
        label: x.full_name_english,
      }));
    },

    injectChinaProvince() {
      let o = Country.find((x) => x.id === "CN");
      this.provinces = o.available_regions.map((x) => {
        return {
          ...x,
          label: x.name,
          value: x.id,
        };
      });
      return;
    },
    handleCity(v) {
      console.log("%c v", "color:green;font-weight:bold");
      console.log(JSON.stringify(v));
      let code = v.slice(0, 2);
      console.log("%c code", "color:green;font-weight:bold");
      console.log(JSON.stringify(code));

      this.chinaCity = Object.keys(chinaCities.city_list)
        .map((x) => ({
          label: chinaCities.city_list[x],
          value: x,
        }))
        .filter((x) => code === x.value.slice(0, 2));
    },

    submitContact() {
      if (this.provinces.length === 0) {
        this.formValues.region = "";
      }
      this.$formulate.submit("contact");
    },
    async submit(e) {
      this.$emit("submit", e);
    },
  },
};
</script>

<style lang="scss"></style>
