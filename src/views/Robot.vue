<template>
  <div class="lune">

    <div v-if="!connect.isConnected">
      <v-btn @click.prevent="connect.connectToBlut" class="ma-2" outlined color="success">
        Connect
        <v-icon>bluetooth_connected</v-icon>
      </v-btn>
    </div>

    <div v-else class="container">
      <div class="row">

        <div class="col-sm-2">
          <v-btn @click.prevent="connect.disconnectBlut" class="ma-2" outlined color="success">
            Disonnect
            <v-icon>bluetooth_disabled</v-icon>
          </v-btn>
          <v-container fluid>
            <v-switch v-model="led.light" @change="led.changeLight()" class="ma-4" label="Свет" color="orange darken-3" :dark='true'></v-switch>
            <v-radio-group v-model="motors.rotation" :dark='true' @change="motors.calculatePwr()">
              <v-radio value="normal" label="Равномерный поворот" color="blue"></v-radio>
              <v-radio value="faster" label="Поворот с забеганием" color="blue"
                  :disabled="!motors.isMoving.up&&!motors.isMoving.down&&(motors.isMoving.left||motors.isMoving.right)"></v-radio>
              <v-radio value="slower" label="Поворот с запаздыванием" color="blue"
                  :disabled="!motors.isMoving.up&&!motors.isMoving.down&&(motors.isMoving.left||motors.isMoving.right)"></v-radio>
            </v-radio-group>
          </v-container>
        </div>

        <div class="col-sm-8">
          <div class="row">

            <div class="col-sm-8">
              <v-card class="mx-auto" max-width="600" max-height="120" :dark=true>
                <v-toolbar flat dense>
                  <v-toolbar-title>
                    <span><v-icon>fitness_center</v-icon></span>
                    <span class="subheading mr-left-sm">Мощность: {{ motors.power }}%</span>
                  </v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-slider v-model="motors.power" track-color="grey" min="0" max="100" thumb-color="blue" thumb-label :thumb-size="24"
                      @change="motors.calculatePwr()">
                    <template v-slot:prepend>
                      <v-icon @click="motors.power -= 1" color="red">mdi-minus</v-icon>
                    </template>
                    <template v-slot:append>
                      <v-icon @click="motors.power += 1" color="green">mdi-plus</v-icon>
                    </template>
                  </v-slider>
                </v-card-text>
              </v-card>
              <v-card-text>
                <v-slider :dark=true v-model="motors.turn" track-color="grey" label="Коэффициент поворота (х10)" min="0" max="10"
                    thumb-color="blue" thumb-label :thumb-size="24" @change="motors.calculatePwr()">
                </v-slider>
              </v-card-text>
            </div>

            <div class="col-sm-4 text-white">
              <v-toolbar-items>
                <v-btn text :dark=true @click="{ showOnRobot = false }" class="nav-border"
                    :class="{ 'active-nav-border': !showOnRobot }">На управлении</v-btn>
                <v-btn text :dark=true @click="{ showOnRobot = true }" class="nav-border"
                    :class="{ 'active-nav-border': showOnRobot }">На роботе</v-btn>
              </v-toolbar-items>

              <v-card-text v-if="!showOnRobot">
                <v-slider :dark=true v-model="motors.leftPower" track-color="grey" label="Left" :readonly=true min="-100" max="100" :rules="rules">
                  <template v-slot:append>
                    <v-icon v-if="motors.leftPower>=0" class="subheading">arrow_upward</v-icon>
                    <v-icon v-else class="subheading text-red">arrow_downward</v-icon>
                    <span class="subheading"> {{ Math.abs(motors.leftPower) }}%</span>
                  </template>
                </v-slider>
                <v-slider :dark=true v-model="motors.rightPower" track-color="grey" label="Right" :readonly=true min="-100" max="100" :rules="rules">
                  <template v-slot:append>
                    <v-icon v-if="motors.rightPower>=0" class="subheading">arrow_upward</v-icon>
                    <v-icon v-else class="subheading text-red">arrow_downward</v-icon>
                    <span class="subheading"> {{ Math.abs(motors.rightPower) }}%</span>
                  </template>
                </v-slider>
              </v-card-text>

              <v-card-text v-else>
                <v-slider :dark=true v-model="motors.robotLeftPower" track-color="grey" label="Left" :readonly=true min="-100" max="100" :rules="rules">
                  <template v-slot:append>
                    <v-icon v-if="motors.robotLeftPower>=0" class="subheading">arrow_upward</v-icon>
                    <v-icon v-else class="subheading text-red">arrow_downward</v-icon>
                    <span class="subheading"> {{ Math.abs(motors.robotLeftPower) }}%</span>
                  </template>
                </v-slider>
                <v-slider :dark=true v-model="motors.robotRightPower" track-color="grey" label="Right" :readonly=true min="-100" max="100" :rules="rules">
                  <template v-slot:append>
                    <v-icon v-if="motors.robotRightPower>=0" class="subheading">arrow_upward</v-icon>
                    <v-icon v-else class="subheading text-red">arrow_downward</v-icon>
                    <span class="subheading"> {{ Math.abs(motors.robotRightPower) }}%</span>
                  </template>
                </v-slider>
              </v-card-text>
            </div>

          </div>

            <v-card class="d-flex justify-center mb-6 bg-inherit hotfix" flat tile>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile>
                <v-btn :outlined="!motors.isMoving.up" color="indigo" fab x-large dark
                    :ripple="{ class: 'red--text' }" @click="motors.moveUp()">
                  <v-icon>arrow_upward</v-icon>
                </v-btn>
              </v-card>
            </v-card>

            <v-card class="d-flex justify-space-around mb-6 bg-inherit hotfix" flat tile>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile></v-card>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile>
                <v-btn :outlined="!motors.isMoving.left" color="indigo" fab x-large dark
                    :ripple="{ class: 'red--text' }" @click="motors.moveLeft()">
                  <v-icon v-if="motors.isMoving.up || motors.isMoving.down">arrow_back</v-icon>
                  <v-icon v-else>rotate_left</v-icon>
                </v-btn>
              </v-card>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile>
                <v-btn :outlined="motors.isMoving.down||motors.isMoving.up||motors.isMoving.left||motors.isMoving.right"
                    color="error" fab x-large dark :ripple="{ class: 'red--text' }" @click="motors.stop()">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-card>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile>
                <v-btn :outlined="!motors.isMoving.right" color="indigo" fab x-large dark
                    :ripple="{ class: 'red--text' }" @click="motors.moveRight()">
                  <v-icon v-if="motors.isMoving.up || motors.isMoving.down">arrow_forward</v-icon>
                  <v-icon v-else>rotate_right</v-icon>
                </v-btn>
              </v-card>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile></v-card>
            </v-card>

            <v-card class="d-flex justify-center mb-6 bg-inherit hotfix" flat tile>
              <v-card class="pa-2 bg-inherit hotfix" outlined tile>
                <v-btn :outlined="!motors.isMoving.down" color="indigo" fab x-large dark
                    :ripple="{ class: 'red--text' }" @click="motors.moveDown()">
                  <v-icon>arrow_downward</v-icon>
                </v-btn>
              </v-card>
            </v-card>
        </div>

        <div class="col-sm-2">
          <b-spinner v-show="connect.isSending" variant="primary" label="Spinning"></b-spinner>
          <div class="mr-up">
            <v-radio-group v-model="connect.delay" :dark=true label="Задержка">
              <v-radio :value='0' label="нет" color="blue"></v-radio>
              <v-radio :value='1' label="1 секунда" color="blue"></v-radio>
              <v-radio :value='3' label="3 секунды" color="blue"></v-radio>
              <v-radio :value='5' label="5 секунд" color="blue"></v-radio>
            </v-radio-group>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'robot',
  data () {
    return {
      rules: [
        // eslint-disable-next-line
        v => v >= 0 || ""
      ],
      showOnRobot: false
    }
  },
  created () {
    this.connect.checkBrowser()
  }
}
</script>

<style scoped>
.hotfix {
  background-color: initial!important;
}
.nav-border {
  border-radius: 2px;
}
.active-nav-border {
  border: 1px solid #3f51b5;
}
.bg-inherit {
  background-color: inherit;
}
.btn-control {
  color: white;
}
.btn-horiz {
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  height: 80px;
  width: 80px;
}
.text-red {
  color: #ff5252!important;
}
.text-white {
  color: rgba(255, 255, 255, 0.7)!important;
}
.mr-left-sm {
  margin-left: 20px;
}
.mr-up {
  margin-top: 100px;
  background-color: darkslateblue;
  opacity: 0.8;
  padding: 10px;
  padding-top: 10px;
  padding-bottom: 0;
  border-radius: 10px;
}
.range {
  max-width: 500px;
  margin: 0 auto;
}
.inl-b {
  display: inline-block;
}
.horiz-bnt-contr {
  min-width: 180px;
}
</style>
