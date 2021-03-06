<template>
  <div :class="{childFolder: path!=='/'}">
    <FolderName @folderCreated="folderCreated"/>

    <!-- <v-card max-width="800" class="mx-auto"> -->
    <v-card max-width="1000">
      <v-toolbar v-if="path==='/'" color="light-blue" dark>
        <img src="@/assets/YandexDisk.png" class="ydisk" alt="" />
        <v-toolbar-title>Документы</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="badInetMode" icon @click.stop="badInetMode = false" title="Выключить режим плохого интернета">
          <v-icon>mdi-network-strength-outline</v-icon>
        </v-btn>
        <v-btn v-else icon @click.stop="badInetMode = true" title="Включить режим плохого интернета при скачивании файлов">
          <v-icon>mdi-network-strength-3</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list two-line subheader>

        <v-list-item>
          <v-list-item-avatar>
            <v-icon :class="[iconClass.actionsFolder]">mdi-folder-cog</v-icon>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title class="folderControlPanel">
              <b-button variant="outline-primary" class="createFolderBtn" @click.stop="createNewFolder()">Создать папку</b-button>
              <label class="btn chooseFileBtn btn-outline-success" @click.stop="">
                Выбрать файл
                <input type="file" style="display: none;" @change="prepareFileToUpload($event)">
              </label>
              <b-button  
                :variant="isUploadingReady ? 'outline-success' : 'outline-secondary'" 
                @click.stop="uploadFile()" 
                :disabled="!isUploadingReady"
              >
                <v-icon :style="`color: ${isUploadingReady ? 'green' : 'gray'};`">mdi-cloud-upload-outline</v-icon>
              </b-button>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item 
          v-for="item in yandexDisk" 
          :key="'folder'+item.resource_id" 
          :class="{zeroHeight: item.type!=='dir'}"
          @click.stop="toggleOpenFolder(item.resource_id)"  
        >
          <template v-if="item.type==='dir'">
            <v-list-item-avatar>
              <v-icon :class="[iconClass.folder]">mdi-folder</v-icon>
            </v-list-item-avatar>
    
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-btn v-if="user.isAdmin" icon @click.stop="deleteItem(item.path.slice(5))" class="deleteFolder">
                <v-icon color="red lighten-1">mdi-delete-circle-outline</v-icon>
              </v-btn>
              <v-list-item-subtitle v-text="item.modified.slice(0, 10)"></v-list-item-subtitle>
              <FilesAero v-show="openedChildFolders.includes(item.resource_id)" :path="item.path.slice(5)" />
            </v-list-item-content>

          </template>  
        </v-list-item>
  
        <v-list-item v-for="item in yandexDisk" :key="'file'+item.resource_id" :class="{zeroHeight: item.type!=='file'}">
          <template v-if="item.type==='file'">
            <v-list-item-avatar>
              <v-icon v-if="item.media_type==='image'" :class="[iconClass.file]">mdi-image-size-select-actual</v-icon>
              <v-icon v-else-if="item.media_type==='video'" :class="[iconClass.file]">mdi-video</v-icon>
              <v-icon v-else-if="item.media_type==='audio'" :class="[iconClass.file]">mdi-audio</v-icon>
              <v-icon v-else :class="[iconClass.file]">mdi-file</v-icon>
            </v-list-item-avatar>
    
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.modified.slice(0, 10)"></v-list-item-subtitle>
            </v-list-item-content>
    
            <v-list-item-action>
              <v-btn icon @click.stop="downloadFile(item.path.slice(5))">
                <v-icon color="green lighten-1">mdi-download</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn v-if="user.isAdmin" icon @click.stop="deleteItem(item.path.slice(5), item.name, item.type)">
                <v-icon color="red lighten-1">mdi-delete-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import FilesAero from './FilesAero'
import FolderName from '@/components/AeroSpace/Modal/FolderName'
import { HTTP_AERO, HTTP_UPLOAD } from '@/http-common'
import xor from 'lodash/xor'

