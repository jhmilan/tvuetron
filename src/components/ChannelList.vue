<template>
  <div>
    <div class="section is-clearfix" v-for="section in sections" :key="section.name">
      <div class="container">
        <h1 class="title">{{ section.name }}</h1>
        <div class="box is-pulled-left" v-for="channel in section.channels" :key="channel.name">
          <div class="columns">
            <div class="column is-2">
              <figure class="image is-32x32 is-border">
                <img :src="channel.mediaURL">
              </figure>
            </div>
            <div class="column"><span class="channel-name">{{ channel.name }}</span></div>
          </div>
          <div class="columns">
            <div class="column">
              <p class="buttons">
                <router-link class="button is-small view-channel" :to="{ name: 'channel', params: { slug: channel.slug }}">
                  Ver ahora
                </router-link>
              </p>
            </div>
            <div class="column">
              <p class="buttons is-pulled-right">
                <a class="button is-text is-small view-channel" @click="toogleChannelStatus(channel)">{{ channel.enabled ? 'desactivar' : 'activar' }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ChannelList',
  computed: {
    ...mapGetters({
      sections: 'getSections',
    })
  },
  methods: {
    ...mapActions([
      'toogleChannelStatus',
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  padding: 0.5rem;
}
.section h1.title {
  margin: 0;
}
.box {
  margin: 5px;
  width: 250px;
}
.column {
  padding-top: 0;
  padding-bottom: 0;
}
span.channel-name {
    white-space: nowrap;
    max-width: 170px;
    overflow: hidden;
}
.column span {
  display: block;
  margin-top: 5px;
}

.view-channel {
  margin-top: 10px;
}
</style>
