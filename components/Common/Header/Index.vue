<template>
  <div class="header-wrapper">
    <article v-if="$nuxt.isOffline" class="message is-warning">
      <div class="message-body">You are offline</div>
    </article>
    <CommonHeaderMobheader v-if="$device.isMobileOrTablet" />
    <CommonHeaderPcHeader v-else />
  </div>
</template>

<script>
export default {
  mounted() {
    // this.getSetList();
    // this.getUserActions();
    // this.getUserSummary();
  },
  data() {
    return {
      showPopover: false,
      showUserMenu: false,
      setList: [],
    };
  },
  computed: {
    atts() {
      return this.$store.getters["form/formAtts"];
    },

    showPopup: {
      set(e) {
        this.$store.commit("form/setShowPopup", e);
      },
      get() {
        return this.$store.getters["form/showPopup"];
      },
    },
  },

  methods: {
    submit() {},
    confirm() {
      this.$formulate.submit("form");
    },

    async getSetList() {
      this.setList = await this.$store.dispatch("attribute/attSetList");
    },

    showPop() {
      this.showPopover = !this.showPopover;
    },
    onShowUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    goPublish(id) {
      this.$router.push(this.localePath("/user/product") + "/" + id);
      this.showPopover = !this.showPopover;
    },
    async getUserActions() {
      let r = await this.$store.dispatch("topic/userActions");
    },
    async getUserSummary() {
      let r = await this.$store.dispatch("topic/userSummary");
    },
  },
};
</script>

<style></style>
