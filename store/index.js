export const state = () => ({
  C: {
    code: "", // 默认店铺
  }, // config 店铺核心设置
  S: {}, // 店铺核心样式和板块配置

  strapi_url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337"
      : "https://strapi-cmad.onrender.com",

  menu: [],
  flatMenu: [], // 扁平化的菜单
  availableStores: [],
  logo: {},
  sliders: [],
  banner: {},
  CMS: {},
  domain: "", // 当前的域名

  scroll: 100, // 保存的滑动，

  showFilterPopup: false,
  showCartPopup: false,
  filter: "", // 当前的filter 需要持久保存
  sortBy: {},
});

export const getters = {
  getCateViaId: (state) => (id) => {
    return state.flatMenu.find((x) => x.id === id);
  },

  showFilter(state) {
    return state.showFilterPopup;
  },
  showCart(state) {
    return state.showCartPopup;
  },
  // qs(state) {
  //   let e = state.filter;
  //   let obj = {};
  //   e.forEach((x) => {
  //     x.options.forEach((z) => {
  //       if (z.checked) {
  //         if (obj[x.attribute_code]) {
  //           obj[x.attribute_code] = obj[x.attribute_code] += "," + z.value;
  //         } else {
  //           obj[x.attribute_code] = z.value;
  //         }
  //       }
  //     });
  //   });
  //   console.log("%c 过滤器", "color:green;font-weight:bold");
  //   console.log(JSON.stringify(obj));
  //   let qs = Object.keys(obj)
  //     .map((key) => `${key}=${obj[key]}`)
  //     .join("&");
  //   return qs;
  // },
};

export const mutations = {
  setScroll(state, v) {
    // 记录滚动距离
    state.scroll = v;
  },

  setFilterPopup(state, v) {
    state.showFilterPopup = v;
  },
  setCartPopup(state, v) {
    state.showCartPopup = v;
  },

  setFilterResult(state, v) {
    state.filter = v;
  },

  setConfig(state, v) {
    state.C = v;
  },
  setDomainStyle(state, v) {
    state.S = v;
  },
  setMenu(state, v) {
    state.menu = v;
  },
  setFlatMenu(state, v) {
    state.flatMenu = v;
  },
  setCMS(state, v) {
    state.CMS = v;
  },

  setCurrentLanguage(state, v) {
    state.currentLanguage = v;
  },

  setAvailableStores(state, v) {
    state.availableStores = v;
  },
  setLogo(state, v) {
    state.logo = v;
  },
  setSlider(state, v) {
    state.slider = v;
  },
  setBanner(state, v) {
    state.banner = v;
  },
  setBanner(state, v) {
    state.banner = v;
  },
};

export const actions = {
  async nuxtServerInit(
    { state, dispatch, commit },
    { $sentry, req, res, route, params }
  ) {
    let host =
      process.env.NODE_ENV === "development"
        ? "www.ivchicy.com"
        : req.headers.host;

    let domain = host.split(".")[0];

    if (domain === "www") {
      // 如果带www 就是顶级域名
      domain = host.split(".")[1];
    }

    console.log("%c 拿到的域名", "color:green;font-weight:bold");
    console.log(JSON.stringify(domain));

    state.domain = domain;

    await dispatch("getConfig");
  },

  async getConfig({ commit, dispatch }) {
    let r = await this.$axios.post("/api/store/config");

    console.log("%c 拿到的配置文件", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    commit("setConfig", r.storeConfig); // 店铺默认配置
    commit("setDomainStyle", r.storeCustomConfig); // 我自定义的配置
    commit("setMenu", r.menu); // 根目录菜单
    commit("setFlatMenu", r.flatMenu); // 根目录菜单

    // commit("setAvailableStores", r.availableStores);
    // commit("setLogo", r.logo);
    // commit("setBanner", r.banner);
    // commit("setSlider", r.slider);
    // commit("setCMS", r.cmsList);
    // commit("setMenu", r.menu);
    // commit("setDomainStyle", r.allDomain);
  },

  listing({ commit, dispatch, state }, { sortBy, pageSize, currentPage }) {
    let obj = {};
    let filter = state.filter;

    if (!!filter) {
      filter.forEach((x) => {
        x.options.forEach((z) => {
          if (z.checked) {
            if (obj[x.attribute_code]) {
              obj[x.attribute_code] = obj[x.attribute_code] += "," + z.value;
            } else {
              obj[x.attribute_code] = z.value;
            }
          }
        });
      });
    }

    if (!!sortBy) {
      obj["sortby_" + sortBy] = "DESC";
    }

    if (pageSize) {
      obj.pagesize = pageSize;
    }

    if (currentPage) {
      obj.currentpage = currentPage;
    }

    let qs = Object.keys(obj)
      .sort()
      .map((key) => `${key}=${obj[key]}`)
      .join("&");

    this.$router.push(this.localePath("/list") + "?" + qs);
  },
};

export const strict = false; // 关闭严格模式
