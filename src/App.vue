<template>
  <v-app id="app">
    <v-app-bar app>
      <Header />
    </v-app-bar>
    <v-content>
      <ModalAuth />
      <Authors />
      <Alert />
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import ModalAuth from '@/components/Modal/ModalAuth'
import Authors from '@/components/Modal/Authors'
import Alert from '@/components/Modal/Alert'
import Header from '@/components/Header/Header'

export default {
  name: 'app',
  components: {
    ModalAuth,
    Authors,
    Header,
    Alert
  },
  created() {
    this.user.initUser()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 30px;
  margin-left: 30px;
  /* background: url('./assets/sm7-31m.jpg') center; */
  /* background-repeat: no-repeat; */
}
</style>
