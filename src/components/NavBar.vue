<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <slot></slot>
      <a v-if="nowPlayingTitle" class="navbar-item"><font-awesome-icon :icon="iconPlay" /> Viendo: {{ nowPlayingTitle }}</a>
      <a v-if="viewChannelsFlag && !showAllChannels" class="navbar-item" @click="setViewAllChannelsFlag(true)"><font-awesome-icon class="fa-icon red" :icon="iconFilter" /> Ver todos los canales</a>
      <a v-if="viewChannelsFlag && showAllChannels" class="navbar-item extra-air" @click="setViewAllChannelsFlag(false)"><font-awesome-icon class="fa-icon green" :icon="iconFilter" />Ver solo canales activos</a>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faPlayCircle, faFilter } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters([
      'channels',
      'showAllChannels',
      'viewChannelsFlag',
      'viewNowPlaying',
      'nowPlayingTitle',
    ]),
    iconPlay () {
      return faPlayCircle
    },
    iconFilter () {
      return faFilter
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    ...mapActions([
      'setViewAllChannelsFlag',
      'setCurrentChannelActivation'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fa-icon {
  margin-right: 10px;
} 
.green {
  color: hsl(171, 100%, 41%);
}
.red {
  color: hsl(348, 100%, 61%);
}
</style>
