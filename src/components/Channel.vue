<template>
  <div>
    <VideoPlayerWrapper :uri="channel.uri" />
  </div>
</template>

<script>
  import VideoPlayerWrapper from './VideoPlayerWrapper.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Channel',
    components: {
      VideoPlayerWrapper
    },
    computed: {
      ...mapGetters({
        channel: 'channel',
      })
    }
  }
</script>