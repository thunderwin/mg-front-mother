<template>
  <div>
    <nuxt-link
      :to="localePath('/')"
      style="display: flex; justify-content: left; min-height: 50px"
    >
      <van-image
        :src="$store.state.S.logo"
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
export default {};
</script>

<style lang="scss"></style>
