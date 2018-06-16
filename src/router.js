import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import ChannelList from './components/ChannelList.vue'
import Channel from './components/Channel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', component: Home, props: {
        title: "Bienvenido a TVueTron!",
        subtitle: "Vue, Electron y Bulma para ver la tele en tu PC"
      }
    },
    { path: '/list', component: ChannelList },
    { path: '/channel/:slug', component: Channel, name: 'channel' }
  ]
})