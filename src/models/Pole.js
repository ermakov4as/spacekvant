import Algor from './Algor'
import Voln from './Algoritms/Voln'

export default {
  dimX: 10,
  dimY: 10,
  pole: null,
  readyFlag: false,
  prepMode: true,
  startMode: false,
  finishMode: false,
  d: 0,
  changeAlgor() {
    Algor.calculateReady = false
    for (let i in _.range(this.dimX)) {
      for (let j in _.range(this.dimY)) {
        this.pole[i][j].h = -1
        this.pole[i][j].dhS = -1
        this.pole[i][j].d = -1
        this.pole[i][j].prevD = -1
        this.pole[i][j].potPrep = 0
        this.pole[i][j].finPrep = 0
        this.pole[i][j].sumPrep = 0
        this.pole[i][j].resPrep = 0
        this.pole[i][j].visited = false
        this.pole[i][j].deikPrevPoint = null
        if (!(this.pole[i][j].color==='white' || this.pole[i][j].color==='black' || 
          this.pole[i][j].color==='green' || this.pole[i][j].color==='red')) {
            this.pole[i][j].color = 'white'
        }
      }
    }
  },
  setMode(mode, on) {
    if (!on) [this.startMode, this.finishMode, this.prepMode] = [false, false, false]
    else {
      if (mode === 'start') [this.startMode, this.finishMode, this.prepMode] = [true, false, false]
      else if (mode === 'finish') [this.startMode, this.finishMode, this.prepMode] = [false, true, false]
      else if (mode === 'prep') [this.startMode, this.finishMode, this.prepMode] = [false, false, true]
    }
  },
  clearPoints() {
    Algor.start_x = null
    Algor.start_y = null
    Algor.finish_x = null
    Algor.finish_y = null
    for (let i in _.range(this.pole.dimX)) {
      for (let j in _.range(this.pole.dimY)) {
        this.pole[i][j].d = -1
        this.pole[i][j].h = -1
        this.pole[i][j].dhS = -1
        this.pole[i][j].prevD = -1
        this.pole[i][j].potPrep = 0
        this.pole[i][j].finPrep = 0
        this.pole[i][j].sumPrep = 0
        this.pole[i][j].resPrep = 0
        this.pole[i][j].visited = false
        this.pole[i][j].deikPrevPoint = null
        if (!(this.pole[i][j].color==='white' || this.pole[i][j].color==='black')) {
          this.pole[i][j].color = 'white'
        }
      }
    }
    Algor.startPointReady = false
    Algor.finishPointReady = false
    Algor.calculateReady = false
    Voln.completedFwd = false
    Voln.completedRev = false
    this.setMode('start', true)
  },
  clearAll() {
    this.readyFlag = false
    let _pole = []
    for (let i in _.range(this.dimX)) {
      let _line = []
      for (let j in _.range(this.dimY)) {
        _line.push({
          color: 'white',
          prep: false,
          d: -1,
          h: -1,
          dhS: -1,
          prevD: -1,
          potPrep: 0,
          finPrep: 0,
          sumPrep: 0,
          resPrep: 0,
          visited: false,
          deikPrevPoint: null
        })
      }
      _pole.push(_line)
    }
    this.pole = _pole
    this.clearPoints()
    this.setMode('prep', true)
    this.readyFlag = true
  },
  resetDims() {
    this.dimX = 10
    this.dimY = 10
    this.clearAll()
  },
  fixPoint(x, y) {
    if (this.startMode) {
      Algor.start_x && Algor.start_y && (this.pole[Algor.start_x][Algor.start_y].color = 'white')
      Algor.start_x = x
      Algor.start_y = y
      Algor.startPointReady = true
      this.d = 0
      this.pole[x][y].color = 'green'
      this.pole[x][y].d = this.d
      console.log('start: ', x, y)
      this.startMode = false
      setTimeout(() => { this.finishMode = true }, 4)
    }
    if (this.finishMode) {
      Algor.finish_x && Algor.finish_y && (this.pole[Algor.finish_x][Algor.finish_y].color = 'white')
      Algor.finish_x = x
      Algor.finish_y = y
      Algor.finishPointReady = true
      this.pole[x][y].color = 'red'
      console.log('finish: ', x, y)
      this.finishMode = false
    }
    if (this.prepMode) {
      if (this.pole[x][y].color !== 'black') {
        this.pole[x][y].color = 'black'
        this.pole[x][y].prep = true
      } else {
        this.pole[x][y].color = 'white'
        this.pole[x][y].prep = false
      }
    }
  }
}