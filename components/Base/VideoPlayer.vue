<template>
  <div class="">
    <!-- {{ x }} -->
    <youtube
      @ready="ready"
      :player-vars="{ autoplay: 2 }"
      :player-width="530"
      :player-height="300"
      :video-id="videoId"
    />

    <div class="copnte" style="margin-top: 2rem">
      <div class="is-size-5">{{ x.video_content.video_title }}</div>
      <div class="video-desc">
        {{ x.video_content.video_description }}
      </div>
    </div>
  </div>
</template>

<script>
// https://www.npmjs.com/package/vue-youtube-embed
export default {
  props: ["x"],
  computed: {
    videoId() {
      return this.x.video_content.video_url.split("=")[1];
    },
  },
  methods: {
    ready(event) {
      this.player = event.target;
    },
    playing(event) {
      // The player is playing a video.
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = "another video id";
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
  },
};
</script>

<style lang="scss" scoped></style>
