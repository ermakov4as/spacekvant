import Connect from './Connect'

export default {
  rotation: 'normal',
  savedRotatoin: null,
  turn: 4,
  power: 50,
  isMoving: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  leftPower: 0,
  rightPower: 0,
  robotLeftPower: 0,
  robotRightPower: 0,
  moveUp () {
    this.isMoving.down = false
    this.isMoving.up = !this.isMoving.up
    this.calculatePwr()
  },
  moveDown () {
    this.isMoving.up = false
    this.isMoving.down = !this.isMoving.down
    this.calculatePwr()
  },
  moveLeft () {
    this.isMoving.right = false
    this.isMoving.left = !this.isMoving.left
    this.calculatePwr()
  },
  moveRight () {
    this.isMoving.left = false
    this.isMoving.right = !this.isMoving.right
    this.calculatePwr()
  },
  stop () {
    this.isMoving.up = false
    this.isMoving.down = false
    this.isMoving.left = false
    this.isMoving.right = false
    this.calculatePwr()
  },
  checkRotation () {
    if (!this.isMoving.up && !this.isMoving.down && (this.isMoving.left || this.isMoving.right)) {
      if (this.rotation !== 'normal') {
        this.savedRotatoin = this.rotation
        this.rotation = 'normal'
      }
    } else {
      if (this.savedRotatoin) {
        this.rotation = this.savedRotatoin
        this.savedRotatoin = null
      }
    }
  },
  calculatePwr () {
    this.checkRotation()
    let _turn = this.turn / 10
    if (!this.isMoving.up && !this.isMoving.down && !this.isMoving.left && !this.isMoving.right) this.calculateStop()
    else if (!this.isMoving.up && !this.isMoving.down) this.calculateOnlyTurn(_turn)
    else if (!this.isMoving.left && !this.isMoving.right) this.calculateOnlyLinear()
    else {
      let _dir
      if (this.isMoving.up) _dir = 1
      else _dir = -1
      if (this.rotation === 'normal') this.calculateRotateNormal(_dir, _turn)
      else if (this.rotation === 'faster') this.calculateRotateFaster(_dir, _turn)
      else if (this.rotation === 'slower') this.calculateRotateSlower(_dir, _turn)
    }
    let _data = this.transformDataToUnsigned()
    Connect.sendWithDelay('motors', _data)
  },
  calculateStop () {
    this.leftPower = 0
    this.rightPower = 0
  },
  calculateOnlyTurn (_turn) {
    if (this.isMoving.left) {
      this.leftPower = -1 * this.power * _turn
      this.rightPower = 1 * this.power * _turn
    } else {
      this.leftPower = 1 * this.power * _turn
      this.rightPower = -1 * this.power * _turn
    }
  },
  calculateOnlyLinear () {
    if (this.isMoving.up) {
      this.leftPower = this.power
      this.rightPower = this.power
    } else {
      this.leftPower = -1 * this.power
      this.rightPower = -1 * this.power
    }
  },
  calculateRotateNormal (_dir, _turn) {
    if (this.isMoving.left) {
      this.leftPower = _dir * this.power * (1 - _turn)
      if ((this.power * (1 + _turn)) > 100) this.rightPower = _dir * 100
      else this.rightPower = _dir * this.power * (1 + _turn)
    } else {
      this.rightPower = _dir * this.power * (1 - _turn)
      if ((this.power * (1 + _turn)) > 100) this.leftPower = _dir * 100
      else this.leftPower = _dir * this.power * (1 + _turn)
    }
  },
  calculateRotateFaster (_dir, _turn) {
    if (this.isMoving.left) {
      this.leftPower = _dir * this.power
      if ((this.power * (1 + 2 * _turn)) > 100) this.rightPower = _dir * 100
      else this.rightPower = _dir * this.power * (1 + 2 * _turn)
    } else {
      this.rightPower = _dir * this.power
      if ((this.power * (1 + 2 * _turn)) > 100) this.leftPower = _dir * 100
      else this.leftPower = _dir * this.power * (1 + 2 * _turn)
    }
  },
  calculateRotateSlower (_dir, _turn) {
    if (this.isMoving.left) {
      this.leftPower = _dir * this.power * (1 - 2 * _turn)
      this.rightPower = _dir * this.power
    } else {
      this.rightPower = _dir * this.power * (1 - 2 * _turn)
      this.leftPower = _dir * this.power
    }
  },
  transformDataToUnsigned () {
    let _leftPower = this.leftPower
    let _rightPower = this.rightPower
    if (_leftPower < 0) _leftPower = _leftPower * (-1) + 110
    if (_rightPower < 0) _rightPower = _rightPower * (-1) + 110
    let _data = Uint8Array.of(3, _leftPower, _rightPower)
    return _data
  }
}
