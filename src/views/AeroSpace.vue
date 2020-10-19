<template>
  <div>
    <template v-if="user.isReg">
      <h1 v-if="user.kvant==='space'">Космоквантум</h1>
      <h1 v-else-if="user.kvant==='aero'">Аэроквантум</h1>
      <FilesSpace v-if="user.kvant==='space'" :path="'/'"></FilesSpace>
      <FilesAero v-if="user.kvant==='aero'" :path="'/'"></FilesAero>
      <MapSpace v-if="user.kvant==='space'"></MapSpace>
      <MapAero v-if="user.kvant==='aero'"></MapAero>
    </template>

    <template v-else>
      <h3>Просмотр доступен только зарегистрированным пользователям</h3>
    </template>
  </div>
</template>

<script>
import FilesSpace from '@/components/AeroSpace/FilesSpace'
import FilesAero from '@/components/AeroSpace/FilesAero'
import MapSpace from '@/components/AeroSpace/MapSpace'
import MapAero from '@/components/AeroSpace/MapAero'

export default {
  components: {
    FilesSpace,
    FilesAero,
    MapSpace,
    MapAero
  }
}
</script>