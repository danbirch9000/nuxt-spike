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
    computed: {
      getGoalsFromStore: function(){
        return this.$store.state.goals
      }
    },
    methods: {
      loadGoal(index) {
        console.log('loading goal');
        console.log(this.$store.state.goals[index]);
      }
    }
  }
</script>
