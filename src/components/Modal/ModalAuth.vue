<template>
  <b-modal id="modal-1" title="Авторизация" :hide-footer="true">
    <p class="my-4">Пароль - 555</p>
    <v-col cols="12" sm="6" class="py-2">
      <p>Выберите направление</p>
      <v-btn-toggle v-model="user.kvant">
        <v-btn value="aero"> АЭРО </v-btn>
        <v-btn value="space"> КОСМО </v-btn>
      </v-btn-toggle>
    </v-col>
    <b-input-group prepend="Ваше имя: " class="mt-3">
      <b-form-input v-model="user.name"></b-form-input>
    </b-input-group>
    <b-input-group prepend="Пароль: " class="mt-3">
      <b-form-input v-model="user.password" type="password"></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-info" @click="preAuth()">Вход</b-button>
      </b-input-group-append>
    </b-input-group>
    <p v-if="user.isWrongPassword" class="my-4" style="color: red; font-weight: bolder;">Неверный пароль.</p>
    <p v-if="user.isNotName" class="my-4" style="color: red; font-weight: bolder;">Введите имя.</p>
    <p v-if="user.isNotKvant" class="my-4" style="color: red; font-weight: bolder;">Выберните направление.</p>
  </b-modal>
</template>

<script>
export default {
  methods: {
    preAuth() {
      let _successAuth = this.user.auth()
      _successAuth && this.$bvModal.hide('modal-1')
    }
  }
}
</script>