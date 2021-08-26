<template>
  <div>
    <!-- <h1>选择我的建筑</h1> -->

    <div class="my-title-one">选择你工作的大楼</div>

    <van-grid :column-num="4">
      <van-grid-item
        v-for="(b, index) in list"
        :key="index"
        icon="photo-o"
        :text="b.name"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ["x"],

  data() {
    return {
      list: [
        {
          id: "B0FFG3HAHJ",
          name: "升官渡经贸大厦",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "东北",
          distance: "644.934",
          location: "114.198144,30.533725",
          address: "汉城路与芳草二街交叉口东北100米",
          poiweight: "0.276486",
          businessarea: [],
        },
        {
          id: "B0FFKCPIY9",
          name: "经开未来城C座",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "西",
          distance: "471.5",
          location: "114.187894,30.529423",
          address: "四新南路933号",
          poiweight: "0.0844566",
          businessarea: [],
        },
        {
          id: "B0FFL2IK9F",
          name: "经开未来城A座",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "西南",
          distance: "477.587",
          location: "114.188500,30.527999",
          address: "东风大道20号附4",
          poiweight: "0.0844234",
          businessarea: [],
        },
        {
          id: "B0FFL5LAXG",
          name: "湖北路桥大厦",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "西南",
          distance: "573.963",
          location: "114.187789,30.527355",
          address: "蔡甸区经济技术开发区东风大道36号",
          poiweight: "0.277412",
          businessarea: [],
        },
        {
          id: "B0FFM1DTBF",
          name: "海伦春天F01座",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "西",
          distance: "709.402",
          location: "114.185497,30.531748",
          address: "四新南路与新华园二路交叉路口往东南约100米",
          poiweight: "0.276754",
          businessarea: [],
        },
        {
          id: "B0FFL0F64J",
          name: "欧亚达汉阳国际广场楼A座",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "东北",
          distance: "744.04",
          location: "114.197134,30.535800",
          address: "龙阳大道123号欧亚达汉阳国际广场楼a座",
          poiweight: "0.27793",
          businessarea: [],
        },
        {
          id: "B0FFG8QJTG",
          name: "武汉市公安局技术大楼",
          type: "商务住宅;楼宇;商务写字楼",
          tel: [],
          direction: "东",
          distance: "980.155",
          location: "114.202196,30.533606",
          address: "芳草西路与四新北路交汇处",
          poiweight: "0.285137",
          businessarea: [],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
