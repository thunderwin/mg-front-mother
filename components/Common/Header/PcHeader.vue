<template>
  <div>
    <div class="header-top">
      <div
        class="header-global-top is-light"
        :style="{
          backgroundColor: $store.state.S.headerTopColor,
          color: '#f5f6f8',
          lineHeight: '2rem',
          height: '2rem',
        }"
      >
        <div class="container my-flex">
          <span class="greeting"> Welcome to {{ $store.state.domain }}. </span>

          <client-only>
            <div class="quicklinks my-flex">
              <!-- {{ userInfo }} -->

              <nuxt-link
                v-show="$store.state.user.token"
                :to="localePath('/user')"
                class="has-text-white my-flex"
              >
                <span> User center </span>
              </nuxt-link>

              <nuxt-link
                v-show="!$store.state.user.token"
                :to="localePath('/login')"
                class="has-text-white my-flex"
              >
                <span> Log in </span>
              </nuxt-link>
              <nuxt-link
                v-show="!$store.state.user.token"
                style="margin-left: 2rem"
                :to="localePath('/reg')"
                class="has-text-white my-flex"
              >
                <span> Create an account </span>
              </nuxt-link>
            </div>
          </client-only>
        </div>
      </div>

      <div
        class="header-top-up"
        :style="{
          backgroundColor: '#fff',
          margin: '0.5rem 0',
        }"
      >
        <div class="my-flex container">
          <CommonHeaderLogo />

          <div class="slogon has-text-weight-bold">
            <CommonHeaderSlogan />
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
                  :color="$store.state.S.mainColor"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- {{ menu }} -->

      <div class="dropdown is-hoverable van-hairline--top" style="width: 100%">
        <div class="dropdown-trigger my-flex" style="margin: 0 auto">
          <div
            v-for="(x, index) in menu"
            :key="index"
            class="navbar-item"
            :class="x.children.length > 0 ? '' : ''"
            @mouseover="mouseOver(index)"
          >
            <nuxt-link
              :to="localePath('/c') + '/' + x.id"
              class="navbar-link is-size-6 is-bold"
              style="font-weight: bold"
            >
              {{ x.name }}
            </nuxt-link>
          </div>
        </div>

        <div
          class="dropdown-menu"
          v-if="showMenus.children.length > 0"
          role="menu"
          style="width: 100%"
        >
          <div class="dropdown-content">
            <div class="container">
              <div class="sub-categoryss">
                <!-- {{ showMenus }} -->
                <div class="is-capitalized">
                  <van-grid gutter="20" :border="false" :column-num="8" center>
                    <van-grid-item
                      :to="localePath('/c') + '/' + y.id"
                      v-for="(y, yindex) in showMenus.children"
                      :key="yindex"
                      style="cursor: pointer"
                    >
                      <van-image
                        height="auto"
                        width="100%"
                        lazy-load
                        fit="contain"
                        :src="y.img"
                      >
                        <template v-slot:loading>
                          <van-loading type="spinner" size="20" />
                        </template>
                      </van-image>
                      {{ y.name }}
                    </van-grid-item>
                  </van-grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <nav
        class="navbar container van-hairline--top"
        role="navigation"
        aria-label="main navigation"
      >
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


        </div>
      </nav> -->

      <client-only>
        <van-popup
          v-model="showShoppingCart"
          class=""
          closeable
          :duration="0.2"
          :position="'right'"
          :style="{ height: '100%', width: '380px' }"
        >
          <CartPopupCart />
        </van-popup>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIndex: 0,
    };
  },

  computed: {
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },

    showMenus() {
      return this.menu[this.showIndex];
    },

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
  methods: {
    mouseOver(e) {
      this.showIndex = e;
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

.dropdown-menu {
  padding-top: 0 !important;
}
</style>
