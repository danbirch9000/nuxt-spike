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

  export default {
    data: function() {
      return { }
    },
    props: ['description', 'rate', 'amount', 'monthly', 'years', 'startDate'],

    computed: {
      getSavingsGoal (){
        return utilities.getFinanceData(this.rate, this.amount, this.monthly, this.years, this.startDate);
      }
    }
  }
</script>
