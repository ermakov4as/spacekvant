import Algor from '../Algor'
import Pole from '../Pole'
import Alert from '../Alert'

export default {
  deikAstarMode: false,
  maxVisited: null,
  visited: null,
  maxDeikWeight: null,
  maxAstarWeight: null,
  minAstarWeight: null,
  calculateDeik(astarMode=false) {
    this.deikAstarMode = astarMode
    this.deikInitWeights()
    this.deikGlobalCalculateWeights()
    if (!Algor.calculateReady) {
      this.deikReturnRoute()
      this.deikVisualCalculatePersentWeight()
    }
  },
  calculateAstar() {
    let astarMode = true
    this.calculateDeik(astarMode)
  },
  deikInitWeights() {
    this.maxVisited = 0
    this.visited = 0
    this.maxDeikWeight = 0
    this.maxAstarWeight = 0
    let _maxD = 10 * Pole.dimX * Pole.dimY
    this.minAstarWeight = _maxD * 2
    for (let i in _.range(Pole.dimX)) {
      for (let j in _.range(Pole.dimY)) {
        if (!Pole.pole[i][j].prep) {
          this.maxVisited += 1
          Pole.pole[i][j].d = _maxD
          if (this.deikAstarMode) {
            Pole.pole[i][j].h = this.astarHeuristic(i, j)
            Pole.pole[i][j].dhS = _maxD * 2
          }
        }
      }
    }
    Pole.pole[Algor.start_x][Algor.start_y].d = 0
    Pole.pole[Algor.start_x][Algor.start_y].dhS = 0 + Pole.pole[Algor.start_x][Algor.start_y].h
  },
  astarHeuristic(x, y) {
    let deltaX = Math.abs(Number(Algor.finish_x) - Number(x))
    let deltaY = Math.abs(Number(Algor.finish_y) - Number(y))
    let diag = Math.min(deltaX, deltaY) * 14
    let linear = (Math.max(deltaX, deltaY) - Math.min(deltaX, deltaY)) * 10
    let heuristic = diag + linear
    return heuristic
  },
  deikGlobalCalculateWeights() {
    this.deikCalculateWeights(Algor.start_x, Algor.start_y)
  },
  deikCalculateWeights(x, y) {
    Pole.pole[x][y].visited = true
    this.visited += 1
    if (Pole.pole[Algor.finish_x][Algor.finish_y].visited) {
      if (!this.deikAstarMode) console.log('Прямой ход алгоритма Дейкстры завершён.')
      else console.log('Прямой ход алгоритма А * завершён.')
      return
    }
    this.deikSearchNeighbours(x, y)
    if (this.visited === this.maxVisited) {
      if (!this.deikAstarMode) console.log('Прямой ход алгоритма Дейкстры завершён.')
      else console.log('Прямой ход алгоритма А * завершён.')
      return
    } else this.deikFindMinNotVisitedWeight()
  },
  deikSearchNeighbours(x, y) {
    for (let i in _.range(3)) {
      for (let j in _.range(3)) {
        let _x = Number(x)+Number(i)-1
        let _y = Number(y)+Number(j)-1
        if (_x>=0 && _x<Pole.dimX && _y>=0 && _y<Pole.dimY && !Pole.pole[_x][_y].prep) {
          if (!Pole.pole[_x][_y].visited) {
            let _distMode = Number(Math.abs(_x-x) + Math.abs(_y-y))
            let _addDist
            switch (_distMode) {
              case 1:
                _addDist = 10
                break
              case 2:
                _addDist = 14
                break
              default:
                break
            }
            if (!this.deikAstarMode) {
              if (Pole.pole[x][y].d+_addDist < Pole.pole[_x][_y].d) {
                Pole.pole[_x][_y].d = Pole.pole[x][y].d+_addDist
                Pole.pole[_x][_y].deikPrevPoint = {x, y}
              }
            } else {
              let _addons = _addDist + this.astarHeuristic(_x, _y)
              if (Pole.pole[x][y].dhS+_addons < Pole.pole[_x][_y].dhS) {
                Pole.pole[_x][_y].d = Pole.pole[x][y].d+_addDist
                Pole.pole[_x][_y].dhS = Pole.pole[x][y].d+_addons
                Pole.pole[_x][_y].deikPrevPoint = {x, y}
              }
            }
          }
        }
      }
    }
  },
  deikFindMinNotVisitedWeight() {
    let _minWeight = 10 * Pole.dimX * Pole.dimY
    let _minAstarWeight = _minWeight * 2
    let _x, _y
    for (let i in _.range(Pole.dimX)) {
      for (let j in _.range(Pole.dimY)) {
        if (!Pole.pole[i][j].prep && !Pole.pole[i][j].visited) {
          if (!this.deikAstarMode) {
            if (Pole.pole[i][j].d < _minWeight) {
              _x = i
              _y = j
              _minWeight = Pole.pole[i][j].d
            }
          } else {
            if (Pole.pole[i][j].dhS < _minAstarWeight) {
              _x = i
              _y = j
              _minWeight = Pole.pole[i][j].d
              _minAstarWeight = Pole.pole[i][j].dhS
            }
          }
        }
      }
    }
    if (!_x || !_y) {
      if (Pole.pole[Algor.finish_x][Algor.finish_y].d === 10*Pole.dimX*Pole.dimY) {
        console.log('Финиш недостижим')
        Algor.calculateReady = true
        Alert.showFailAlert('Невозможно проложить маршрут между заданными точками')
      } else console.log('Есть недоступные точки на карте')
      return
    } else this.deikCalculateWeights(_x, _y)
  },
  deikReturnRoute() {
    let x = Pole.pole[Algor.finish_x][Algor.finish_y].deikPrevPoint.x
    let y = Pole.pole[Algor.finish_x][Algor.finish_y].deikPrevPoint.y
    while (!(x===Algor.start_x && y===Algor.start_y)) {
      let _prevPoint = Pole.pole[x][y].deikPrevPoint
      Pole.pole[x][y].color = 'dark-blue-borders'
      x = _prevPoint.x
      y = _prevPoint.y
    }
    return
  },
  deikVisualCalculatePersentWeight() {
    for (let i in _.range(Pole.dimX)) {
      for (let j in _.range(Pole.dimY)) {
        if (!this.deikAstarMode) {
          if (!Pole.pole[i][j].prep && Pole.pole[i][j].d!==10*Pole.dimX*Pole.dimY) {
            if (Pole.pole[i][j].d > this.maxDeikWeight) this.maxDeikWeight = Pole.pole[i][j].d
          }
        } else {
          if (!Pole.pole[i][j].prep && Pole.pole[i][j].dhS!==2*10*Pole.dimX*Pole.dimY) {
            if (Pole.pole[i][j].dhS > this.maxAstarWeight) this.maxAstarWeight = Pole.pole[i][j].dhS
            if (Pole.pole[i][j].dhS < this.minAstarWeight) this.minAstarWeight = Pole.pole[i][j].dhS
          }
        }
      }
    }
    if (this.deikAstarMode) this.minAstarWeight = Math.round(0.9 * this.minAstarWeight)
  }
}