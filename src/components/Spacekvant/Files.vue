<template>
  <div :class="{childFolder: path!=='/'}">
    <FolderName @folderCreated="folderCreated" />

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
              <label class="btn chooseFileBtn btn-outline-success">
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
              <v-btn icon @click.stop="deleteItem(item.path.slice(5))" class="deleteFolder">
                <v-icon color="red lighten-1">mdi-delete-circle-outline</v-icon>
              </v-btn>
              <v-list-item-subtitle v-text="item.modified.slice(0, 10)"></v-list-item-subtitle>
              <Files v-if="openedChildFolders.includes(item.resource_id)" :path="item.path.slice(5)" />
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
              <v-btn icon @click.stop="deleteItem(item.path.slice(5), item.name, item.type)">
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
import Files from './Files'
import FolderName from '@/components/Spacekvant/Modal/FolderName'
import { HTTP, HTTP_UPLOAD, HTTP_DOWNLOAD } from '@/http-common'
import xor from 'lodash/xor'
import axios from 'axios' // TODO:

export default {
  props: ['path'],
  name: 'Files',
  components: {
    Files,
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
      oauthToken: 'AgAAAAAGCC-jAAZEHmVxYwnlbkW6tBLUKiolJjk',
      openedChildFolders: [],
      uploading_file: null,
      file_url: null,
      isUploadingReady: false,
      badInetMode: false
    }
  },
  methods: {
    getDiskData(_path) {
      let query = '?path=' + _path
      HTTP.get(`/disk/resources${query}`)
          .then(response => {
            // TODO: <= 20
            this.yandexDisk = response.data._embedded.items
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: "error",
              title: 'Произошла ошибка',
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
        HTTP.get(`/disk/resources/upload${query}`)
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
        HTTP.delete(`/disk/resources${query}`)
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
      HTTP.get(`/disk/resources/download${query}`)
          .then(response => {
            console.log(response.data) // TODO:
            let downdoadUrl = response.data.href
            // this.cross_download(downdoadUrl)
            let downloadWindow
            downloadWindow = window.open(downdoadUrl)
            if (!this.badInetMode) {
              setTimeout(() => {
                if (downloadWindow) {
                  downloadWindow.close()
                  downloadWindow = null
                }
              }, 4)
            }
            // this.test4(downdoadUrl)
            // this.test3(downdoadUrl)
            // this.test2(downdoadUrl)
            // this.get_file_url(downdoadUrl)
            // this.openInNewTab(downdoadUrl)
            /* const link = document.createElement('a')
            link.href = downdoadUrl
            // link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link)
            link.click() */
            /* HTTP_DOWNLOAD.get(downdoadUrl)
              .then(response => {
                this.$notify({
                  group: 'foo',
                  type: "success",
                  title: 'Скачивание файла началось'
                })
              })
              .catch(error => {
                console.log(error)
                this.$notify({
                  group: 'foo',
                  type: "error",
                  title: 'Произошла ошибка
                })
          }) */
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: "error",
              title: 'Произошла ошибка',
              text: `${error.response.data.message}`
            })
          })
    },
    openInNewTab(href) {
      Object.assign(document.createElement('spacekvant-download'), {
        target: '_blank',
        href,
      }).click()
    },
    get_file_url(url) {
      var link_url = document.createElement('a')
      link_url.download = url.substring((url.lastIndexOf("/") + 1), url.length)
      link_url.href = url
      document.body.appendChild(link_url)
      link_url.click()
      document.body.removeChild(link_url)
      link_url.delete()
    },
    test2(pdflink) {
      var link = document.createElement('a')
      //pdflink - путь к файлу
      link.setAttribute('href', pdflink)
      let pdfname = 'test'
      //pdfname - имя файла для загрузки (как он будет называться у посетителя)
      link.setAttribute('download', pdfname)
      link.setAttribute('target','_blank')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
      window.top.close()
    },
    test3(sUrl) {
      window.downloadFile = function(sUrl) {
        window.open(sUrl, '_self')
      }
    },
    cross_download(url, fileName='test') {
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "blob";
      var __fileName = fileName;
      req.onload = function (event) {
        var blob = req.response;
        console.log(blob)
        var contentType = req.getResponseHeader("content-type");
        if (window.navigator.msSaveOrOpenBlob) {
          // Internet Explorer
          window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
        } else {
          var link = document.createElement('a');
          document.body.appendChild(link);
          link.download = __fileName;
          link.href = window.URL.createObjectURL(blob);
          link.click();
          document.body.removeChild(link); //remove the link when done
        }
      };
      req.send();
    },
    test4(url) {
      $.ajax({
        url,
        dataType: 'binary',
        xhrFields: {
          'responseType': 'blob'
        },
        success: function(data, status, xhr) {
          var blob = new Blob([data], {type: xhr.getResponseHeader('Content-Type')});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'download.png';
          link.click();
        }
      });
    },
    test() {
      axios({
        url: 'https://s110myt.storage.yandex.net/rdisk/4b9a7dfb901b6d84306b7329bb1ff9204cb6080da3901462537c2713d090799b/5e9ccb39/iVJ8xx-qw3D7RTW8Nc7hdutxhyQhIzyuibOraEU_L9x62fx5qV-fizgUFiy07BxyPwFHRATEHxNAI2qJTdTYXQ==?uid=1064440433&filename=favicon.png&disposition=attachment&hash=&limit=0&content_type=image%2Fpng&owner_uid=1064440433&fsize=32988&hid=09b0190337809a62970fa0a7b49d83e4&media_type=image&tknv=v2&etag=7887131607dfa12d07d8a30288290bf5&rtoken=SDowDIIYA9Tr&force_default=yes&ycrid=na-bc1d694b6d371e4708c9afcb3875e2da-downloader8e&ts=5a3abfbee8040&s=4bc6980e49bb0827f9909fbd9c7b61862dcf95d98647dd48d2876d45d2aacf68&pb=U2FsdGVkX1-OPqRvZKGuELxgjONhIpOHYpa7medAziW5I4Of6HxbjOj2e8QerMOVA7c7JUvTNXOOo77GOv6LQlu5UV42pXgODpQ-whGPT9c', //your url
        method: 'GET',
        responseType: 'blob', // important
      })
      //axios.get('https://s110myt.storage.yandex.net/rdisk/4b9a7dfb901b6d84306b7329bb1ff9204cb6080da3901462537c2713d090799b/5e9ccb39/iVJ8xx-qw3D7RTW8Nc7hdutxhyQhIzyuibOraEU_L9x62fx5qV-fizgUFiy07BxyPwFHRATEHxNAI2qJTdTYXQ==?uid=1064440433&filename=favicon.png&disposition=attachment&hash=&limit=0&content_type=image%2Fpng&owner_uid=1064440433&fsize=32988&hid=09b0190337809a62970fa0a7b49d83e4&media_type=image&tknv=v2&etag=7887131607dfa12d07d8a30288290bf5&rtoken=SDowDIIYA9Tr&force_default=yes&ycrid=na-bc1d694b6d371e4708c9afcb3875e2da-downloader8e&ts=5a3abfbee8040&s=4bc6980e49bb0827f9909fbd9c7b61862dcf95d98647dd48d2876d45d2aacf68&pb=U2FsdGVkX1-OPqRvZKGuELxgjONhIpOHYpa7medAziW5I4Of6HxbjOj2e8QerMOVA7c7JUvTNXOOo77GOv6LQlu5UV42pXgODpQ-whGPT9c')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
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