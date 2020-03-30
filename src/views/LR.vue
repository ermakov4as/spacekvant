<template>
  <div>
    <table v-if="readyFlag">
      <body>
        <tr v-for="(line, index) in pole" :key="index" style="border: 1px solid red;">
          <td
            v-for="(elem, i) in line"
            :key="i" class="kletka"
            @click="fixPoint(index, i)"
            :class="{ green: elem.value===1, red: elem.value===2, blue: elem.value===3 }"
          >
          </td>
        </tr>
      </body>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pole: null,
      start_x: null,
      start_y: null,
      finish_x: null,
      finish_y: null,
      readyFlag: false,
      neighbours: [],
      closed: [],
      opened: [],
      path: []
    }
  },
  methods: {
    fixPoint(x, y) {
      if (!this.start_x) {
        this.start_x = x
        this.start_y = y
        this.pole[x][y].value = 1
        this.pole[x][y].open = true
        console.log('start: ', x, y)
      } else {
        this.finish_x = x
        this.finish_y = y
        this.pole[x][y].value = 2
        console.log('finish: ', x, y)
        this.checkNeighboursPlan(this.start_x, this.start_y)
        this.algo()
      }
    },
    checkNeighboursPlan(x, y) {
      this.checkNeighbours(x+1, y-1)
      this.checkNeighbours(x+1, y)
      this.checkNeighbours(x+1, y+1)
      this.checkNeighbours(x, y-1)
      this.checkNeighbours(x, y+1)
      this.checkNeighbours(x-1, y-1)
      this.checkNeighbours(x-1, y)
      this.checkNeighbours(x-1, y+1)
    },
    checkNeighbours(x, y) {
      if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        this.neighbours.push({ x, y })
        this.pole[x][y].open = true
        let f = Math.sqrt(Math.pow((this.finish_x - x), 2) + Math.pow((this.finish_y - y), 2))
        this.pole[x][y].f = f
        console.log(x, y, f)
      }
    },
    algo() {
      console.log(this.neighbours)
      while (true) {
        let _x = this.neighbours[0].x
        let _y = this.neighbours[0].y
        let min_f = this.pole[this.neighbours[0].x][this.neighbours[0].y].f
        this.neighbours.forEach(indexes => {
          if (this.pole[indexes.x][indexes.y].f < min_f) {
            min_f = this.pole[indexes.x][indexes.y].f
            _x = indexes.x
            _y = indexes.y
            console.log(_x, _y)
          }
        })
        this.pole[_x][_y].value = 3 // TODO:
        break
      }
    }
  },
  created() {
    let _pole = []
    for (let i = 0; i < 10; i++) {
      let _line = []
      for (let j = 0; j < 10; j++) {
        _line.push({
          value: 0,
          open: false,
          g: null,
          h: null,
          f: null,
          prev: null
        })
      }
      _pole.push(_line)
    }
    this.pole = _pole
    this.readyFlag = true
  }
}
</script>

<style scoped>
.kletka {
  border: 1px solid blue;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.green {
  background-color: green;
}
</style>
