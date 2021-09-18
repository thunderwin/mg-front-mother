import Vue from "vue";
import axios from "axios";

import VueFormulate from "@braid/vue-formulate";
import { en, zh } from "@braid/vue-formulate-i18n";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "https://strapi-cmad.onrender.com";

// const axiosInstance = axios.create({
//   baseURL
// });

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
  // uploader: axiosInstance,
  // uploadUrl: "/upload",

  uploader: async function (file, progress, error, options) {
    try {
      const formData = new FormData();
      formData.append("files", file); // 名字必须为 files

      const { data: result } = await axios.post(`${baseURL}/upload`, formData);
      progress(100); // (native fetch doesn’t support progress updates)
      return result;
    } catch (err) {
      error("Unable to upload file");
    }
  },
});
