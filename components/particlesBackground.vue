<template>
  <div class="hello">


    <div class="particle-outer">

<slot></slot>
      <vue-particles


      >

      </vue-particles>



    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.panel {
    font-family: 'Source Sans Pro';
    font-size: 1.3em;
    position: absolute;
    z-index: 99;
    width: 500px;
    height: 220px;
    background: #ffffff;
    top: 50%;
    color: white;
    left: 50%;
    z-index: 2222;
    margin: -110px 0 0 -100px;
    padding: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    z-index: 100;
  }
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  background: url('http://cdn.wallpapersafari.com/91/94/PmdesY.png') no-repeat;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
z-index: 2;


}
.something {
  text-align: center;
  margin: 0 auto;
  margin-top: 200px;
  font-family: 'Roboto', sans-serif;
}

.something h1 {
  color: white;
  z-index: 55;
  font-size: 10em;
}
.particle-outer {

  opacity: 0.5;
}
</style>
