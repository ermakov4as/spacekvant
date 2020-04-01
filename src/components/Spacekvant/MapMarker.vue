<template>
  <ymap-marker
    :marker-id="kvant.id"
    :coords="kvant.coords"
    :icon="kvant.id==='sk' ? markerIconSk : markerIcon"
    :balloon-template="balloonTemplate"
  />
</template>

<script>
import { ymapMarker } from 'vue-yandex-maps'

export default {
  props: ['kvant'],
  data() {
    return {
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png',
        imageSize: [40, 40],
        imageOffset: [0, 0]
      },
      markerIconSk: {
        layout: 'default#imageWithContent',
        imageHref: 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png',
        imageSize: [55, 55],
        imageOffset: [0, 0]
      }
    }
  },
  computed: {
    balloonTemplate() {
      return 
        `
          <h5>${this.kvant.name}</h5>
          <h6>${this.kvant.adress}</h6>
          <p>${this.kvant.coords}</p>
          <h6>${this.kvant.phone}</h6>
        `
    }
  },
  components: {
    ymapMarker
  }
}
</script>