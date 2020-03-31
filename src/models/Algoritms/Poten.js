import Algor from '../Algor'
import Pole from '../Pole'
import Alert from '../Alert'

export default {
  _dimX4: null,
  _dimY4: null,
  topPrepWeight: null,
  poleAdded: null,
  maxPotPrep: null,
  maxFinPrep: null,
  calculatePoten() {
    this.potenSetPoleAdded()
    this.potenCalculatePreps()
    this.potenCalculateDistWeight()
    this.potenCalculatePole()
  },
  potenSetPoleAdded() {
    this._dimX4 = Number(Number(Pole.dimX) + 2)
    this._dimY4 = Number(Number(Pole.dimY) + 2)
    let _pole = []
    for (let i in _.range(this._dimX4)) {
      let _line = []
      for (let j in _.range(this._dimY4)) {
        if (i<1 || this._dimX4-i<=1 || j<1 || this._dimY4-j<=1) {
          _line.push({
            color: 'black',
            prep: true,
            d: -1,
            potPrep: 0,
            finPrep: 0,
            sumPrep: 0,
            resPrep: 0
          })
        } else {
          _line.push({
            color: Pole.pole[i-1][j-1].color,
            prep: Pole.pole[i-1][j-1].prep,
            d: Pole.pole[i-1][j-1].d,
            potPrep: 0,
            finPrep: 0,
            sumPrep: 0,
            resPrep: 0
          })
        }
      }
      _pole.push(_line)
    }
    this.poleAdded = _pole
  },
  potenCalculatePreps() {
    this.topPrepWeight = 32 * Pole.dimX * Pole.dimY
    for (let i in _.range(this._dimX4)) {
      for (let j in _.range(this._dimY4)) {
        if (this.poleAdded[i][j].prep) {
          this.poleAdded[i][j].potPrep = this.topPrepWeight
          this.potenSearchNeighboursForPreps(i, j)
        }
      }
    }
    this.findMaxPotPrep()
  },
  potenSearchNeighboursForPreps(x, y) {
    for (let i in _.range(5)) {
      for (let j in _.range(5)) {
        let _x = Number(x)+Number(i)-2
        let _y = Number(y)+Number(j)-2
        if (_x>=0 && _x<this._dimX4 && _y>=0 && _y<this._dimY4 && !this.poleAdded[_x][_y].prep) {
          let _potPrepMode = Number(Math.abs(i-2) + Math.abs(j-2))
          if (i!==2 && j!==2) {
            if (_potPrepMode === 1) {
              this.poleAdded[_x][_y].potPrep += 2
              if (x>=1 && x<this._dimX4-1 && y>=1 && y<this._dimY4-1) this.poleAdded[_x][_y].resPrep += 2
            }
            else if (_potPrepMode === 2) {
              this.poleAdded[_x][_y].potPrep += 1
              if (x>=1 && x<this._dimX4-1 && y>=1 && y<this._dimY4-1) this.poleAdded[_x][_y].resPrep += 1
            }
          } else {
            if (_potPrepMode === 2) {
              this.poleAdded[_x][_y].potPrep += 1.4
              if (x>=1 && x<this._dimX4-1 && y>=1 && y<this._dimY4-1) this.poleAdded[_x][_y].resPrep += 1.4
            }
            else if (_potPrepMode === 3) {
              this.poleAdded[_x][_y].potPrep += 0.9
              if (x>=1 && x<this._dimX4-1 && y>=1 && y<this._dimY4-1) this.poleAdded[_x][_y].resPrep += 0.9
            }
            else if (_potPrepMode === 4) {
              this.poleAdded[_x][_y].potPrep += 0.7
              if (x>=1 && x<this._dimX4-1 && y>=1 && y<this._dimY4-1) this.poleAdded[_x][_y].resPrep += 0.7
            }
          }
        }
      }
    }
  },
  potenCalculateDistWeight() {
    this.maxFinPrep = 0
    for (let i in _.range(this._dimX4)) {
      for (let j in _.range(this._dimY4)) {
        if (!this.poleAdded[i][j].prep) {
          let _dist32 = Math.round(32 * Math.sqrt(Math.pow(Algor.finish_x+1-i, 2) + Math.pow(Algor.finish_y+1-j, 2)))
          this.poleAdded[i][j].finPrep = _dist32
          if (!this.poleAdded[i][j].prep && this.poleAdded[i][j].finPrep>this.maxFinPrep) {
            this.maxFinPrep = this.poleAdded[i][j].finPrep
          }
        }
        this.poleAdded[i][j].sumPrep = this.poleAdded[i][j].potPrep + this.poleAdded[i][j].finPrep
      }
    }
  },
  potenCalculatePole() {
    this.potenReturnPole()
    let _err = false
    let currentPoint = {x: Algor.start_x, y: Algor.start_y}
    while (!_err && !Algor.calculateReady) {
      if (Pole.pole[currentPoint.x][currentPoint.y].d > 0) {
        this._err = true
        console.log('Финиш недостижим')
        Algor.calculateReady = true
        Alert.showFailAlert('Невозможно проложить маршрут между заданными точками\n' + 
          'Метод потенциальных полей не гарантирует построения маршрута')
        break
      }
      Pole.pole[currentPoint.x][currentPoint.y].d = Pole.d
      Pole.d += 1
      if (!(currentPoint.x===Algor.finish_x && currentPoint.y===Algor.finish_y) && 
        !(currentPoint.x===Algor.start_x && currentPoint.y===Algor.start_y)) {
          Pole.pole[currentPoint.x][currentPoint.y].color = 'dark-orange-borders'
      } else if (currentPoint.x===Algor.finish_x && currentPoint.y===Algor.finish_y) {
        Algor.calculateReady = true
        console.log('Успех!')
        break
      }
      let _nextPoint = this.potenFindNextPoint(currentPoint.x, currentPoint.y)
      currentPoint = _nextPoint
    }
    Algor.calculateReady = true
  },
  potenReturnPole() {
    for (let i in _.range(this._dimX4)) {
      if (i>=1 && i<this._dimX4-1) {
        for (let j in _.range(this._dimY4)) {
          if (j>=1 && j<this._dimY4-1) {
            Pole.pole[i-1][j-1] = this.poleAdded[i][j]
          }
        }
      }
    }
  },
  potenFindNextPoint(x, y) {
    let _minWeight = this.poleAdded[x][y].sumPrep
    let nextPoint = {x, y}
    let _localData = {
      nextPoint,
      _minWeight
    }
    _localData = this.potenIsWeightLower(x-1, y-1, _localData)
    _localData = this.potenIsWeightLower(x, y-1, _localData)
    _localData = this.potenIsWeightLower(x+1, y-1, _localData)
    _localData = this.potenIsWeightLower(x-1, y, _localData)
    _localData = this.potenIsWeightLower(x+1, y, _localData)
    _localData = this.potenIsWeightLower(x-1, y+1, _localData)
    _localData = this.potenIsWeightLower(x, y+1, _localData)
    _localData = this.potenIsWeightLower(x+1, y+1, _localData)
    return _localData.nextPoint
  },
  potenIsWeightLower(x, y, _localData) {
    let { nextPoint, _minWeight } = _localData
    if (x>=0 && x<this._dimX4 && y>=0 && y<this._dimY4) {
      if (Pole.pole[x][y].sumPrep < _minWeight) {
        _localData = {
          nextPoint: {x, y},
          _minWeight: Pole.pole[x][y].sumPrep
        }
      }
    }
    return _localData 
  },
  findMaxPotPrep() {
    this.maxPotPrep = 0
    for (let i in _.range(this._dimX4)) {
      for (let j in _.range(this._dimY4)) {
        if (!this.poleAdded[i][j].prep && this.poleAdded[i][j].resPrep>this.maxPotPrep) {
          this.maxPotPrep = this.poleAdded[i][j].resPrep
        }
      }
    }
  }
}