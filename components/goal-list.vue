<template>
    <section>
      <div v-if="getGoalsFromStore.length > 0">
          <span v-for="(item, index) in getGoalsFromStore" :key="item.description">
            <button @click="loadGoal(index)" 
            type="button" 
            :class="{'active': item.description === goalView.description}"
            class="btn btn-primary btn-sm">{{item.description}}</button>
          </span>
      </div>
    </section>
</template>

<script>
import {mapState} from "vuex";

  export default {
    data () {
      return{
        currentGoal: null
      }
    },
    computed: {
      ...mapState({
        goalView: state => state.goalModule.goalView
      }),
      getGoalsFromStore: function(){
        return this.$store.state.goalModule.goals
      }
    },
    methods: {
      loadGoal(index) {
        this.currentGoal = this.$store.state.goalModule.goals[index];
        this.$store.commit('SET_CURRENT_GOAL_VIEW', this.currentGoal);
      }
    }
  }
</script>
