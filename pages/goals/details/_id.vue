<template>
  <section class="container">
    <GoalSummary v-if="goal"
                 :key="goal.id"
                 :goal-data="goal"
                 :account-data="userAccounts" />

    <InlineButton :use-confirmation="true"
                  :action="() => deleteGoal(goal.id)"
                  text="Delete this goal"/>
    <div class="ss-panel">
      <GoalTableView v-if="goalBreakdown" :goal-data="goalBreakdown"/>
    </div>

  </section>
</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import { mapState } from "vuex";
import GoalDetails from "~/components/goals/GoalDetails";
import GoalSummary from "~/components/goals/GoalSummary";
import InlineButton from "~/components/InlineButton";
import GoalTableView from "~/components/goals/GoalTableView";
import { getFinanceData } from "~/common/utilities.js";

export default {
  middleware: ["check-auth", "auth"],
  components: { GoalDetails, GoalSummary, InlineButton, GoalTableView },
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
    },
    goalBreakdown() {
      if (!this.goal) {
        return null;
      }
      return getFinanceData(
        this.goal.rate,
        this.goal.amount,
        this.goal.monthly,
        this.goal.years,
        this.goal.startDate
      );
    }
  },
  beforeMount() {
    if (!this.userGoals.data) {
      this.$store.dispatch("GET_USER_GOALS");
    }
    if (!this.userAccounts.data) {
      this.$store.dispatch("GET_USER_ACCOUNTS");
    }
  },
  methods: {
    deleteGoal(id) {
      this.$store.dispatch("DELETE_GOAL", { id }).then(() => {
        this.$router.push("/goals");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
