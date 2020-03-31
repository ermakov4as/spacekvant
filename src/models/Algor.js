import Voln from './Algoritms/Voln'
import Poten from './Algoritms/Poten'
import DeikAstar from './Algoritms/DeikAstar'
import Alert from './Alert'

export default {
  start_x: null,
  start_y: null,
  finish_x: null,
  finish_y: null,
  calculateReady: false,
  startPointReady: false,
  finishPointReady: false,
  algTypes: [
    {value: 'voln', text: 'Волновой'},
    {value: 'poten', text: 'Потенциальный'},
    {value: 'deik', text: 'Дейкстры'},
    {value: 'astar', text: 'А *'}
  ],
  selectedAlg: null,
  calculate() {
    if (!this.startPointReady || !this.finishPointReady) {
      console.log('Сперва выберите точки начала и конца пути')
      Alert.showFailAlert('Сперва выберите точки начала и конца пути')
    } else {
      switch (this.selectedAlg) {
        case 'voln':
          Voln.calculateVoln()
          break
        case 'poten':
          Poten.calculatePoten()
          break
        case 'astar':
          DeikAstar.calculateAstar()
          break
        case 'deik':
          DeikAstar.calculateDeik()
          break
        default:
          break
      }
    }
    this.calculateReady = true
  }
}