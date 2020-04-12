<template>
  <div :class="{childFolder: path!=='/'}">
    <FolderName @folderCreated="folderCreated" />

    <!-- <v-card max-width="800" class="mx-auto"> -->
    <v-card max-width="1200">
      <v-toolbar v-if="path==='/'" color="light-blue" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Документы</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-view-module</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list two-line subheader>

        <v-list-item>
          <v-list-item-avatar>
            <v-icon :class="[iconClass.actionsFolder]">mdi-folder-cog</v-icon>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title class="folderControlPanel">
              <!-- <b-button v-b-modal.modal-4 variant="outline-primary">Создать папку</b-button> -->
              <b-button variant="outline-primary" @click.stop="createNewFolder()">Создать папку</b-button>
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
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
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
import { HTTP } from '@/http-common'
import xor from 'lodash/xor'

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
      openedChildFolders: []
    }
  },
  methods: {
    getDiskData(_path) {
      let query = '?path=' + _path
      HTTP.get(`/disk/resources${query}`)
          .then(response => {
            console.log(response) // TODO: <= 20
            this.yandexDisk = response.data._embedded.items
          })
          .catch(error => {
            console.log(error)
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
</style>