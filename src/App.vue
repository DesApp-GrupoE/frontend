<template>
  <div id="app">
    <Header/>
    <router-view class="container"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue'

export default {
  components: {
    Header
  }
}
</script>