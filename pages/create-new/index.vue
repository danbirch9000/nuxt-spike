<template>
  <section class="container">
    <div>
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
            <ul id="example-1" v-if="getSavingsGoal !== null">
              <li v-for="item in getSavingsGoal" :key="item.value">
                &pound;{{ item.value }} - {{ item.date }} - &pound;{{ item.interest }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <chart v-bind="getChartConfig"></chart>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import moment from 'moment'
import goalList from '~/components/goal-list'
import chart from '~/components/chart'

export default {
  components: {
    goalList,
    chart
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
  computed:{
    getSavingsGoal: function(){
      return this.savingsGoal
    },
    getChartData: function(){
      return this.chartData
    },
    getGoalsFromStore: function(){
      return this.$store.state.goals
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
      this.savingsGoal = this.getFinanceData();
    },
    getFinanceData: function() {
      if (this.rate == '' || this.amount == '' || this.monthly == '' || this.years == ''){
        return [];
      }
      var monthly = parseFloat(this.monthly);
      var amount = parseFloat(this.amount);
      var rate = parseFloat(this.rate);
      var years = parseFloat(this.years);
      var savingsObject = utilities.calculateSavings(amount, years, monthly, rate, this.startDate);
      return savingsObject;
    },
    saveGoal: function(){
      this.$store.dispatch('saveGoal', {
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: moment(),
        description: this.description
      });
      this.$router.push('/goals')
    }

  }
}
</script>
