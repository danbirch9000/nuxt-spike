<template>
    <section>
      <div v-if="getGoalsFromStore.length > 0">
          <span v-for="(item, index) in getGoalsFromStore" :key="item.description">
            <button @click="loadGoal(index)" type="button" class="btn btn-primary btn-sm">{{item.description}}</button>
          </span>
      </div>
    </section>
</template>

<script>
  export default {
    data () {
      return{
        currentGoal: null
      }
    },
    computed: {
      getGoalsFromStore: function(){
        return this.$store.state.goals
      }
    },
    methods: {
      loadGoal(index) {
        this.currentGoal = this.$store.state.goals[index];
        this.$store.commit('SET_CURRENT_GOAL_VIEW', this.currentGoal);
      }
    }
  }
</script>
