// const path = require("path");
// const resolve = (dir) => path.join(__dirname, dir);

export default {
  cache: true,
  ssr: true,
  components: [
    {
      path: "~/components/Base/",
      prefix: "Base",
    },
    {
      path: "~/components/Common/",
      prefix: "Common",
    },
    {
      path: "~/components/Page/",
      prefix: "Page",
    },
    {
      path: "~/components/Detail/",
      prefix: "Detail",
    },
    {
      path: "~/components/Checkout/",
      prefix: "Checkout",
    },
    {
      path: "~/components/Cart/",
      prefix: "Cart",
    },
    {
      path: "~/components/User/",
      prefix: "User",
    },
  ],
  serverMiddleware: [
    // Will register file from project api directory to handle /api/* requires
    { path: "/dis", handler: "~/api/dis.js" },
    { path: "/home", handler: "~/middleware/pageCache.js" },
  ],

  router: {
    middleware: "RouterSaveLastRouter", // 路由专属的
  },

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en",
    },
    titleTemplate: "Dress",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "Dress",
      },
      {
        property: "og:image",
        content: "https://pre-vue.web.app/images/logo.png",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
    // script: [{ src: "https://unpkg.com/ionicons/dist/ionicons.js", body: true }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#00c58e" },
  /*
   ** Global CSS
   */
  css: [
    "@/assets/css/custom.css",
    "@/assets/css/nomal.css",
    "@/assets/scss/formulate.scss",
    "swiper/css/swiper.css",
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/paypal.js", ssr: false },
    // { src: "@/plugins/youtube", ssr: false },
    "~/plugins/client-only.client.js",
    { src: "@/plugins/axios-extensions.js" },
    "~/plugins/axios",
    { src: "@/plugins/vant", ssr: true },
    // { src: "@/plugins/i18n", ssr: true },
    // { src: "@/plugins/agora.js", ssr: false },
    { src: "@/plugins/vue-placeholders", ssr: false },
    { src: "@/plugins/localStorage.js", ssr: false },

    // { src: "@/plugins/globalMixins.js", ssr: true },
    // { src: "@/plugins/sortable.js", ssr: false },
    { src: "@/plugins/formulate.js", ssr: false }, // 去掉ssr 就不会报错
    { src: "@/plugins/swiper.js", ssr: false },
    { src: "@/plugins/share.js", ssr: false },
    { src: "@/plugins/facebook-pixel.js", ssr: false },
    { src: "@/plugins/google-analytics.js", ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/svg",
    "@nuxt/components",
    "@nuxtjs/device",
    "@nuxtjs/google-fonts",
    // "nuxt-purgecss",
  ],
  googleFonts: {
    families: {
      "DM Sans": true,
      "Avenir Next": true,
      Poppins: true,
    },
  },

  // https://github.com/nuxt-community/device-module  // 好东西啊
  /*
   ** Nuxt.js modules
   */
  modules: [
    // "@/modules/axiosCache", // FC 下不能用

    // "@chakra-ui/nuxt",
    // "@nuxtjs/emotion",
    "nuxt-i18n",
    "@nuxtjs/bulma",
    // "bootstrap-vue/nuxt",
    // [
    //   "nuxt-gmaps",
    //   {
    //     key: "AIzaSyDHdIcQFbccr5AVBX_0HUnXXV1a1ro4nVA"
    //     //you can use libraries: ['places']
    //   }
    // ],

    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // "@nuxtjs/auth",
    //
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // "@nuxtjs/sentry",
    // ["@nuxtjs/component-cache", { maxAge: 1000 * 60 * 60 }]
  ],

  i18n: {
    baseUrl: "https://my-nuxt-app.com",
    seo: false,
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en-US.js",
        name: "English",
      },
      {
        code: "cn",
        iso: "zh-CN",
        file: "zh-CN.js",
        name: "简体中文",
      },
      {
        code: "hk",
        iso: "zh-HK",
        file: "zh-HK.js",
        name: "繁体中文",
      },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: false,
    lazy: true,
    langDir: "locales/",
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    components: [
      "BIcon",
      "BIconCalendar",
      "BIconCart2",
      "BIconShare",
      "BIconCursor",
      "BIconSearch",
      "BIconPerson",
      "BIconCheckCircle",
      "BIconArrowUp",
      "BIconArrowRight",
      "BIconArrowLeft",
      "BIconStar",
      "BIconLightning",
      "BIconTrophy",
      "BIconStarFill",
      "BIconFileSpreadsheet",

      "BIconBoxSeam",
      "BIconFileEarmarkText",
      "BIconGem",
      "BIconBuilding",

      "BIconChevronLeft",

      "BIconShieldShaded",
    ],
  },
  // sentry: {
  //   dsn:
  //     "https://117d4fca759a4fdbb0a770a10816e14a@o435429.ingest.sentry.io/5394715",
  //   publishRelease: true,
  //   sourceMapStyle: "hidden-source-map",
  //   config: {
  //     release: process.env.GIT_COMMIT_SHA,
  //   },
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    timeout: 10,
  },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: "/api/auth/login",
  //           method: "post",
  //           propertyName: "token"
  //         }
  //         // logout: { url: "/api/auth/Logout", method: "post" },
  //         // user: {
  //         //   url: "/api/user/detail",
  //         //   method: "get",
  //         //   propertyName: "userinfo"
  //         // }
  //       }
  //       // tokenRequired: true,
  //       // tokenName: "Authorization",
  //       // globalToken: false,
  //       // tokenType: "bearer",
  //       // autoFetchUser: false
  //     }
  //   }
  // },

  proxy: {
    "/api/": {
      target:
        process.env.NODE_ENV === "development"
          ? "http://localhost:9000/"
          : "https://gudao-api.tokwork.com/",
      // target: "https://api.tokwork.com/",
      // changeOrigin: true,
      pathRewrite: { "^/api/": "" },
    },
    "/space/": {
      target: "https://strapi-cmad.onrender.com/",
      pathRewrite: { "^/space/": "" },
    },
    "/cloud/": {
      target: "https://gudao-img.oss-us-west-1.aliyuncs.com/",
      pathRewrite: { "^/cloud/": "" },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {},

    // terser: {
    //   terserOptions: {
    //     compress: {
    //       drop_console: true
    //     }
    //   }
    // },

    transpile: [/vant.*?less/, "@nuxtjs/auth", "vant"],
    babel: {
      compact: true, // 防止 babel 处理icon。js 报警

      plugins: [
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        [
          "import",
          {
            libraryName: "vant",
            style: (name) => {
              return `${name}/style/less.js`;
            },
          },
          "vant",
        ],
      ],
    },
  },
  rules: [
    {
      test: /\.less$/,
      use: [
        // ...其他 loader 配置
        {
          loader: "less-loader",
          options: {
            // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
            lessOptions: {
              modifyVars: {
                // 直接覆盖变量
                "text-color": "#111",
                "border-color": "#eee",
                // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                hack: `true; @import "your-less-file-path.less";`,
              },
            },
          },
        },
      ],
    },
  ],
};
