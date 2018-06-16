import Vue from 'vue'
import Vuex from 'vuex'
import data from './data/channels.json' 
import slug from 'slug'
import md5 from 'md5'

Vue.use(Vuex)

const localStorageIsAvailable = (typeof (Storage) !== "undefined") 

let localData = {}

if (localStorageIsAvailable) {
  localData = JSON.parse(localStorage.getItem("channel.preferences") || '[]')
}

const setFlag = (sections, slug, enabled) => {
  return sections.map(section => {
    section.channels.map(channel => {
      if (channel.slug === slug) {
        channel.enabled = enabled
      }
      return channel
    })
    return section
  })
}

const slugify = (channels) => {
  return channels.map((channel) => {
    channel.slug = slug(`${channel.name.toLowerCase()}-${md5(channel.mediaURL).toLowerCase()}-${channel.section[0]}`)
    return channel
  })
}

const loadData = (sections, channels) => {
  const jsonData = sections.map((section) => {
    return {
      id: section.id,
      name: section.name,
      channels: slugify(channels.filter((channel) => channel.section[0] === section.id))
    }
  })

  localData.forEach(local => {
    setFlag(jsonData, local.slug, local.enabled)
  })

  return jsonData
}

export default new Vuex.Store({
  state: {
    sections: loadData(data.sections, data.channels),
    config: {
      "show-all-channels": true
    }
  },
  mutations: {
    setViewAllChannelsFlag(state, value) {
      state.config["show-all-channels"] = value
    },
    toogleChannelStatus(state, channel) {
      state.sections = setFlag(state.sections, channel.slug, !channel.enabled)
      if (localStorageIsAvailable) {
        localData.push({"slug": channel.slug, "enabled": channel.enabled})
        localStorage.setItem("channel.preferences", JSON.stringify(localData))
      }
    },
  },
  actions: {
    setViewAllChannelsFlag(context, value) {
      context.commit('setViewAllChannelsFlag', value)
    },
    toogleChannelStatus(context, channel) {
      context.commit('toogleChannelStatus', channel)
    }
  },
  getters: {
    channel: state => {
      if (!state.route.params.slug) {
        return
      }
      const section = state.sections.find((section) => {
        return section.id === parseInt(state.route.params.slug.split('-').pop())
      })
      if (section) {
        return section.channels.find((channel) => {
          return channel.slug === state.route.params.slug
        })
      }
    },
    getSections: state => {
      let sections = state.sections
        if (state.config["show-all-channels"]) {
          sections = sections.map(section => {
            return {
              id: section.id,
              name: section.name,
              channels: section.channels.filter(channel => channel.enabled)
            }
          }).filter(section => section.channels.length > 0)
        }
        return sections
      },
      showAllChannels: state => {
        return state.config["show-all-channels"]
      },
      viewChannelsFlag: state => {
        return state.route.path === '/list'
      },
      nowPlayingTitle: state => {
        if (!state.route.params.slug) {
          return false
        }
        const sectionid = parseInt(state.route.params.slug.split('-').pop())
        const section = state.sections.find((section) => {
          return section.id === sectionid 
        })
        if (!section) {
          return ''
        }
        const activeChannel = section.channels.find((channel) => {
        return channel.slug === state.route.params.slug
      })
      return activeChannel ? activeChannel.name : ''
    }
  }
})