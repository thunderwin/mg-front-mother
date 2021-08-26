<template>
  <client-only placeholder="loading...">
    <div class="input-wrapper">
      <!-- <ckeditor-nuxt v-model="contentHolder" :config="editorConfig" /> -->

      <!-- <input type="text" v-model="contentHolder" /> -->

      <FormulateInput
        style="height: 40px"
        type="text"
        v-model="contentHolder"
        validation="max:1000,length"
        validation-name="tweet"
        error-behavior="live"
        @keydown.enter.prevent="send()"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      editorConfig: {
        simpleUpload: {
          uploadUrl: "path_to_image_controller",
          headers: {
            Authorization: "optional_token",
          },
        },
        toolbar: ["bold", "italic"],
        removePlugins: ["Bold", "Heading"],
      },
      contentHolder: "",
    };
  },
  methods: {
    send() {
      this.$emit("send", this.contentHolder);
    },
  },
};
</script>
<style>
.input-wrapper .formulate-input .formulate-input-element {
  max-width: 100% !important;
}
</style>
