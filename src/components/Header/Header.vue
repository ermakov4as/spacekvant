<template>
  <b-row>
    <b-col cols="8">
      <router-link to="/">Главная</router-link> |
      <router-link to="/algoritm">Алгоритмы</router-link> |
      <router-link to="/about">Справка</router-link>
    </b-col>
    <b-col cols="4" class="loginGroup">
      <b-button v-if="!user.isReg" v-b-modal.modal-1 variant="outline-primary" class="logout">Войти</b-button>
      <template v-else>
        <img src="@/assets/sm7-31m.jpg" class="ava" alt="" />
        <b-dropdown class="mx-1" right :text="user.name">
          <b-dropdown-item @click="user.logout()">Выход</b-dropdown-item>
          <b-dropdown-item v-b-modal.modal-2>Об авторах</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-col>
  </b-row>  
</template>

<style scoped>
.logout {
  margin-left: auto;
  margin-right: 10px;
}
.loginGroup {
  width: 100%;
  display: inline-flex;
  flex-direction: row;
}
.header {
  width: 100%;
}
.ava {
  margin-left: auto;
  margin-right: 15px;
  height: 38px;
  width: 38px;
  border-radius: 100px; /* Радиус скругления */
  border: 3px solid blueviolet; /* Параметры рамки */
  box-shadow: 0 0 7px #666; /* Параметры тени */
}
</style>