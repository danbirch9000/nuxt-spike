<template>
  <section class="container">
    <div>
      <h1>nuxt-spike</h1>
      <nuxt-link to="/parcel-actions/1">Parcel Actions</nuxt-link>

      <p>Rate: <input type="text" v-model="rate"/></p>
      <p>Init amount: <input type="text" v-model="amount"/></p>
      <p>monthly amount: <input type="text" v-model="monthly"/></p>
      <p>Years: <input type="text" v-model="years"/></p>

      <ul id="example-1" v-if="getFinanceData().length > 0">
        <li v-for="item in getFinanceData()" :key="item.value">
          &pound;{{ item.value }} - {{ item.year }} - &pound;{{ item.interest }}
        </li>
      </ul>
      {{getTodaysDate()}}
      <button v-on:click="saveGoal()">Save</button>
    </div>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import moment from 'moment'
/*

https://www.highcharts.com/demo/spline-irregular-time

{
        name: 'Winter 2012-2013',
        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        data: [
            [1522005771, 0],  25315200000
            [Date.UTC(1970, 10, 4), 0.28],
            [Date.UTC(1970, 10, 9), 0.25],
            [Date.UTC(1970, 10, 27), 0.2]
        ]
    }

*/

export default {

  data: function() {
    return {
      rate: 8,
      amount: 17000,
      monthly: 800,
      years: 10
    }
  },
  methods: {

    getTodaysDate: function() {
      return moment().unix();
    },

    getFinanceData: function() {

      if (this.rate == '' || this.amount == '' || this.monthly == '' || this.years == ''){
        return [];
      }
      var monthly = parseFloat(this.monthly);
      var amount = parseFloat(this.amount);
      var rate = parseFloat(this.rate);
      var years = parseFloat(this.years);
    
      return utilities.calculateSavings(amount, years, monthly, rate, moment().year());
    },
    saveGoal: function(){
    
      this.$store.dispatch('saveGoal', {
      rate: this.rate,
      amount: this.amount,
      monthly: this.monthly,
      years: this.years
    })
    }

  }
}
</script>

<style>

</style>
