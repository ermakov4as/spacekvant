import Connect from './Connect'

export default {
  light: false,
  changeLight () {
    let _light
    if (this.light) _light = 1
    else _light = 0
    let _data = Uint8Array.of(2, _light)
    Connect.sendWithDelay('light', _data)
  },
  lightOffHandler () {
    return Connect.toggleLigthCharacteristic.writeValue(Uint8Array.of(0))
  },
  toggle (mode) {
    switch (mode) {
      case 'red': this.toggleLightHandler(2); break
      case 'green': this.toggleLightHandler(3); break
      case 'blue': this.toggleLightHandler(4); break
      case 'blink': this.toggleLightHandler(1); break
    }
  },
  toggleLightHandler (code) {
    if (code === 1) {
      Connect.toggleLigthCharacteristic.writeValue(Uint8Array.of(code))
      return
    }
    Connect.toggleLigthCharacteristic.readValue()
      .then(currentCode => {
        let convertedCode = currentCode.getUint8(0)
        Connect.toggleLigthCharacteristic.writeValue(Uint8Array.of(convertedCode === code ? 0 : code))
      })
  }
}
