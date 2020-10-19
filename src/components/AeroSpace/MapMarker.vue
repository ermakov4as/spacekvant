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
  props: ['kvant', 'aerospace'],
  data() {
    return {
      coords: [54, 54],
      markerIcon: {
        layout: 'default#imageWithContent',
        //imageHref: 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png',
        imageSize: [40, 40],
        imageOffset: [-20, -20]
      },
      markerIconSk: {
        layout: 'default#imageWithContent',
        //imageHref: 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png',
        imageSize: [56, 56],
        imageOffset: [-28, -28]
      }
    }
  },
  computed: {
    balloonTemplate() {
      return `
        <h5>${this.kvant.name}</h5>
        <h6>${this.kvant.adress}</h6>
        <p>${this.kvant.coords}</p>
        <h6>${this.kvant.phone}</h6>
        <a href="${this.kvant.site}">Перейти на сайт</a>
      `
    }
  },
  components: {
    ymapMarker
  },
  created() {
    if (this.aerospace === 'aero') this.markerIcon.imageHref = 'https://www.roskvantorium.ru/upload/iblock/b5a/%D0%B0%D1%8D%D1%80%D0%BE.png'
    else if (this.aerospace === 'space') this.markerIcon.imageHref = 'https://www.roskvantorium.ru/upload/iblock/028/%D0%BA%D0%BE%D1%81%D0%BC%D0%BE.png'
    this.markerIconSk.imageHref = this.markerIcon.imageHref
  }
}
</script>