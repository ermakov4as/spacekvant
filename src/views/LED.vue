<template>
  <div class="home">
    <div v-if="!connect.isConnected">
      <button @click.prevent="connect.connectToBlut">Connect</button>
    </div>
    <div v-else>
      <button @click.prevent="connect.disconnectBlut">Disonnect</button>
      <button @click.prevent="led.lightOffHandler">Light off</button>
      <button @click.prevent="led.toggle('red')">Toggle Red</button>
      <button @click.prevent="led.toggle('green')">Toggle Green</button>
      <button @click.prevent="led.toggle('blue')">Toggle Blue</button>
      <button @click.prevent="led.toggle('blink')">Blink</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'led',
  created () {
    this.connect.checkBrowser()
  }
}
</script>
