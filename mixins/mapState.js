//https://stackoverflow.com/questions/48088798/where-to-store-common-component-methods-in-nuxt-js

export default {
  computed: {
    T() {
      return this.$store.state.T;
    },
    C() {
      return this.$store.state.C;
    }
  }
};
