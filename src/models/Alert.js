export default {
  dismissSecs: 5,
  dismissCountDown: 0,
  alertText: '',
  showFailAlert(text) {
    this.dismissCountDown = this.dismissSecs
    this.alertText = text
  },
  countDownChanged(_dismissCountDown=this.dismissSecs) {
    this.dismissCountDown = _dismissCountDown
  }
}