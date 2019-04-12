<template>
  <section class="container">
    <GoalDetails v-if="goal" :key="goal.id" :goal-data="goal" />
  </section>
</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import { mapState } from "vuex";
import GoalDetails from "~/components/accounts/GoalDetails";

export default {
  middleware: ["check-auth", "auth"],
  components: { GoalDetails },
  mixins: [pageMixin],
  computed: {
    ...mapState({
      userGoals: state => state.goalModule.userGoals
    }),
    goal() {
      if (!this.userGoals.data) {
        return null;
      }
      return this.userGoals.data.find(o => o.id === this.$route.params.id);
    }
  },
  beforeMount() {
    if (!this.userGoals.data) {
      this.$store.dispatch("GET_USER_GOALS");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
