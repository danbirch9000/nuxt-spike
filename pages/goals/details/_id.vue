<template>
  <section class="container">
    <GoalSummary v-if="goal" :key="goal.id" :goal-data="goal" :account-data="userAccounts" />
    <InlineButton :use-confirmation="true"
                  :action="() => deleteGoal(goal.id)"
                  text="Delete this goal"/>
  </section>
</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import { mapState } from "vuex";
import GoalDetails from "~/components/goals/GoalDetails";
import GoalSummary from "~/components/goals/GoalSummary";
import InlineButton from "~/components/InlineButton.vue";
export default {
  middleware: ["check-auth", "auth"],
  components: { GoalDetails, GoalSummary, InlineButton },
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
