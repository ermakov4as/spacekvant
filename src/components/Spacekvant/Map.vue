<template>
  <div class="mapPlace">
    <h3>Карта космоквантумов</h3>
    <yandex-map :settings="settings" :coords="mapCenterCoords" :zoom="zoom" class="map">
      <MapMarker
        v-for="kvant in kvantMapData"
        :key="kvant.id"
        :kvant="kvant"
      />
    </yandex-map>
  </div>
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'
import MapMarker from './MapMarker'
import kvantData from '@/utils/kvantData'

export default {
  data() {
    return {
      kvantMapData: [],
      mapCenterCoords: [52.314468, 85.813384],
      zoom: 4,
      settings: {
        apiKey: '63c6b7dc-bb35-4871-8f15-86314a229b11', // TODO:
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      }
    }
  },
  components: {
    yandexMap,
    MapMarker
  },
  created() {
    this.kvantMapData = kvantData
  }
}
</script>

<style scoped>
.mapPlace {
  text-align: center;
  padding: 20px;
}
.map {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 60vh;
  border-radius: 2px;
}
</style>