<template>
  <b-modal id="modal-4" title="Создание папки" :hide-footer="true">
    <b-input-group prepend="Имя папки: " class="mt-3">
      <b-form-input v-model="newFolderName"></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-info" @click="createNewFolder()">Создать</b-button>
      </b-input-group-append>
    </b-input-group>
    <p v-if="!newFolderName" class="my-4" style="color: red; font-weight: bolder;">Введите имя папки.</p>
    <p v-if="isDublicatedName" class="my-4" style="color: red; font-weight: bolder;">Папка с этим именем уже существует.</p>
  </b-modal>
</template>

<script>
import { HTTP } from '@/http-common'

export default {
  props: ['path'],
  data() {
    return {
      isDublicatedName: false,
      newFolderName: disk.baseFolderName
    }
  },
  methods: {
    createNewFolder() {
      let query = ''
      if (disk.newFolderPath !== '/') {
        query = `?path=${disk.newFolderPath}/${this.newFolderName}`
      } else {
        query = `?path=${this.newFolderName}`
      }
      console.log(query)
      HTTP.put(`/disk/resources${query}`)
          .then(response => {
            console.log(response)
            this.newFolderName = disk.baseFolderName
            this.$bvModal.hide('modal-4')
            this.$emit('folderCreated')
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 409) {
              this.isDublicatedName = true
            }
          })
    }
  },
  watch: {
    newFolderName: {
      handler(val, oldVal) {
        if (this.isDublicatedName) {
          this.isDublicatedName = false
        }
      }
    }
  }
}
</script>