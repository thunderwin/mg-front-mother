<template>
  <div>
    <!-- <TaskTop :x="task" /> -->

    <div class="list-chats">
      <!-- <ChatItem
        v-for="(x, index) in task.post_stream.posts"
        :key="index"
        :x="x"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      task: "",
      id: "1212",
    };
  },
  fetch({ store, route, redirect, params, query, $axios }) {
    // this.task = params.taskId;
    // console.log("%c this.task", "color:green;font-weight:bold");
    // console.log(JSON.stringify(this.task));
  },
  async asyncData({
    isDev,
    route,
    store,
    $axios,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    let r = await $axios.get(`/dis/t/${params.taskId}.json`);

    return {
      task: r,
    };
  },
};
</script>
