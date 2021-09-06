<template>
  <div style="font-size: 0.9rem">
    <footer
      v-if="$device.isDesktop"
      class="footer van-hairline--top"
      :style="{
        padding: '1rem',
        backgroundColor: $store.state.S.footerBackgroundColorMain,
      }"
    >
      <section class="section left-menus" style="text-transform: capitalize">
        <van-row gutter="30" class="container" style="">
          <van-col span="12">
            <van-row class="container" style="">
              <van-col span="8">
                <span class="navbar-item is-size-6">COMPANY INFO</span>
                <div
                  v-for="(y, yindex) in staticMenu"
                  :key="(yindex + 4) * 1112"
                >
                  <CommonFooterEachLink :x="y" />
                </div>
              </van-col>

              <van-col span="8">
                <span class="is-size-6 navbar-item">HOT COLLECTIONS</span>

                <div v-for="(y, yindex) in menu" :key="(yindex + 1) * 23">
                  <!-- <CommonFooterEachLink :x="y" /> -->

                  <nuxt-link
                    :to="localePath('/list') + '?category_id=' + y.id"
                    class="navbar-item has-text-dark"
                    style="line-height: 2rem"
                  >
                    <span>{{ y.label || y.name }}</span>
                  </nuxt-link>
                </div>
              </van-col>

              <van-col span="8">
                <span class="navbar-item is-size-6">CUSTOMER CARE</span>

                <div
                  v-for="(y, yindex) in staticMenu2"
                  :key="(yindex + 1) * 23"
                >
                  <CommonFooterEachLink :x="y" />
                </div>
              </van-col>
            </van-row>
          </van-col>

          <van-col span="12">
            <div class="is-size-6">
              SIGN UP FOR
              <span class="is-uppercase">{{ $store.state.domain }}</span> STYLE
              NEWS
            </div>
            <CommonFooterSubscribeBox />
            <CommonFooterSocialIcons class="" style="margin-top: 2rem" />
          </van-col>

          <!-- <van-col span="8">
            <span class="navbar-item is-size-5">{{ $t("c.my_account") }}</span>

            <nuxt-link class="navbar-item" :to="localePath('/login')">
              <span>{{ $t("c.login") }}</span>
            </nuxt-link>

            <nuxt-link class="navbar-item" :to="localePath('/reg')">
              <span>{{ $t("c.register") }}</span>
            </nuxt-link>
          </van-col>

          <van-col span="8">
            <span class="navbar-item is-size-5 footer-section-title">{{
              $t("c.info")
            }}</span>

            <a
              class="navbar-item"
              target="_blank"
              :href="'https://www.np360.com.hk/' + local + '/contact-us'"
            >
              <span>{{ $t("c.contact_us") }}</span>
            </a>
          </van-col> -->
        </van-row>
      </section>
    </footer>

    <footer
      v-if="$device.isMobileOrTablet"
      class="footer van-hairline--top mob-footer"
      style="padding: 1rem"
    >
      <div class="left-menus">
        <van-row gutter="20" class="container is-capitalized" style="">
          <van-col span="12">
            <span class="navbar-item is-size-6">COMPANY INFO</span>
            <div v-for="(y, yindex) in staticMenu" :key="(yindex + 4) * 1112">
              <CommonFooterEachLink :x="y" />
            </div>
          </van-col>

          <van-col span="12">
            <span class="is-size-6 navbar-item">CUSTOMER CARE</span>

            <div v-for="(y, yindex) in staticMenu2" :key="(yindex + 1) * 23">
              <CommonFooterEachLink :x="y" />
            </div>
          </van-col>
        </van-row>

        <div class="" style="margin-top: 1rem">
          <div class="is-size-6">
            SIGN UP FOR
            <span class="is-uppercase">{{ $store.state.domain }}</span> STYLE
            NEWS
          </div>
          <CommonFooterSubscribeBox style="" />
          <CommonFooterSocialIcons class="" style="margin-top: 2rem" />
        </div>
      </div>
    </footer>

    <section
      v-if="$device.isDesktop"
      class=""
      style="background-color: #222; color: #fff; padding: 1rem"
    >
      <div
        class="container"
        style="display: flex; justify-content: space-between"
      >
        <div class="left">
          © 2021 <span class="is-capitalized">{{ $store.state.domain }}</span
          >, LLC All Rights Reserved
        </div>

        <div
          class="privacy has-text-centered"
          style="display: flex; justify-content: center"
        >
          <nuxt-link
            v-for="(x, index) in staticMenu3"
            :key="index"
            class=""
            style="margin-left: 1rem"
            :to="'/i/terms-of-service'"
          >
            <span>{{ x.label }}</span>
          </nuxt-link>
        </div>
      </div>

      <!-- <Icons /> -->
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
  data() {
    return {
      staticMenu: [
        {
          label: `About ${this.$store.state.domain}`,
          code: "about-us",
        },

        {
          label: "Fashion Blogger",
          code: "fashion-blogger",
        },
        {
          label: "Contact us",
          code: "contact-us",
        },
      ],

      staticMenu2: [
        {
          label: "How To Track",
          code: "How To Track",
        },
        {
          label: `Shipping Info`,
          code: "Shipping Info",
        },
        {
          label: "Return & refund",
          code: "customer-service",
        },
      ],
      staticMenu3: [
        {
          label: "Privacy Policy",
          code: "privacy-policy",
        },
        {
          label: "Terms of Service",
          code: "terms-of-service",
        },
        {
          label: "CA Supply Chains Act",
          code: "ca-supply-chains-act",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.left-menus {
  .is-size-6 {
    margin-bottom: 0.5rem;
    color: #222;
  }
}

.mob-footer {
  .visually-hidden {
    display: none;
  }
  .navbar-item,
  .navbar-link {
    padding: 0;
  }
}
</style>
