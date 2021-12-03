<template>
  <!-- Main content -->
  <section class="content">
    <div class="row">

      <!-- /.col -->
      <div class="col-md-6 col-sm-12 col-xs-12">
        <info-box color-class="bg-yellow"
                  :icon-classes="['ion', 'ion-ios-people-outline']"
                  text="Patients "
                  :number="patients_number"></info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Registrations per Month Overview</strong>
              </p>
              <canvas id="trafficBar"></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Registrations by Age</strong>
              </p>
              <canvas id="ageBar"></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Gender Overview</strong>
              </p>
              <canvas id="languagePie"></canvas>
            </div>
          </div>
        </div>
        <div class="text-center">

        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data() {
    return {
      patients_number: '0',
      generateRandomNumbers(numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  computed: {
    coPilotNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile() {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    },
    ...mapGetters({
      user: 'user'
    })
  },
  mounted() {
    this.$nextTick(() => {
      console.log(window.localStorage.getItem('user'))
      axios.get('http://localhost:5000/api/data/get/pushed')
        .then(res => {
          this.patients_number = res.data.patients
          // eslint-disable-next-line camelcase
          let labels_reg = []
          // eslint-disable-next-line camelcase
          let count_reg = []

          res.data.patients_reg.forEach(e => {
            labels_reg.push(`${e.year} - ${e.month}`)
            count_reg.push(e.count)
          })
          var ctx = document.getElementById('trafficBar').getContext('2d')
          var config = {
            type: 'line',
            data: {
              labels: labels_reg,
              datasets: [{
                label: 'Registrations',
                fill: false,
                borderColor: '#284184',
                pointBackgroundColor: '#284184',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: count_reg
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: !this.isMobile,
              legend: {
                position: 'bottom',
                display: true
              },
              tooltips: {
                mode: 'label',
                xPadding: 10,
                yPadding: 10,
                bodySpacing: 10
              }
            }
          }

          new Chart(ctx, config) // eslint-disable-line no-new

          // eslint-disable-next-line camelcase
          let labels_age = []
          // eslint-disable-next-line camelcase
          let count_age = []

          res.data.patients_age.forEach(e => {
            labels_age.push(`${e.age}`)
            count_age.push(e.count)
          })
          // eslint-disable-next-line camelcase
          var ctx_age = document.getElementById('ageBar').getContext('2d')
          // eslint-disable-next-line camelcase
          var config_age = {
            type: 'bar',
            data: {
              labels: labels_age,
              datasets: [{
                label: 'Registrations',
                data: count_age,
                backgroundColor: 'rgba(225,168,54,0.2)'
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              responsive: true,
              maintainAspectRatio: !this.isMobile,
              legend: {
                position: 'bottom',
                display: true
              },
              tooltips: {
                mode: 'label',
                xPadding: 10,
                yPadding: 10,
                bodySpacing: 10
              }
            }
          }
          new Chart(ctx_age, config_age) // eslint-disable-line no-new

          let label = []
          let data = []
          // gender chart

          res.data.patients_gender.forEach(e => {
            label.push(e.gender)
            data.push(e.count)
          })
          var pieChartCanvas = document.getElementById('languagePie').getContext('2d')
          var pieConfig = {
            type: 'pie',
            data: {
              labels: label,
              datasets: [{
                data: data,
                backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
                hoverBackgroundColor: ['#147e4d', '#ab6e0d', '#00c0ef']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: !this.isMobile,
              legend: {
                position: 'bottom',
                display: true
              }
            }
          }
          new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
        })
    })
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}

.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}

.fullCanvas {
  width: 100%;
}
</style>
