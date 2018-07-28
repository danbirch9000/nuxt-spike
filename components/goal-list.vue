<template>
  <section>
    <div v-if="getGoalsFromStore.length > 0">
      <select v-model="selected">
        <option v-for="(item, index) in getGoalsFromStore" :value="index" :key="item.description">{{ item.description }}</option>
      </select>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentGoal: null,
      selected: 0
    };
  },
  computed: {
    ...mapState({
      goalView: state => state.goalModule.goalView
    }),
    getGoalsFromStore: function() {
      return this.$store.state.goalModule.goals;
    }
  },
  watch: {
    selected() {
      console.log("selected", this.selected);
      this.selectGoal();
    }
  },
  methods: {
    loadGoal(index) {
      console.log(index);
      this.currentGoal = this.$store.state.goalModule.goals[index];
      this.$store.commit("SET_CURRENT_GOAL_VIEW", this.currentGoal);
    },
    selectGoal() {
      this.loadGoal(this.selected);
    }
  }
};
</script>
