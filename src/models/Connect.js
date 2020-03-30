import { ntf } from '@/services'
import Motors from './Motors'
import LED from './LED'

const MY_BLUETOOTH_NAME = 'HMSoft'
const SEND_SERVICE = 0xFFE0
const SEND_SERVICE_CHARACTERISTIC = 0xFFE1

export default {
  devModeFlag: false,
  isConnected: false,
  toggleLigthCharacteristic: undefined,
  myDevice: undefined,
  delay: 1,
  isSending: false,
  checkBrowser () {
    if (!navigator.bluetooth) {
      ntf.error('Данный браузер не поддерживает Bluetooth API')
    }
  },
  connectToBlut () {
    navigator.bluetooth.requestDevice({
      filters:
        [
          { name: MY_BLUETOOTH_NAME },
          { services: [SEND_SERVICE] }
        ]
    })
      .then(device => {
        console.log(device)
        this.myDevice = device
        return device.gatt.connect()
      })
      .then(server => server.getPrimaryService(SEND_SERVICE))
      .then(service => service.getCharacteristic(SEND_SERVICE_CHARACTERISTIC))
      .then(characteristic => {
        this.toggleLigthCharacteristic = characteristic
        this.isConnected = true
        ntf.success('Успешно подключено к HM-10')
        // eslint-disable-next-line
        let m_data = Uint8Array.of(3, 0, 0)
        this.sendWithDelay('motors', m_data)
      })
      .catch(error => {
        console.error(error)
      })
  },
  disconnectBlut () {
    let _delay = this.delay
    this.delay = 0
    // eslint-disable-next-line
    let m_data = Uint8Array.of(3, 0, 0)
    this.sendWithDelay('motors', m_data)
    // eslint-disable-next-line
    let l_data = Uint8Array.of(2, 0)
    this.sendWithDelay('light', l_data)
    this.delay = _delay
    if (LED.light) {
      LED.light = false
      LED.changeLight()
    }
    if (Motors.leftPower !== 0 || Motors.rightPower !== 0) Motors.stop()
    if (Motors.rotation !== 'normal') Motors.rotation = 'normal'
    setTimeout(() => {
      LED.lightOffHandler()
        .then(() => {
          this.myDevice.gatt.disconnect()
          this.isConnected = false
          this.toggleLigthCharacteristic = undefined
          this.myDevice = undefined
          ntf.warn('Bluetooth-устройство отключено')
        })
    }, 1000)
  },
  sendWithDelay (mode, data) {
    setTimeout(() => {
      console.log(data)
      if (!this.devModeFlag) {
        /* this.toggleLigthCharacteristic.writeValue(Int8Array.of(data)) */
        this.toggleLigthCharacteristic.writeValue(data)
        /* this.toggleLigthCharacteristic.readValue()
          .then(currentCode => {
            let convertedCode = currentCode.getUint8(0)
            this.toggleLigthCharacteristic.writeValue(Int8Array.of(convertedCode === data ? 0 : data))
          }) */
      }
      if (mode === 'motors') {
        Motors.robotLeftPower = Motors.leftPower
        Motors.robotRightPower = Motors.rightPower
      }
    }, (this.delay * 1000))
  }
}