export default {
  props: ['path'],
  name: 'FilesAero',
  components: {
    FilesAero,
    FolderName
  },
  data() {
    return {
      iconClass: {
        folder: 'grey lighten-1 white--text',
        actionsFolder: 'green lighten-1 white--text',
        file: 'blue white--text'
      },
      yandexDisk: [],
      openedChildFolders: [],
      uploading_file: null,
      file_url: null,
      isUploadingReady: false,
      badInetMode: false
    }
  },
  methods: {
    // FIXME: сейчас дублируются запросы под разные токены (aero/space) - надо придумать, как привести в нормальный вид
    getDiskData(_path) {
      let query = '?path=' + _path
      HTTP_AERO.get(`/disk/resources${query}`)
        .then(response => {
          // TODO: <= 20
          this.yandexDisk = response.data._embedded.items
        })
        .catch(error => {
          this.$notify({
            group: 'foo',
            type: "error",
            title: 'Произошла ошибка AERO',
            text: `${error.response.data.message}`
          })
        })
    },
    toggleOpenFolder(resource_id) {
      this.openedChildFolders = xor(this.openedChildFolders, [resource_id])
    },
    createNewFolder() {
      disk.newFolderPath = this.path
      this.$bvModal.show("modal-4")
    },
    folderCreated() {
      this.getDiskData(this.path)
    },
    prepareFileToUpload(event) {
      if (event.target.files[0]) {
        let reader = new FileReader()
        let app = this
        app.uploading_file = event.target.files[0]
        reader.readAsDataURL(event.target.files[0])
        let query = ''
        if (this.path !== '/') {
          query = `?path=${this.path}/${this.uploading_file.name}`
        } else {
          query = `?path=/${this.uploading_file.name}`
        }
        HTTP_AERO.get(`/disk/resources/upload${query}`)
          .then((response) => {
            this.file_url = response.data.href
            this.isUploadingReady = true
            this.$notify({
              group: 'foo',
              type: "success",
              title: 'Файл готов к загрузке'
            })
          })
          .catch((error) => {
            console.log(error.response)
            if (error.response.status === 409) {
              this.$notify({
                group: 'foo',
                type: "error",
                title: 'Ошибка загрузки',
                text: 'Файл с таким именем уже существует'
              })
            } else {
              this.$notify({
                group: 'foo',
                type: "error",
                title: 'Произошла ошибка',
                text: `${error.response.data.message}`
              })
            }
          })
      }
    },
    uploadFile() {
      if (this.uploading_file) {
        this.$notify({
          group: 'foo',
          type: "warn",
          title: 'Пожалуйста, подождите',
          text: 'Загрузка файла на сервер'
        })
        if (this.uploading_file.size > 3000000) {
          this.$notify({
            group: 'foo',
            type: "warn",
            title: 'Большой файл',
            text: 'Ожидание может оказаться дольше обычного'
          })
        }
        let formData = new FormData()
        formData.append("file", this.uploading_file)
        let query = `?path=${this.path}&url=${this.file_url}`
        HTTP_UPLOAD.post(this.file_url, formData)
            .then((response) => {
              this.$notify({
                group: 'foo',
                type: "success",
                title: 'Успешно загружено',
                text: 'Файл загружен на сервер'
              })
              this.file_url = null
              this.isUploadingReady = false
              this.getDiskData(this.path)
            })
            .catch((error) => {
              this.$notify({
                group: 'foo',
                type: "error",
                title: 'Произошла ошибка',
                text: `${error.response.data.message}`
              })
            })
      }
    },
    deleteItem(_path, name, type) {
      let confirmDeleting = confirm(`Удалить ${type==='folder'?'паку':'файл'}?`)
      if (confirmDeleting) {
        let query = '?path=' + _path
        HTTP_AERO.delete(`/disk/resources${query}`)
          .then(response => {
            this.getDiskData(this.path)
            this.$notify({
              group: 'foo',
              type: "success",
              title: 'Успешно удалено'
            })
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: "error",
              title: 'Произошла ошибка',
              text: `${error.response.data.message}`
            })
          })
      }
    },
    downloadFile(_path) {
      let query = '?path=' + _path
      HTTP_AERO.get(`/disk/resources/download${query}`)
        .then(response => {
          let downdoadUrl = response.data.href
          let downloadWindow
          downloadWindow = window.open(downdoadUrl)
          this.$notify({
            group: 'foo',
            type: "warn",
            title: 'Пробуем скачать файл'
          })
          if (!this.badInetMode) {
            setTimeout(() => {
              if (downloadWindow) {
                downloadWindow.close()
                downloadWindow = null
              }
            }, 4)
          }
        })
        .catch(error => {
          this.$notify({
            group: 'foo',
            type: "error",
            title: 'Произошла ошибка',
            text: `${error.response.data.message}`
          })
        })
    }
  },
  created() {
    this.getDiskData(this.path)
  }
}
</script>

<style scoped>
.zeroHeight {
  min-height: 0!important;
}
.childFolder {
  border-left: 1px solid blue;
}
.folderControlPanel {
  padding-left: 15px;
  padding-right: 15px;
}
.createFolderBtn {
  margin-right: 60px;
}
.chooseFileBtn {
  margin: 0;
  margin-right: 8px;
}
.chooseFileBtn:hover {
  cursor: pointer;
}
.ydisk {
  margin-left: auto;
  margin-right: 15px;
  height: 38px;
  width: 38px;
}
.deleteFolder {
  position: absolute;
  right: 16px;
  top: 18px;
}
</style>