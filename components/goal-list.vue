<template>
    <section>
      <p>Click to view each goal</p>
      <ul v-if="getGoalsFromStore.length > 0">
          <li v-for="(item, index) in getGoalsFromStore" :key="item.description">
            <span v-on:click="loadGoal(index)">{{item.description}}</span>
          </li>
      </ul>
      <tableData v-bind="getTableData"></tableData>
    </section>
</template>

<script>
import tableData from '~/components/table-data'

  export default {
    data () {
      return{
        currentGoal: null
      }
    },
    components: {
      tableData
    },
    computed: {
      getGoalsFromStore: function(){
        return this.$store.state.goals
      },
      getTableData (){
        return this.currentGoal;
      }
    },
    methods: {
      loadGoal(index) {
        this.currentGoal = this.$store.state.goals[index];
      }
    }
  }
</script>
