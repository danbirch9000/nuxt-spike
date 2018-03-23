<template>
  <section class="container">
    <div>
      <h1>nuxt-spike</h1>
      <nuxt-link to="/parcel-actions/1">Parcel Actions</nuxt-link>
      <p>test {{log('this is my message')}} {{getTodaysDate()}}</p>
      <p>Finance example: {{test1()}}</p>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import utilities from '~/common/utilities.js'
import moment from 'moment'
const Finance = require('financejs')

export default {
  components: {
    Logo
  },
  methods: {
    log: utilities.writeToPage,
    getTodaysDate: function() {
      return moment().format();
    },
    test1: function() {
      console.log(this.calculateSavings(1000, 12));
      return this.calculateSavings(1000, 12);
    },
    calculateSavings(initialAmount, years){
      var finance = new Finance();
      var amount = initialAmount;
      var data = [];
      for (var index = 0; index < years; index++) {
        var x = this.getCiforPeriod(amount, index);
        data.push(x);
        var interest = x.value - amount;
        amount = amount + interest;
      }
      return data;
    },
    getCiforPeriod: function(amount, index){
      var finance = new Finance();
      var value = finance.CI(10, 365, amount, 1);
      return { value: value, year: index + 1, interest: value - amount }
    }
  }
}
</script>

<style>

</style>
