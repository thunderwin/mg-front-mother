<template>
  <div>
    <nuxt-link
      :to="localePath('/')"
      style="display: flex; justify-content: left; min-height: 50px"
    >
      <van-image
        :src="c.secure_base_media_url + 'logo/' + c.header_logo_src"
        :width="$device.isMobileOrTablet ? '101px' : '168px'"
        style="max-height: 50px"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    c() {
      return this.$store.state.C;
    },
  },
};
</script>

<style lang="scss"></style>
