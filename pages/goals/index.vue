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
              Starting from {{transformDate(currentGoal.startDate)}} with £{{currentGoal.amount}}</p>
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
import tweaker from '~/components/tweaker'
import chart from '~/components/chart'
import tableData from '~/components/table-data'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { mapState } from "vuex";

export default {
  computed: mapState({
    currentGoal: state => state.goalModule.goalView
  }),
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
    }
  },
  created(){
    this.$store.dispatch('GET_USER_GOALS');
  },
  components: {
    goalList,
    chart,
    tableData,
    tweaker
  },
  middleware:['check-auth','auth']
}
</script>
