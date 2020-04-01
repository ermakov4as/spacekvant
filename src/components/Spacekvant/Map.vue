<template>
  <div class="mapPlace">
    <h3>Здесь должна быть карта</h3>
    <yandex-map :settings="settings" :coords="coords.map" :zoom="zoom" class="map" >
      <ymap-marker marker-id="sk" :coords="coords.sk" :icon="markerIconSk" :balloon-template="balloonTemplate.sk" />
      <ymap-marker marker-id="kbr" :coords="coords.kbr" :icon="markerIcon" :balloon-template="balloonTemplate.kbr" />
      <ymap-marker marker-id="krlv" :coords="coords.krlv" :icon="markerIcon" :balloon-template="balloonTemplate.krlv" />
      <ymap-marker marker-id="tmb" :coords="coords.tmb" :icon="markerIcon" :balloon-template="balloonTemplate.tmb" />
      <ymap-marker marker-id="ykt" :coords="coords.ykt" :icon="markerIcon" :balloon-template="balloonTemplate.ykt" />
      <ymap-marker marker-id="krsk" :coords="coords.krsk" :icon="markerIcon" :balloon-template="balloonTemplate.krsk" />
      <!--Markers-->
      <!-- TODO: -->
      <!-- https://vue-yandex-maps.github.io/guide/Marker.html#events -->
    </yandex-map>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  data() {
    return {
      coords: {
        map: [62.103294, 104.333165],
        sk: [55.692099, 37.347323],
        kbr: [43.477816, 43.626415],
        krlv: [55.910402, 37.834524],
        tmb: [52.724508, 41.453684],
        ykt: [62.031077, 129.724345],
        krsk: [56.009220, 92.888549]
      },
      zoom: 3,
      settings: {
        apiKey: '63c6b7dc-bb35-4871-8f15-86314a229b11', // TODO:
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      },
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png',
        imageSize: [30, 30],
        imageOffset: [0, 0]
      },
      markerIconSk: {
        layout: 'default#imageWithContent',
        imageHref: 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png',
        imageSize: [40, 40],
        imageOffset: [0, 0]
      }
    }
  },
  computed: {
    balloonTemplate() {
      return {
        sk: `<h5>Ян, выздоравливай!</h5><p>${this.coords.sk}</p>`,
        kbr: `<h5>КБР, адрес странный</h5><p>${this.coords.kbr}</p>`,
        krlv: `<h5>Космоквантум - МО</h5><p>${this.coords.krlv}</p>`,
        tmb: `<h5>Космоквантум - Тамбов</h5><p>${this.coords.tmb}</p>`,
        ykt: `<h5>Космоквантум - Якутск</h5><p>${this.coords.ykt}</p>`,
        krsk: `<h5>Космоквантум - Красноярск</h5><p>${this.coords.krsk}</p>`
      }
    }
  },
  components: {
    yandexMap,
    ymapMarker
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