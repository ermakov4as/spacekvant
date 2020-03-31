<template>
  <b-modal id="modal-1" title="Авторизация" :hide-footer="true">
    <p class="my-4">Пароль - номер аудитории, где у нас пара (без "м")</p>
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