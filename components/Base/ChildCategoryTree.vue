<template>
  <div class="product-all">
    <aside
      v-if="categorys.children && categorys.children.length > 0"
      class="menu mb-4"
    >
      <p class="menu-label">Sub categories</p>
      <ul class="menu-list">
        <li v-for="(m, index) in categorys.children" :key="index">
          <nuxt-link :to="localePath('/list') + '/' + m.id"
            >{{ m.name }}
            <span class="is-size-6 has-text-grey">({{ m.product_count }})</span>
          </nuxt-link>
          <ul v-if="m.children.length > 0">
            <li v-for="(mm, mmindex) in m.children" :key="mmindex">
              <nuxt-link :to="localePath('/list') + '/' + m.id">
                {{ mm.name }}
                <span class="is-size-6 has-text-grey"
                  >({{ mm.product_count }})</span
                >
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "child-category",
  props: ["categorys"],
  data() {
    return {};
  },
};
</script>
