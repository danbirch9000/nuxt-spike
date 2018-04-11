<template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <table class="table" v-if="getSavingsGoal !== null">
              <thead>
                <tr>
                  <th scope="col">Value</th>
                  <th scope="col">Date</th>
                  <th scope="col">Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in getSavingsGoal" :key="item.value">
                  <td>&pound;{{ item.value }}</td>
                  <td>{{ item.date }}</td>
                  <td>&pound;{{ item.interest }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </section>
</template>

<script>
import utilities from '~/common/utilities.js'
import moment from 'moment'
import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        currentViewChartData: 'getCurrentViewChartData'
      }),
      getSavingsGoal (){
        return utilities.getFinanceData(this.currentViewChartData.rate, this.currentViewChartData.amount, this.currentViewChartData.monthly, this.currentViewChartData.years, this.currentViewChartData.startDate);
      }
    }
  }
</script>
