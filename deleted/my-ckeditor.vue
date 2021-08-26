<template>
  <div class="container">
    <h1>CKEditor 5 Nuxt Demo</h1>
    <div id="toolbar-container"></div>
    <div id="editor"></div>
  </div>
</template>

<script>
let ClassicEditor;
if (process.browser) {
  ClassicEditor = require("@blowstack/ckeditor-nuxt");
}

export default {
  mounted() {
    ClassicEditor.create(document.querySelector("#editor"), {
      // extraPlugins: [Mention],

      mention: {
        feeds: [
          {
            marker: "@",
            feed: ["@Barney", "@Lily", "@Marshall", "@Robin", "@Ted"],
            minimumCharacters: 0,
          },
        ],
      },
    })
      .then((editor) => {
        const toolbarContainer = document.querySelector("#toolbar-container");
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  },
};
</script>
