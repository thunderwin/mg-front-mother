export const state = () => {
  return {
    nearbyOfficeBuilding: [], // 附近的办公楼
    addressComponent: {},
    formattedAddress: "",
  };
};

export const mutations = {
  setLocal(state, v) {
    state.nearbyOfficeBuilding = v.pois;
    state.addressComponent = v.addressComponent;
    state.nearbyOfficeBuilding = v.pois;
    state.formattedAddress = v.formatted_address;
  },
};

export const actions = {
  async getNearbyOfficeBuilding({ dispatch, commit, rootState }, location) {
    let r = await this.$axios.post("/api/amap/regeo", {
      location: location,
      poitype: "商务写字楼",
      radius: 1000,
      extensions: "all",
      batch: false,
      roadlevel: 0,
    });

    // console.log("%c 获取附近poi成功", "color:green;font-weight:bold");
    // console.log(JSON.stringify(r));

    if (r.status === "1") {
      commit("setLocal", r.regeocode);

      // 组合为一个表单

      let askingbuidlingFormObj = [
        {
          name: "building",
          is: "my-building",
          options: r.regeocode.pois,
        },
      ];

      dispatch(
        "form/handleAtts",
        { atts: askingbuidlingFormObj },
        { root: true }
      );
    }
  },
};
