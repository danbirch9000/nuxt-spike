<template>
    <section>
      <p>Click to view each goal</p>
      <ul v-if="getGoalsFromStore.length > 0">
          <li v-for="(item, index) in getGoalsFromStore" :key="item.description">
            <span v-on:click="loadGoal(index)">{{item.description}}</span>
          </li>
      </ul>
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
        this.$store.commit('setCurrentGoalView', this.currentGoal);
      }
    }
  }
</script>
