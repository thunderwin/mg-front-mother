<template>
  <div>
    <div
      v-if="$device.isMobileOrTablet"
      class="mob-filter-result"
      style="margin-top: 1rem"
    >
      <div class="">
        <div
          v-for="(f, findex) in list"
          :key="findex + 10000"
          class="each-filter"
        >
          <div
            v-if="f.options.find((x) => x.checked)"
            class="each-chosen-filter"
          >
            <!-- <div class="has-text-black" style="margin: 0.5rem 0 0.2rem 0">
            {{ f.label }}
          </div> -->
            <div class="is-grouped">
              <div
                v-for="(o, oindex) in f.options"
                :key="oindex + 1000"
                class="control"
                v-show="o.checked"
              >
                <div
                  @click="removefilter(f.attribute_code, oindex)"
                  class="tags has-addons"
                  style="margin-bottom: 0.1rem"
                >
                  <div
                    class="tag is-link"
                    :style="{
                      backgroundColor: $store.state.S.mainColor,
                      color: '#fff',
                    }"
                  >
                    {{ o.label }}
                  </div>
                  <a class="tag is-delete"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="$device.isDesktop"
      class="selected-filter shadow"
      style="padding: 1rem"
    >
      <div
        v-for="(f, findex) in list"
        :key="findex + 10000"
        class="each-filter"
      >
        <div v-if="f.options.find((x) => x.checked)" class="each-chosen-filter">
          <div class="has-text-black" style="margin: 0.5rem 0 0.2rem 0">
            {{ f.label }}
          </div>
          <div class="field is-grouped is-grouped-multiline">
            <div
              v-for="(o, oindex) in f.options"
              :key="oindex + 1000"
              class="control"
              v-show="o.checked"
            >
              <div
                @click="removefilter(f.attribute_code, oindex)"
                class="tags has-addons"
              >
                <div
                  class="tag is-link"
                  :style="{
                    backgroundColor: $store.state.S.mainColor,
                  }"
                >
                  {{ o.label }}
                </div>
                <a class="tag is-delete"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list", "readOnly"],
  computed: {},
  methods: {
    removefilter(code, index) {
      this.$emit("removefilter", code, index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
