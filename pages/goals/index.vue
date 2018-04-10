<template>
  <section class="container">
    <div>
      <h1>Goals</h1>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <goalList />
            <chart v-bind="getChartConfig" ref="charttest" v-if="currentViewChartData.rate !== ''"></chart>
          </div>
          <div class="col-md">
            <nuxt-link to="/create-new">Create new goal</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import goalList from '~/components/goal-list'
import chart from '~/components/chart'
import { mapGetters } from 'vuex'

export default {
  components: {
    goalList,
    chart
  },
  middleware:['check-auth','auth'],
  computed: {
    ...mapGetters({
        currentViewChartData: 'getCurrentViewChartData'
      }),
    getChartConfig: function (){
      return {
        description: this.$store.state.goalView.description,
        rate: this.$store.state.goalView.rate,
        amount: this.$store.state.goalView.amount,
        monthly: this.$store.state.goalView.monthly,
        years: this.$store.state.goalView.years,
        startDate: this.$store.state.goalView.startDate
      }
    }

  },
  fetch ({store}) {
    store.dispatch('getData')
  },
}
</script>
