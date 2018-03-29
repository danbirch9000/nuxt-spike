<template>
    <section>
      <ul id="example-1" v-if="getSavingsGoal !== null">
        <li v-for="item in getSavingsGoal" :key="item.value">
          &pound;{{ item.value }} - {{ item.date }} - &pound;{{ item.interest }}
        </li>
      </ul>
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
