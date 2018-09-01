<template>
  <section class="container">
    <h1>Goals</h1>
    <div v-if="pageReady">
      <Message v-if="!userHasGoals" type="info">Lets get started, use the link below to create a goal</Message>
      <div class="goal-layout">
        <div class="toolbar panel">
          <GoalList />
          <nuxt-link tag="button" to="/create-new" class="btn btn-primary btn-lg btn-block">Create new goal</nuxt-link>
          <button v-if="accounts.length > 0" class="btn btn-primary btn-sm" @click="showAccountChooser =! showAccountChooser">Manage linked accounts</button>
          <AccountChooser v-if="showAccountChooser"/>
          <button v-if="goalView" class="btn btn-primary btn-sm" @click="deleteGoal()">Delete goal</button>
        </div>

        <div v-if="userHasGoals">
          <div class="panel">
            <div class="goal-detail">
              <h2>{{ goalView.description }}</h2>
              <div><span class="standout-lg">{{ goalTarget.value | currency }}</span> by {{ goalTarget.date }}</div>
              <div>Start <span class="standout">{{ goalView.startDate | monthAndYear }}</span> with <span class="standout">{{ goalView.amount | currency }}</span>, save <span class="standout">{{ goalView.monthly | currency }}</span> per month for
              <span class="standout">{{ goalView.years | year }}</span> years at <span class="standout">{{ goalView.rate }}%</span></div>
              <div v-if="userHasAccounts">
                <div>Estimated value today after {{ getMonthsGoalActive() }} months: <span class="standout-lg">{{ getEstimatedSavingsForMonths(getMonthsGoalActive()).value | currency }}</span></div>
                <div>Actual value: <span class="standout-lg">{{ getActualValue() | currency }}</span> {{ percentageDifference() | percentage }}</div>
              </div>

            </div>
            <ChartMain :main-chart-data="mainChartData" />
          </div>
          <div class="panel">
            <TableData />
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<script>
import utilities from "~/common/utilities.js";
import GoalList from "~/components/GoalList";
import AccountChooser from "~/components/AccountChooser";
import Tweaker from "~/components/Tweaker";
import ChartCompact from "~/components/ChartCompact";
import TableData from "~/components/TableData";
import moment from "moment";
import { mapGetters, mapState } from "vuex";
import ChartMain from "~/components/ChartMain";
import Message from "~/components/Message";
import pageMixin from "~/mixins/pageMixin";

export default {
  components: {
    GoalList,
    TableData,
    Tweaker,
    AccountChooser,
    ChartCompact,
    ChartMain,
    Message
  },
  mixins: [pageMixin],
  data() {
    return {
      showAccountChooser: false,
      goalChartData: null
    };
  },
  computed: {
    ...mapState({
      goalsLoaded: state => state.goalModule.loaded,
      goalView: state => state.goalModule.goalView,
      accounts: state => state.accountModule.accounts,
      accountsLoaded: state => state.accountModule.loaded
    }),
    ...mapGetters({
      valueOfGoal: "GET_VALUE_OF_GOAL",
      goalTarget: "GET_GOAL_TARGET",
      masterChartData: "GET_CHART_DATA",
      currentViewChartData: "GET_CHART_DATA_CURRENT_VIEW"
    }),
    pageReady() {
      return this.accountsLoaded && this.goalsLoaded;
    },
    userHasGoals() {
      return this.goalView && this.goalView.description !== "";
    },
    userHasAccounts() {
      return this.accounts.length > 0;
    },
    mainChartData() {
      return this.goalChartData;
    }
  },
  watch: {
    pageReady() {
      if (this.pageReady) {
        this.getAccountsForGoal();
      }
    },
    goalView: {
      handler() {
        if (this.pageReady) {
          this.getAccountsForGoal();
        }
      },
      deep: true
    }
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  mounted() {
    this.$store.dispatch("GET_USER_ACCOUNTS").then(() => {
      this.$store.dispatch("GET_USER_GOALS");
    });
  },
  methods: {
    getAccountsForGoal() {
      let accounts = [];
      if (this.userHasAccounts) {
        let goalView = JSON.parse(JSON.stringify(this.goalView));
        let userAccounts = JSON.parse(JSON.stringify(this.accounts));
        if (goalView.accounts) {
          goalView.accounts.forEach(element => {
            let accountsForGoal = userAccounts.filter(el => {
              return el.id === element;
            });
            if (accountsForGoal) {
              accountsForGoal = accountsForGoal[0];

              let temp = [];
              for (const key in accountsForGoal.history) {
                let momentDate = moment(accountsForGoal.history[key].date);

                temp.push([
                  momentDate.utc().valueOf(),
                  Number(accountsForGoal.history[key].value)
                ]);
              }

              accounts.push({
                name: accountsForGoal.name,
                account: temp
              });
            }
          });
        }

        const total = utilities.addAccounts(accounts);
        let totalChart = [{ name: total.name, account: total.chart }];
        this.goalChartData = [
          ...accounts,
          ...this.getGoalChartData(),
          ...totalChart
        ];
      } else {
        this.goalChartData = [...this.getGoalChartData()];
      }
    },
    getGoalChartData() {
      if (this.currentViewChartData === null) {
        return [];
      }
      let data = utilities.getFinanceData(
        0,
        this.currentViewChartData.amount,
        this.currentViewChartData.monthly,
        this.currentViewChartData.years,
        this.currentViewChartData.startDate
      );
      let chartData = utilities.buildChartData(data);
      return [
        { name: "Your goal", account: this.masterChartData },
        { name: "0% goal", account: chartData }
      ];
    },
    deleteGoal() {
      this.$dialog
        .confirm("Delete this goal?")
        .then(() => {
          this.$store.dispatch("DELETE_GOAL");
          this.$router.push({ name: "goals" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveGoal() {
      this.$store.dispatch("UPDATE_GOAL");
    },
    getEstimatedSavingsForMonths(months) {
      return utilities.getCiForMonths(
        parseInt(this.goalView.amount),
        months,
        parseInt(this.goalView.monthly),
        parseInt(this.goalView.rate)
      );
    },
    getMonthsGoalActive() {
      var months = moment().diff(
        moment(this.goalView.startDate),
        "months",
        true
      );
      return Math.floor(months);
    },
    getActualValue() {
      return this.valueOfGoal;
    },
    percentageDifference() {
      var estimatedValue = this.getEstimatedSavingsForMonths(
        this.getMonthsGoalActive()
      ).value;
      var increase = this.getActualValue() - estimatedValue;
      var x = increase / estimatedValue;
      return x * 100;
    }
  },
  middleware: ["check-auth", "auth"]
};
</script>
<style style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
</style>
