<template>
  <div class="">
    <!-- <EditBar class="action-bar" /> -->
    <h1 class="">增加新产品</h1>

    <!-- {{ list }} -->
    <client-only>
      <BaseFormBuilderIndex
        style="font-size: 16px; font-weight: bold"
        name="newProduct"
        :atts="list"
        :submitBtnText="'上传'"
        @submit="submit"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  validate({ params, query }) {
    if (params["set"]) {
      return true;
    }
    if (query["sku"]) {
      console.log("%c 编辑产品", "color:green;font-weight:bold");
      console.log(JSON.stringify(query["sku"]));
      return true;
    }
    return false;
  },
  watch: {
    "$route.params": function (v) {
      this.getAllAttSetsWithAtt(v.set);
    },
  },

  computed: {},
  data() {
    return {
      setId: "",
      list: [],
      atts: [],
    };
  },
  async fetch() {
    console.log("%c 重新执行", "color:green;font-weight:bold");

    let setId = this.$route.params.set;
    this.setId = setId;
    await this.getAllAttSetsWithAtt(setId);
  },
  methods: {
    async getAllAttSetsWithAtt(setId) {
      let r = await this.$store.dispatch("attribute/setDetail", {
        setId: setId,
      });
      this.list = r;
    },

    submit(e) {
      console.log("%c e", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));

      e.attribute_set_id = this.setId; //带 setid

      this.$store.dispatch("upload/upload", e);

      // this.$root.$emit("newProduct", e);
    },

    send() {
      this.$store.dispatch("channel/initChannel");
    },
  },
};
</script>

<style></style>
