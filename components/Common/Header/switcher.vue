<template>
  <div>
    <div
      class="navbar"
      style="font-size: 1rem"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <div
              v-if="availableLocales.length > 0"
              class="navbar-item has-dropdown is-hoverable"
            >
              <a class="navbar-link" style="font-weight: bold">
                <p>
                  {{ currentLanguage.txt }}
                </p>
              </a>

              <div class="navbar-dropdown">
                <nuxt-link
                  class="navbar-item is-size-6"
                  v-for="(x, index) in availableLocales"
                  :key="index"
                  :to="switchLocalePath(x.code)"
                  @click="switchLang(x.code)"
                  style=""
                >
                  <p>
                    {{ x.name }}
                  </p>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div> -->

      <FormulateInput
        style="color: white"
        type="select"
        :options="availableLocales"
      />

      <!-- <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu4"
            >
              <span>Hover me</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p>
                  You can insert <strong>any type of content</strong> within the
                  dropdown menu.
                </p>
              </div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCurrencyBox: false,
      showLanguageBox: false,

      showPopover: false,
    };
  },

  mounted() {
    // this.getLanguges();
    // this.getCurrencies();
  },

  computed: {
    storeLanguages() {
      return this.$store.getters["storeLanguages"];
    },

    currentLanguage() {
      let r = this.$i18n.locale;
      console.log("%c 当前的语言代码", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      if (r === "en") {
        return {
          code: "EN",
          txt: "English",
        };
      } else if (r === "cn") {
        return {
          code: "SC",
          txt: "简体中文",
        };
      } else {
        return {
          code: "TC",
          txt: "繁體中文",
        };
      }
      return r.toUpperCase();
    },
    currentCurrency() {
      return this.$store.state.shop.currentCurrency;
    },

    availableLocales() {
      let r = this.$i18n.locales;
      console.log("%c availableLocales", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      r = r.map((x) => {
        x.value = x.code;
        x.label = x.name;
        return x;
      });

      return r;
    },
  },

  methods: {
    async switchLang(code) {
      // console.log("%c code", "color:green;font-weight:bold");
      // console.log(JSON.stringify(code));
      // this.switchLocalePath(code);
    },
    onSelect(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(e);
    },

    getLanguges() {
      let languages = this.$store.state.shop.storeLanguages;
      if (languages.length === 0) {
        this.$store.dispatch("shop/getStoreLanguages");
      }
    },
    getCurrencies() {
      let currencies = this.$store.state.shop.storeCurrencies;
      if (currencies.length === 0) {
        this.$store.dispatch("shop/getStoreCurrencies");
      }
    },
    changeLanguge(code) {
      console.log("%c lang", "color:green;font-weight:bold");
      console.log(JSON.stringify(code));

      // this.$store.commit("setCurrentLanguage", code);
      // this.showLanguageBox = false;
      // this.$store.dispatch("getConfig");
      // this.$store.dispatch("menu");
      // this.$i18n.locale = code;

      // this.$router.app.refresh(); // 重启
    },
    changeCurrency(currency) {
      this.$store.commit("shop/setCurrentCurrency", currency);
      this.showCurrencyBox = false;
    },
  },
};
</script>

<style lang="scss">
.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.dropdown {
  display: inline-flex;
  position: relative;
  vertical-align: top;
}
</style>
