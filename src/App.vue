<template>
  <div id="app">
    <NavBar>
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/list" class="navbar-item">Canales</router-link>
    </NavBar>
    <router-view></router-view>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
