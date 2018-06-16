<template>
  <video-player  class="video-player-box"
    ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"

      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied">
  </video-player>
</template>
<script>
  import 'video.js/dist/video-js.css'
  import videojs  from 'video.js';
  window.videojs = videojs;
  import 'videojs-contrib-hls.js';
  import { videoPlayer } from 'vue-video-player'

  export default {
    components: {
      videoPlayer
    },
    props: {
      uri: String
    },
    data() {
      return {
        playerOptions: {
          muted: false,
          controls: true,
          controlBar: true,
          language: 'es',
          fluid: true,
          preload: 'auto',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [ {
            src: this.uri,
            type: 'application/x-mpegURL'
          }],
          flash: {
            hls: {
              withCredentials: false
            }
          },
          html5: {
            hls: {
              withCredentials: false
            }
          }
        }
      }
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
  }
</script>

