import Vue from "vue";

import VueFormulate from "@braid/vue-formulate";
import { en, zh } from "@braid/vue-formulate-i18n";

Vue.use(VueFormulate, {
  plugins: [en, zh],
  locale: "en",
  rules: {
    domain: (x) => {
      return /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(
        x.value
      );
    },
  },
  library: {},
  uploader: function (file, progress, error, options) {
    console.dir("file");
    console.log(file);

    // try {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   const result = await fetch(options.uploadUrl, {
    //     method: "POST",
    //     body: formData
    //   });
    //   progress(100); // (native fetch doesn’t support progress updates)
    //   return await result.json();
    // } catch (err) {
    //   error("Unable to upload file");
    // }
  },
});
