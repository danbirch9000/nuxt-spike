<template>
  <section class="container">
    <GoalSummary v-if="goal" :key="goal.id" :goal-data="goal" :account-data="userAccounts" />
  </section>
</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import { mapState } from "vuex";
import GoalDetails from "~/components/goals/GoalDetails";
import GoalSummary from "~/components/goals/GoalSummary";

export default {
  middleware: ["check-auth", "auth"],
  components: { GoalDetails, GoalSummary },
  mixins: [pageMixin],
  computed: {
    ...mapState({
      userGoals: state => state.goalModule.userGoals,
      userAccounts: state => state.accountModule.userAccounts
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
