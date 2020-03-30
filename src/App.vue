<template>
  <v-app>
    <v-app-bar app>
      <div id="nav">
        <router-link to="/">Главная</router-link> |
        <router-link to="/robot">Управление роботом</router-link> |
        <router-link to="/spacekvant">Spacekvant</router-link>
        <label v-if="connect.devModeFlag" class="dev-mode-flag">РЕЖИМ РАЗРАБОТКИ</label>
      </div>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.lune {
  background: url('./assets/lune_v2.png')!important;
}
</style>

<style scoped>
.dev-mode-flag {
  color: red;
  padding-left: 500px;
  margin-right: 50px;
  margin-left: auto;
}
</style>
