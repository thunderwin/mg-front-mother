<template>
  <div class="">
    <div>
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
import IM from "@/assets/js/agora";
export default {
  name: "global-header",
  mounted() {
    // this.initLocation();
    // this.initChat();
  },
  data() {
    return {};
  },
  methods: {
    initLocation() {
      let that = this;
      window.AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });

        geolocation.getCurrentPosition(function (status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });

        function onComplete(data) {
          // data是具体的定位信息
          console.log("%c 获取的定位信息", "color:green;font-weight:bold");
          console.log(JSON.stringify(data));

          // {"info":"LOCATE_SUCCESS","status":0,"position":[114.21219,30.55633],"message":"Get geolocation position unavailable.Get ipLocation success.No need convert.","location_type":"ip","accuracy":null,"isConverted":true}

          let p = data.position.toString().slice(1, data.position.length);

          if (data.info === "LOCATE_SUCCESS") {
            // that.$store.commit("setLocation", p);
            // that.$store.dispatch("locale/getNearbyOfficeBuilding", p);
          } else {
            // that.$sentry.captureException(data);
          }
        }

        function onError(data) {
          // 定位出错
          // that.$sentry.captureException(data);
        }
      });
    },
    async initChat() {
      const client = window.AgoraRTM.createInstance(
        "96068bd6cd894b2f9fa6f8d8c24289ed"
      );

      let im = await new IM(client, "leisen");

      console.log("%c im", "color:green;font-weight:bold");
      console.log(im);

      // im.client.on("ConnectionStateChanged", (newState, reason) => {
      //   console.log("%c 链接状态改变", "color:green;font-weight:bold");
      //   console.log(JSON.stringify(reason));

      //   console.log("%c 新的状态", "color:green;font-weight:bold");
      //   console.log(newState);
      // });

      // client
      //   .login({ token: "", uid: "lei" })
      //   .then((r) => {
      //     console.log("AgoraRTM client login success");
      //   })
      //   .catch((err) => {
      //     console.log("AgoraRTM client login failure", err);
      //   });
    },
  },
};
</script>

<style>
.action-bar {
  position: fixed;
  width: calc(100% - 320px);
  top: 60px;
  background-color: #ddd;
  z-index: 999;
}
.home-left {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  z-index: 1;
  min-width: 320px;
  max-width: 320px;
  overflow-y: scroll;
  background-color: #fff;
  border-right: 1px solid #e1e4e8;
}
.home-right {
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 320px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #fff;
}
</style>
