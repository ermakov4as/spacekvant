<template>
  <div class="mapPlace">
    <h3>Карта аэроквантумов</h3>
    <yandex-map :settings="settings" :coords="mapCenterCoords" :zoom="zoom" class="map">
      <MapMarker
        v-for="kvant in kvantMapData"
        :key="kvant.id"
        :kvant="kvant"
        :aerospace="'aero'"
      />
    </yandex-map>
  </div>
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'
import MapMarker from './MapMarker'
import kvantData from '@/utils/aeroKvantData'

export default {
  data() {
    return {
      minWidthForNormalZoom: 1500,
      kvantMapData: [],
      mapCenterCoords: [53.714468, 86.713384],
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
    if (document.documentElement.clientWidth < this.minWidthForNormalZoom) {
      this.zoom = 3;
    }
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