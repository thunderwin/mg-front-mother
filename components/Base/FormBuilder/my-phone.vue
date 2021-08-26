<template>
  <div class=" ">
    <FormulateInput
      :name="x.name"
      :value="x.value"
      :type="x.type"
      :label="x.label"
      v-model="x.value"
      :placeholder="x.placeholder"
      :validation="x.validation"
      :help="x.help"
      :options="x.options"
      class="is-medium"
    >
    </FormulateInput>
  </div>
</template>

<script>
export default {
  props: ["x"],
  data() {
    return {
      phonePre: ""
    };
  }
};
</script>

<style lang="scss"></style>
