<template>
  <div>
    <div class="header-top">
      <div
        class="header-global-top is-light"
        :style="{
          backgroundColor: $store.state.S.mainColor,
          color: '#f5f6f8',
          lineHeight: '2rem',
          height: '2rem',
        }"
      >
        <div class="container my-flex">
          <div class="greeting">
            Welcome to {{ $store.state.domain }}, Please feel free to buy, you
            have big chance to recive the dresses.
          </div>
          <div class="quicklinks my-flex">
            <nuxt-link
              :to="localePath('/login')"
              class="has-text-white my-flex"
            >
              <span> Log in </span>
            </nuxt-link>
            <nuxt-link
              style="margin-left: 2rem"
              :to="localePath('/reg')"
              class="has-text-white my-flex"
            >
              <span> Create an account </span>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div
        class="header-top-up"
        :style="{
          backgroundColor: '#fff',
        }"
      >
        <div class="my-flex container">
          <CommonHeaderLogo />

          <div class="slogon is-size-5 has-text-weight-bold">
            Free Shipping over $75
          </div>

          <div class="right-header has-text-weight-bold is-capitalized my-flex">
            <a class="navbar-item" @click="$store.commit('setCartPopup', true)">
              <div class="my-flex" style="position: relative">
                <div class="van-info has-text-white">
                  {{ cartQty }}
                </div>
                {{ $t("c.shopping_cart") }}
                <van-icon
                  name="cart-o"
                  size="25"
                  :color="$store.state.S.mainButtonColor"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      <nav
        class="navbar container van-hairline--top"
        role="navigation"
        aria-label="main navigation"
      >
        <!-- {{ menu }} -->
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="my-flex" style="margin: 0 auto">
            <div
              v-for="(x, index) in menu"
              :key="index"
              class="navbar-item"
              :class="x.children.length > 0 ? 'has-dropdown is-hoverable' : ''"
            >
              <nuxt-link
                :to="localePath('/list') + '?category_id=' + x.id"
                class="navbar-link is-size-6 is-bold"
                style="font-weight: bold"
              >
                {{ x.name }}
              </nuxt-link>

              <div
                class="navbar-dropdown is-capitalized"
                v-if="x.children.length > 0"
              >
                <nuxt-link
                  v-for="(y, yindex) in x.children"
                  :key="yindex"
                  :to="localePath('/list') + '?category_id=' + y.id"
                  class="navbar-item navbar-link"
                >
                  {{ y.name }}
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- <div class="navbar-end">
          <div class="navbar-item"></div>
        </div> -->
        </div>
      </nav>

      <client-only>
        <van-popup
          v-model="showShoppingCart"
          class=""
          closeable
          :duration="0.2"
          :position="'right'"
          :style="{ height: '100%', width: '380px' }"
        >
          <CheckoutMobCartPopup />
        </van-popup>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartQty() {
      let code = this.$i18n.locale;
      return this.$store.state.cart.cartQty[code];
    },
    menu() {
      return this.$store.state.menu;
    },
    showShoppingCart: {
      set(e) {
        this.$store.commit("setCartPopup", e);
      },
      get() {
        return this.$store.getters["showCart"];
      },
    },
  },
};
</script>

<style lang="scss">
.navbar-item.has-dropdown,
.navbar-item {
  padding: 0 1rem;
}
.navbar-link:not(.is-arrowless)::after {
  display: none !important;
}
.navbar-link:not(.is-arrowless) {
  padding-right: 0.75rem !important;
}

.header-top {
  background-color: #fff;
}

.navbar {
  background-color: transparent;
}
</style>
