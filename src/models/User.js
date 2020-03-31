import Cookies from 'js-cookie'

export default {
  isReg: false,
  password: '',
  isWrongPassword: false,
  isNotName: false,
  name: '',
  auth() {
    if (this.password === '115' && this.name) {
      this.isReg = true
      this.isWrongPassword = false
      this.isNotName = false
      Cookies.set('name', this.name)
      Cookies.set('password', this.password)
      return true
    } else {
      if (!this.name && this.password !== '115') {
        this.isNotName = true
        this.isWrongPassword = true
      } else if (!this.name) {
        this.isNotName = true
        this.isWrongPassword = false
      } else if (this.password !== '115') {
        this.isWrongPassword = true
        this.isNotName = false
      }
      return false
    }
  },
  logout() {
    this.name = ''
    this.password = ''
    Cookies.remove('name')
    Cookies.remove('password')
    this.isReg = false
  },
  initUser() {
    if (Cookies.get('name')) this.name = Cookies.get('name')
    if (Cookies.get('password')) this.password = Cookies.get('password')
    if (this.password === '115' && this.name) this.isReg = true
  }
}