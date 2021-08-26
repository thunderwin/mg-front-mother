<template>
  <div class="box login_box">
    <h1 class="">增加新任务</h1>

    <!-- {{ list }} -->

    <van-button @click="send">发布</van-button>

    <van-grid :column-num="2" :gutter="20">
      <van-grid-item
        v-for="(x, index) in list"
        :key="index"
        icon="photo-o"
        :text="x.setInfo.attribute_set_name"
        @click="click(index)"
      />
    </van-grid>

    <client-only>
      <BaseFormBuilderIndex
        style="font-size: 16px; font-weight: bold"
        name="form"
        :atts="atts"
        @submit="submit"
      />
    </client-only>

    <!-- <AddMoney /> -->
  </div>
</template>

<script>
// import AddMoney from "@/components/commonComponents/money/add-money.vue";

export default {
  components: {
    // AddMoney,
  },
  computed: {},
  data() {
    return {
      list: [],
      atts: [],
      attsMore: [
        // 额外增加的字段，存到dis里面
        {},
      ],
    };
  },
  mounted() {
    this.getAllAttSetsWithAtt();
  },
  methods: {
    click(index) {
      this.atts = this.list[index].atts;
    },
    async getAllAttSetsWithAtt() {
      let r = await this.$store.dispatch("att/attSetList");
      this.list = r;
    },
    submit() {
      let r = this.$formulate.submit("login");
    },

    send() {
      this.$store.dispatch("channel/initChannel");
    },
  },
};
</script>

<style></style>
