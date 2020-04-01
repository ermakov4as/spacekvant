<template>
  <div>
    <template v-if="user.isReg">
      <h1>Spacekvant</h1>
      <Files></Files>
      <Map></Map>
    </template>

    <template v-else>
      <h3>Просмотр доступен только зарегистрированным пользователям</h3>
    </template>
  </div>
</template>

<script>
import Files from '@/components/Spacekvant/Files'
import Map from '@/components/Spacekvant/Map'

export default {
  components: {
    Files,
    Map
  }
}
</script>