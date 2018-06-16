<template>
  <div class="home">
    <section class="hero is-small is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ title }}
          </h1>
          <h2 class="subtitle">
            {{ subtitle }}
          </h2>
          <a class="button is-large is-primary" @click="hop">Hop!</a>
        </div>
      </div>
    </section>
    <Motion :values="imgsytles" tag="div" spring="wobbly">
      <div slot-scope="imgsytle" :style="{ width:`${imgsytle.width}%`, 'margin-top':`${imgsytle.top}px`, 'margin-bottom':`50px`, transform:`rotate(${imgsytle.rotate}deg)` }">         
       <img src="../assets/tvuetron.png">
      </div>
    </Motion>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    title: String,
    subtitle: String,
  },
  data() {
    return {
      imgsytles: {
        width: 100,
        top: 100,
        rotate: 10
      }
    }
  },
  methods: {
    hop: function() {
      this.imgsytles = {
        width: Math.floor((Math.random() * 100) + 1) + 50,
        top: Math.floor((Math.random() * 200) + 1) + 20,
        rotate: Math.floor((Math.random() * 720) + 1)
      }
    }
  },
  created() {
    let me = this
    setInterval(function() { me.hop() }, 5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

img {
  user-select: none;
}
</style>
