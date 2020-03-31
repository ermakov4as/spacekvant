<template>
  <b-col cols="5">
    <b-row>
      <b-col cols="8">
        <b-form-select v-model="algor.selectedAlg" :options="algor.algTypes" @change="pole.changeAlgor()"></b-form-select>
      </b-col>
    </b-row>
  </b-col>
</template>