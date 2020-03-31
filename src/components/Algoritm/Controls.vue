<template>
  <div>
    <h3 v-if="!user.isReg">Запуск алгоритма доступен по паролю.</h3>
    <template v-else>
      <b-row>
        <b-col cols="3">
          <b-input-group prepend='X: ' class="mt-3">
            <b-form-input v-model="pole.dimY" type="number"></b-form-input>
          </b-input-group>
          {{ pole.dimY }}
        </b-col>
        <b-col cols="3">
          <b-input-group prepend='Y: ' class="mt-3">
            <b-form-input v-model="pole.dimX" type="number"></b-form-input>
          </b-input-group>
          {{ pole.dimX }}
        </b-col>
        <b-col cols="2.5" style="margin-top: 16px;">
          <b-button variant="outline-info" @click="pole.clearAll()" :disabled="pole.dimX<=0 || pole.dimY<=0">Изменить</b-button>
        </b-col>
        <b-col cols="2" style="margin-top: 16px;">
          <b-button variant="outline-info" @click="pole.resetDims()">Вернуть</b-button>
        </b-col>
      </b-row>
      <br>
      <b-button v-if="!pole.startMode" variant="outline-success" @click="pole.setMode('start', true)">Задать начальную точку</b-button>
      <b-button v-else variant="success" @click="pole.setMode('start', false)">Задать начальную точку (стоп)</b-button>
      <br><br>
      <b-button v-if="!pole.finishMode" variant="outline-danger" @click="pole.setMode('finish', true)">Задать конечную точку</b-button>
      <b-button v-else variant="danger" @click="pole.setMode('finish', false)">Задать конечную точку (стоп)</b-button>
      <br><br>
      <b-button v-if="!pole.prepMode" variant="outline-warning" @click="pole.setMode('prep', true)">Задать препятствия</b-button>
      <b-button v-else variant="warning" @click="pole.setMode('prep', false)">Задать препятствия (стоп)</b-button>
      <br><br>
      <b-button v-if="!algor.calculateReady" variant="outline-primary" @click="algor.calculate()">Рассчитать</b-button>
      <b-button v-else variant="dark" @click="pole.clearPoints()">Сбросить старт/финиш</b-button>
      <br><br><br>
      <b-button variant="outline-dark" @click="pole.clearAll()">Очистить карту</b-button>
    </template>
  </div>
</template>