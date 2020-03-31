<template>
  <table v-if="pole.readyFlag">
    <body>
      <tr v-for="(line, index) in pole.pole" :key="index" class="table">
        <td
          v-for="(elem, i) in line"
          :key="i" class="kletka"
          @click="user.isReg && pole.fixPoint(index, i)"
          :class="{ 
            green: elem.color==='green', 
            red: elem.color==='red', 
            blue: elem.color==='blue',
            black: elem.color==='black',
            orangeBorders: elem.color==='orange-borders',
            darkOrangeBorders: elem.color==='dark-orange-borders',
            darkBlueBorders: elem.color==='dark-blue-borders',
            pointer: user.isReg && (pole.startMode || pole.finishMode || pole.prepMode)
          }"
          :style="!elem.prep && elem.color!=='green' && elem.color!=='red' && algor.calculateReady &&
            ((algor.selectedAlg==='poten' &&
              ((!elem.resPrep && `background: rgba(0,0,168,${elem.finPrep / poten.maxFinPrep});`) ||   
              (elem.resPrep && `background: rgba(255,255,0,${elem.resPrep / poten.maxPotPrep});`)))
            || (algor.selectedAlg==='deik' && (elem.d!==(10*pole.dimX*pole.dimY) && `background: rgba(255,255,0,${elem.d / deikAstar.maxDeikWeight});`))
            || (algor.selectedAlg==='astar' && (elem.dhS!==(2*10*pole.dimX*pole.dimY) && 
              `background: rgba(128,255,0,${(elem.dhS-deikAstar.minAstarWeight) / (deikAstar.maxAstarWeight-deikAstar.minAstarWeight)});`)))"
          >
            <template v-if="algor.selectedAlg==='voln'&&elem.d!==-1">{{ elem.d }}</template>
            <template v-if="algor.selectedAlg==='deik'&&elem.d!==-1&&elem.d!==(10*pole.dimX*pole.dimY)">{{ elem.d }}</template>
            <template v-if="algor.selectedAlg==='astar'&&elem.dhS!==-1&&elem.dhS!==(2*10*pole.dimX*pole.dimY)">{{ elem.dhS }}</template>
        </td>
      </tr>
    </body>
  </table>
</template>

<style scoped>
.table {
  border: 1px solid black;
  border-radius: 1px;
}
.kletka {
  border: 1px solid blue;
  width: 50px;
  height: 50px;
}
.orangeBorders {
  border: 2px solid orange;
}
.darkOrangeBorders {
  border: 4px solid darkorange;
}
.darkBlueBorders {
  border: 4px solid darkmagenta;
  color: blue;
}
</style>