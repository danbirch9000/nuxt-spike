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

    </div>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'


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
      return '';
      // return moment().format();
    },

    getFinanceData: function() {

      if (this.rate == '' || this.amount == '' || this.monthly == '' || this.years == ''){
        return [];
      }
      var monthly = parseFloat(this.monthly);
      var amount = parseFloat(this.amount);
      var rate = parseFloat(this.rate);
      var years = parseFloat(this.years);
    
      return utilities.calculateSavings(amount, years, monthly, rate);
    }
  }
}
</script>

<style>

</style>
