<template>
  <section class="container">
    <div>
      <h1>Goals</h1>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <nuxt-link tag="button" to="/create-new" class="btn btn-primary btn-lg btn-block">Create new goal</nuxt-link>
            <goalList />
            <div v-if="currentGoal.description !== ''">
              <h2>{{currentGoal.description}}</h2>
              <p>Save £{{currentGoal.monthly}} per month for {{currentGoal.years}} years at {{currentGoal.rate}}%.
              Starting from {{transformDate(currentGoal.startDate)}} with {{currentGoal.amount | currency}}</p>
              <p>Estimated value after {{getMonthsGoalActive()}} months: {{getEstimatedSavingsForMonths(getMonthsGoalActive()).value | currency}}</p>
              <p>Actual value: {{getActualValue() | currency}} - {{percentageDifference() | percentage}}</p>

              <button v-if="accounts.length > 0" class="btn btn-primary btn-sm" @click="showAccountChooser =! showAccountChooser">Link to your accounts</button>

              <accountChooser  v-if="showAccountChooser"/>





            <chart />
            <tweaker />
            <button @click="deleteGoal()" class="btn btn-primary btn-sm">Delete</button>
            <button @click="saveGoal()" class="btn btn-primary btn-sm">Save</button>
            <tableData />
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import goalList from '~/components/goal-list'
import accountChooser from '~/components/account-chooser'
import tweaker from '~/components/tweaker'
import chart from '~/components/chart'
import tableData from '~/components/table-data'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { mapState } from "vuex";

export default {
  data() {
    return {
      showAccountChooser: false
    }
  },
  computed: {
    ...mapState({
    currentGoal: state => state.goalModule.goalView,
    accounts: state => state.accountModule.accounts
  }),
  ...mapGetters({
    valueOfGoal: 'GET_VALUE_OF_GOAL'
  })
  },
  methods:{
    transformDate(date){
      return moment(date).format('MMM YYYY');
    },
    deleteGoal(){
      this.$store.dispatch('DELETE_GOAL');
      this.$router.push({ name: 'goals' });
    },
    saveGoal(){
      this.$store.dispatch('UPDATE_GOAL');
    },
    getEstimatedSavingsForMonths(months){
      return utilities.getCiForMonths(parseInt(this.currentGoal.amount), months, parseInt(this.currentGoal.monthly), parseInt(this.currentGoal.rate));
    },
    getMonthsGoalActive() {
      var months = moment().diff(moment(this.currentGoal.startDate), 'months', true);
      return Math.floor(months);
    },
    getActualValue() {

      return this.valueOfGoal;
    },
    percentageDifference(){
      var estimatedValue = this.getEstimatedSavingsForMonths(this.getMonthsGoalActive()).value;
      var increase = this.getActualValue() - estimatedValue;

      return (increase/estimatedValue)*100;

    }
  },
  created(){
    this.$store.dispatch('GET_USER_GOALS');
    this.$store.dispatch('GET_USER_ACCOUNTS');
  },
  components: {
    goalList,
    chart,
    tableData,
    tweaker,
    accountChooser
  },
  middleware:['check-auth','auth']
}
</script>
