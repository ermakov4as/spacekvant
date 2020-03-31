<template>
  <b-container>

    <b-row align-h="end">
      <AlgoritmChoise></AlgoritmChoise>
    </b-row>

    <b-row>
      <b-col sm="*">
        <Pole></Pole>
      </b-col>

      <b-col style="min-width: 500px;">
        <Controls></Controls>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import Pole from '@/components/Algoritm/Pole'
import Controls from '@/components/Algoritm/Controls'
import AlgoritmChoise from '@/components/Algoritm/AlgoritmChoise'

export default {
  name: 'Algoritm',
  components: {
    Pole,
    Controls,
    AlgoritmChoise
  },
  created() {
    this.pole.clearAll()
    this.algor.selectedAlg = this.algor.algTypes[0].value
  }
}
</script>

<style scoped>
.green {
  background-color: green;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
.black {
  background-color: black;
}
.pointer {
  cursor: pointer;
}
</style>