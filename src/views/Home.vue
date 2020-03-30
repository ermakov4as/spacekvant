<template>
  <div>
    <h1>Робот-Луноход</h1>
    <v-btn class="ma-2" outlined color="indigo" v-if="!connect.devModeFlag" @click="devMode()">Включить режим разработки</v-btn>
    <v-btn class="ma-2" outlined color="error" v-else @click="devMode()">Отключить режим разработки</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    devMode () {
      if (!this.connect.devModeFlag && !this.connect.isConnected) {
        this.connect.isConnected = true
        this.connect.devModeFlag = true
      } else if (this.connect.devModeFlag) {
        this.connect.devModeFlag = false
        if (this.connect.isConnected) this.connect.isConnected = false
      }
    }
  }
}
</script>
