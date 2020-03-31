<template>
  <div>
    <template v-if="user.isReg">
      <h1>Spacekvant</h1>
    </template>

    <template v-else>
      <h3>Просмотр доступен только зарегистрированным пользователям</h3>
    </template>
  </div>
</template>