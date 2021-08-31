<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon
          name="wap-nav"
          :color="$store.state.S.mobIconColor"
          size="25"
        />
      </template>
      <template #title>
        <CommonHeaderLogo class="color:#000" />
      </template>
      <template #right>
        <!-- <van-icon
          name="shopping-cart-o"
          :color="$store.state.S.mobIconColor"
          size="25"
        /> -->
        <div class="my-flex has-text-white" style="position: relative">
          <div class="van-info has-text-white">
            {{ cartQty }}
          </div>
          <!-- {{ $t("c.shopping_cart") }} -->
          <van-icon
            name="cart-o"
            size="25"
            :color="$store.state.S.mobIconColor"
          />
        </div>
      </template>
    </van-nav-bar>

    <van-popup
      closeable
      close-icon-position="top-left"
      :duration="0.1"
      v-model="showMenu"
      position="left"
      class="is-capitalized"
      :style="{ width: popupWidth, height: '100%' }"
    >
      <!-- <div class="seacrh van-hairline--top-bottom" style="padding:5px 0px">
        <SearchInput
          class=""
          style="margin:1rem"
          @onClear="onClear"
          @result="onSearchResult"
        ></SearchInput>
      </div> -->

      <!-- <SearchList
        style="overflow: overlay; max-height: 80%"
        @onclickDetail="onclickDetail"
        :products="searchResult.products"
      ></SearchList> -->

      <div
        class="m_header_logo"
        style="
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <CommonHeaderLogo />
      </div>

      <div class="menu-box mob-menu-box">
        <nuxt-link :to="localePath('/')">
          <h2 class="one-menu" style="padding: 10px 16px">
            {{ $t("c.home") }}
          </h2>
        </nuxt-link>

        <van-cell-group v-for="(x, index) in menu" :key="index">
          <van-cell
            :title="x.name"
            size="large"
            is-link
            clickable
            value=""
            @click="golink(x.id)"
          />
        </van-cell-group>

        <!-- <van-collapse v-model="showCategory" :border="false">
          <van-collapse-item
            class="one-menu"
            :title="$t('c.category')"
            :is-link="true"
            style="padding: 0"
          >
          </van-collapse-item>
        </van-collapse> -->

        <!-- <h2 class="one-menu" style="padding: 10px 16px">
          {{ $t("c.contact_us") }}
        </h2> -->

        <!-- <van-collapse v-model="showStaticMenu" :border="false">
          <van-collapse-item :title="$t('c.links')" :is-link="true">
            <div class="child-menu">
              <nuxt-link
                class="navbar-item one-menu"
                :to="localePath('/i/term_of_use')"
                >{{ $t("c.term_of_use") }}</nuxt-link
              >
            </div>
          </van-collapse-item>
        </van-collapse> -->

        <!-- <Switchers
          style="
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #d15b4c0d;
            padding: 15px;
          "
        /> -->
      </div>
    </van-popup>

    <client-only>
      <van-popup
        v-model="showShoppingCart"
        class=""
        round
        closeable
        :duration="0.2"
        :position="'bottom'"
        :style="{ height: '90%' }"
      >
        <CartPopupCart />
      </van-popup>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupWidth: "60%",
      showMenu: false,

      showCategory: [],
      showStaticMenu: [],
    };
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
    cartQty() {
      let code = this.$i18n.locale;
      return this.$store.state.cart.cartQty[code];
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
    golink(id) {
      this.showMenu = !this.showMenu;

      this.$router.push(this.localePath("/list") + "?category_id=" + id);
    },
    onClickLeft(e) {
      this.showMenu = !this.showMenu;
    },
    onClickRight() {
      this.$store.commit("setCartPopup", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.mob-menu-box .van-collapse-item__content {
  padding: 0 !important;
}
</style>
