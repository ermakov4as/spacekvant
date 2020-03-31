import Algor from '../Algor'
import Pole from '../Pole'
import Alert from '../Alert'

export default {
  completedFwd: false,
  completedRev: false,
  localCompletedRev: false,
  calculateVoln() {
    let initCurrent = []
    initCurrent.push({x: Algor.start_x, y: Algor.start_y})
    this.fwdSearch(initCurrent)
    if (this.completedFwd) {
      let revFront = []
      revFront.push({x: Algor.finish_x, y: Algor.finish_y})
      this.revSearch([{x: Algor.finish_x, y: Algor.finish_y}])
    }
  },
  fwdSearch(currentFwd) {
    while (!this.completedFwd) {
      let nextFwd = []
      if (currentFwd.length) {
        for (let point of currentFwd) {
          nextFwd = this.checkNeighbours(point.x, point.y, 'fwd', nextFwd)
        }
        if (!nextFwd.length && !this.completedFwd) {
          console.log('Финиш недостижим')
          Algor.calculateReady = true
          Alert.showFailAlert('Невозможно проложить маршрут между заданными точками')
          break
        } 
        currentFwd = nextFwd
      }
    }
  },
  revSearch(revFront) {
    while (!this.completedRev) {
      this.localCompletedRev = false
      let prevPoint = this.checkNeighbours(revFront[0].x, revFront[0].y, 'rev')
      let _revFront = []
      if (!prevPoint || Pole.d < 0) {
        console.log('Ошибка...')
        break
      } 
      _revFront.push(prevPoint)
      _revFront.push(revFront)
      revFront = _revFront
      if (prevPoint.x===Algor.start_x && prevPoint.y===Algor.start_y) {
        this.completedRev = true
        Pole.pole[prevPoint.x][prevPoint.y].color = 'green'
        console.log('Успех!')
      }
    }
  },
  checkNeighbours(x, y, mode, next=[]) {
    next = this.checkPointSelectMode(x+1, y-1, mode, next, x, y)
    next = this.checkPointSelectMode(x+1, y, mode, next, x, y)
    next = this.checkPointSelectMode(x+1, y+1, mode, next, x, y)
    next = this.checkPointSelectMode(x, y-1, mode, next, x, y)
    next = this.checkPointSelectMode(x, y+1, mode, next, x, y)
    next = this.checkPointSelectMode(x-1, y-1, mode, next, x, y)
    next = this.checkPointSelectMode(x-1, y, mode, next, x, y)
    next = this.checkPointSelectMode(x-1, y+1, mode, next, x, y)
    return next
  },
  checkPointSelectMode(x, y, mode, next, parentX, parentY) {
    let _dist = Math.abs(Number(x)-Number(parentX)) + Math.abs(Number(y)-Number(parentY))
    if (mode === 'fwd') {
      next = this.checkPointFwd(x, y, next, _dist, Pole.pole[parentX][parentY].d)
    }
    else if (mode === 'rev') {
      let _next = this.checkPointRev(x, y, _dist, Pole.pole[parentX][parentY].d)
      if (_next) next = _next
    }
    return next
  },
  checkPointFwd(x, y, nextFwd, distMode, parentD) {
      if (x >= 0 && x < Pole.dimX && y >= 0 && y < Pole.dimY && !Pole.pole[x][y].prep) {
      if (Pole.pole[x][y].d === -1 || (Pole.pole[x][y].d > ((distMode===1&&(parentD+10))||(distMode===2&&(parentD+14  ))))) {
        Pole.pole[x][y].color = 'orange-borders'
        nextFwd.push({x, y})
        if (distMode===1) {
          Pole.pole[x][y].d = parentD + 10
        } else {
          Pole.pole[x][y].d = parentD + 14
        }
      }
      if (x === Algor.finish_x && y === Algor.finish_y) {
        Pole.pole[x][y].color = 'red'
        console.log('Финиш достигнут!')
        this.completedFwd = true
      }
    }
    return nextFwd
  },
  checkPointRev(x, y, distMode, parentD) {
    if ((!this.localCompletedRev) && (x >= 0 && x < Pole.dimX && y >= 0 && y < Pole.dimY && !Pole.pole[x][y].prep)) {
      if ((Pole.pole[x][y].d+((distMode===1&&10)||(distMode===2&&14)))===parentD) {
        Pole.pole[x][y].color = 'blue'
        this.localCompletedRev = true
        return {x, y}
      }
      return null
    }
    return null
  }
}