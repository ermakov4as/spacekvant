<template>
  <div>
    <template v-if="user.isReg">
      <h1 v-if="user.kvant==='space'">Космоквантум</h1>
      <h1 v-else-if="user.kvant==='aero'">Аэроквантум</h1>
      <FilesSpace v-if="user.kvant==='space'" :path="'/'"></FilesSpace>
      <FilesAero v-if="user.kvant==='aero'" :path="'/'"></FilesAero>
      <!-- <Map></Map> -->
    </template>

    <template v-else>
      <h3>Просмотр доступен только зарегистрированным пользователям</h3>
    </template>
  </div>
</template>

<script>
import FilesSpace from '@/components/AeroSpace/FilesSpace'
import FilesAero from '@/components/AeroSpace/FilesAero'
import Map from '@/components/AeroSpace/Map'

export default {
  components: {
    FilesSpace,
    FilesAero,
    Map
  }
}
</script>