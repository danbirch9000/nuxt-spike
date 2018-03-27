<template>
  <section class="container">
    <div>
      <h1>Goals</h1>

      <goalList />


<div class="container">
  <h2>Create new goal</h2>
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

    <highcharts :options="options" ref="highcharts"></highcharts>

  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import moment from 'moment'
import goalList from '~/components/goal-list'

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Your goals'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
    },
    title: {
        text: 'Date'
    }
  },
  yAxis: {
    title: {
        text: 'Value'
    },
    min: 0
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b}: £{point.y:.2f}'
  },

  plotOptions: {
    spline: {
      marker: {
          enabled: true
      }
    }
  },
  series: [
    {
      name: 'Your goal ',
      data: []
  }]
  }

export default {
  components: {
    goalList
  },
  data: function() {
    return {
      description: '',
      rate: 5,
      amount: 1000,
      monthly: 250,
      years: 10,
      startDate: null,
      options: options, 
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
    }
  },
  methods: {
    updateChart(){
      console.log(process.env.NODE_ENV);
      if (this.$refs.highcharts !== undefined){
        var chart = this.$refs.highcharts.chart;
        chart.series[0].setData(this.chartData);
        chart.redraw();
      }
    },
    calculate: function(){
      this.startDate = moment(),
      this.savingsGoal = this.getFinanceData();
      this.chartData = this.buildChartData(this.savingsGoal);
      this.updateChart();
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
    })
    },
    buildChartData(data){
      var chartData = [];
      for (var i = 0; i < data.length; i++) {
        chartData.push([data[i].utc, data[i].value]);
      }
      return chartData;
    }

  }
}
</script>

<style>

</style>
