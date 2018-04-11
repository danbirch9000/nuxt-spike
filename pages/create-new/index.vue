<template>
  <section class="container">

      <h1>Create new goal</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <form>
              <div class="form-group">
                <label for="goal-description">Goal description</label>
                <input v-model="description" type="text" class="form-control" id="goal-description" aria-describedby="goalDescription" placeholder="e.g. Pension fund">
              </div>
              <div class="form-group">
                <label for="interest-rate">Interest rate</label>
                <input v-model="rate" type="text" class="form-control" id="interest-rate" aria-describedby="interestRate">
              </div>
              <div class="form-group">
                <label for="inital-amount">Initial amount</label>
                <input v-model="amount" type="text" class="form-control" id="inital-amount" aria-describedby="initialAmount">
              </div>
              <div class="form-group">
                <label for="monthly-deposits">Monthly deposits</label>
                <input v-model="monthly" type="text" class="form-control" id="monthly-deposits" aria-describedby="monthlyDeposits">
              </div>
              <div class="form-group">
                <label for="years">Years</label>
                <input v-model="years" type="text" class="form-control" id="years" aria-describedby="years">
              </div>
              <button type="button" class="btn btn-primary" v-on:click="calculate()">Calculate</button>
              <button type="button" class="btn btn-primary" v-on:click="saveGoal()">Save goal</button>
            </form>
          </div>
          <div class="col-sm">
            <tableData v-bind="getChartConfig"></tableData>
          </div>
        </div>
      </div>

    <chart v-bind="getChartConfig" ref="charttest"></chart>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import moment from 'moment'
import goalList from '~/components/goal-list'
import tableData from '~/components/table-data'
import chart from '~/components/chart'

export default {
  components: {
    goalList,
    chart,
    tableData
  },
  data: function() {
    return {
      description: '',
      rate: 5,
      amount: 1000,
      monthly: 250,
      years: 10,
      startDate: moment(),
      chartData: null,
      savingsGoal: null
    }
  },
  middleware:['check-auth','auth'],
  computed:{
    getSavingsGoal: function(){
      return this.savingsGoal
    },
    getChartConfig: function (){
      return {
        description: this.description,
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: this.startDate,
      }
    }
  },
  methods: {

    calculate: function(){
      this.startDate = moment(),
      this.savingsGoal = utilities.getFinanceData(this.rate, this.amount, this.monthly, this.years, this.startDate);
      this.$refs.charttest.updateChart();
    },
    saveGoal: function(){
      this.$store.dispatch('saveGoal', {
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: moment().format(),
        description: this.description
      });
      this.$router.push('/goals')
    }
  }
}
</script>
