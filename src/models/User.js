import Cookies from 'js-cookie'

export default {
  isReg: false,
  isAdmin: false,
  kvant: null,
  password: '',
  isWrongPassword: false,
  isNotName: false,
  isNotKvant: false,
  name: '',
  oauthTokenSpace: 'AgAAAABHbNClAAaoR4818XRQfk39oiAO9kqmYEc', // TODO:
  oauthTokenAero: 'AgAAAABHb6IsAAaohE-YPm8kDEwalb5B9u_XNf4', // TODO:
  oauthToken: null,
  auth() {
    if ((this.password === '115' || this.password === '555' || this.password === 'admin555') && this.name) {
      if (this.password === 'admin555') {
        this.isAdmin = true
      } else {
        this.isAdmin = false
      }
      this.isWrongPassword = false
      this.isNotName = false
      this.isNotKvant = false
      Cookies.set('name', this.name)
      Cookies.set('password', this.password)
      if (this.kvant) {
        Cookies.set('kvant', this.kvant)
      } else {
        this.isNotKvant = true
        return false
      }
      this.isReg = true
      if (this.kvant === 'aero') this.oauthToken = this.oauthTokenAero
      if (this.kvant === 'space') this.oauthToken = this.oauthTokenSpace
      return true
    } else {
      if (!this.name && !(this.password === '115' || this.password === '555' || this.password === 'admin555')) {
        this.isNotName = true
        this.isWrongPassword = true
      } else if (!this.name) {
        this.isNotName = true
        this.isWrongPassword = false
      } else if (!(this.password === '115' || this.password === '555' || this.password === 'admin555')) {
        this.isWrongPassword = true
        this.isNotName = false
      }
      if (!this.kvant) this.isNotKvant = true
      return false
    }
  },
  logout() {
    this.name = ''
    this.password = ''
    this.kvant = null
    Cookies.remove('name')
    Cookies.remove('password')
    Cookies.remove('kvant')
    this.isReg = false
    this.isAdmin = false
  },
  initUser() {
    if (Cookies.get('name')) this.name = Cookies.get('name')
    if (Cookies.get('password')) this.password = Cookies.get('password')
    if (Cookies.get('kvant')) this.kvant = Cookies.get('kvant')
    if (this.password === '115' || this.password === '555' || this.password === 'admin555') this.isReg = true
    if (this.password === 'admin555') this.isAdmin = true
  },
  fixKvant() {
    if (this.kvant === 'aero') this.oauthToken = this.oauthTokenAero
    if (this.kvant === 'space') this.oauthToken = this.oauthTokenSpace
  },
  getOauthToken() {
    console.log('aaa')
    console.log(this.oauthToken)
    console.log(this.kvant)
    return this.oauthToken
  }
}