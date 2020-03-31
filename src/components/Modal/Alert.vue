<template>
  <b-alert 
    :show="alert.dismissCountDown" 
    dismissible 
    variant="danger"
    @dismissed="alert.dismissCountDown=0"
    @dismiss-count-down="alert.countDownChanged(alert.dismissSecs)"
  >
    {{ alert.alertText }}
  </b-alert> 
</template>