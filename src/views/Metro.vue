<template>
  <div>
    <h2>Здесь будет справка</h2>
    <img src="@/assets/testMap.png" class="map" alt="" />
    <div class="station line3 baumanskaya" title='Бауманская'></div>
    <div class="station line3 electrozavodskaya" title='Электрозаводская'></div>
    <div class="station line3 kurskaya3" title='Курская (3)'></div>
    <div class="station line3 ploshchad_revolutcii" title='Площадь Революции'></div>
    <div class="station line5 kurskaya5" title='Курская (5)'></div>
    <div class="station line5 komsomolskaya5" title='Комсомольская (5)'></div>
    <div class="station line5 taganskaya5" title='Таганская (5)'></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.map {
  position: fixed;
  height: 245px;
  width: auto;
  left: 106px;
  top: 100px;
}

.station {
  border-radius: 30px;
  background-color: white;
  position: fixed;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.line3 {
  border: 2px solid blue;
}
.baumanskaya {
  left: 455px;
  top: 200px;
}
.electrozavodskaya {
  left: 520px;
  top: 190px;
}
.kurskaya3 {
  left: 390px;
  top: 210px;
}
.ploshchad_revolutcii {
  left: 290px;
  top: 210px;
}

.line5 {
  border: 2px solid brown;
}
.kurskaya5 {
  left: 355px;
  top: 210px;
}
.komsomolskaya5 {
  left: 340px;
  top: 145px;
}
.taganskaya5 {
  left: 340px;
  top: 275px;
}
</style>