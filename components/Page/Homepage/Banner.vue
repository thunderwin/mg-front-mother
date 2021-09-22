<template>
  <div class="" style="padding: 1rem 0">
    <div
      v-if="x.title"
      class="is-size-5 is-capitalized"
      style="padding: 0 1rem 1rem 1rem; text-align: center"
    >
      {{ x.title }}
    </div>
    <div>
      <div>
        <div
          :style="{
            backgroundImage: `url()`,
            backgroundSize: 'cover',
            backgroundColor: '#ededed',
          }"
        >
          <div class="item-images" v-if="x.img" style="text-align: center">
            <van-image width="" height="" fit="cover" :src="x.img">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x"],
};
</script>

<style lang="scss" scoped></style>
