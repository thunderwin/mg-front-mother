<template>
  <div class="att-form">
    <ul class="ul">
      <li v-for="(att, aindex) in atts" :key="aindex">
        <span>{{ att.label }}</span
        >:

        <span class="" v-if="typeof att.value === 'string'">
          <span>{{ att.value }}</span>
        </span>

        <span v-else>
          <span v-for="(v, vindex) in att.value" :key="vindex">
            {{ v }}<span v-if="vindex !== att.value.length - 1">,</span>
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["atts"],
};
</script>

<style>
.att-form li {
  color: #666;
  line-height: 40px;
  padding: 0 1rem;
}
.att-form li:nth-child(odd) {
  background-color: #f5f6f8;
}
</style>
