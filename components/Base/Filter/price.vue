<template>
  <div>
    {{ priceOptions }}

    <client-only>
      <van-slider
        bar-height="4px"
        active-color="#ee0a24"
        v-model="price"
        @change="onChange"
        :range="true"
      >
        <template #button>
          <div class="custom-button">{{ price }}</div>
        </template>
      </van-slider>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["priceOptions"],
  data() {
    return {
      price: 0,
    };
  },
  methods: {
    onChange(e) {},
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  width: 2rem;
  color: #fff;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>
