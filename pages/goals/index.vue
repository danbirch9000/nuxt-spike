<template>
  <div>
    <h1 class="page-header">Your goals</h1>
    <section class="container">
      <InlineButton :action="() => createNew()"
                    text="New goal"/>
      <div v-if="userGoals.data && userGoals.data.length" class="goals-grid">
        <template v-for="goal in userGoals.data" >
          <GoalSummary :key="goal.id" :goal-data="goal" :account-data="userAccounts" />
        </template>
      </div>
    </section>
  </div>

</template>

<script>
import { mapGetters, mapState } from "vuex";
import pageMixin from "~/mixins/pageMixin";
import GoalSummary from "~/components/goals/GoalSummary";
import InlineButton from "~/components/InlineButton";

export default {
  components: { GoalSummary, InlineButton },
  mixins: [pageMixin],
  middleware: ["check-auth", "auth"], // check-auth calls INIT_AUTH to make sure the user is authenticated
  data() {
    return {
      showAccountChooser: false,
      goalChartData: null
    };
  },
  computed: {
    ...mapState({
      userGoals: state => state.goalModule.userGoals,
      userAccounts: state => state.accountModule.userAccounts
    }),
    ...mapGetters({})
  },
  watch: {},
  beforeMount() {
    if (!this.userGoals.data) {
      this.$store.dispatch("GET_USER_GOALS");
    }
    if (!this.userAccounts.data) {
      this.$store.dispatch("GET_USER_ACCOUNTS");
    }
  },
  mounted() {},
  methods: {
    createNew() {
      this.$router.push("/goals/create");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";

.goals-grid {
  margin: 10px 0;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  @include desktop {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
