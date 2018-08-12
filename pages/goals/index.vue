<template>
  <section class="container">
    <div>
      <div class="toolbar">
        <h1>Goals</h1>
        <nuxt-link tag="button" to="/create-new" class="btn btn-primary btn-lg btn-block">Create new goal</nuxt-link>
      </div>


      <goalList />

      <div class="container">
        <div class="row">
          <div class="col-md">

            <div v-if="goalView.description !== ''">
              <div class="goal-detail">
                <h2>{{ goalView.description }}</h2>
                <div><span class="standout-lg">{{ goalTarget.value | currency }}</span> by {{ goalTarget.date }}</div>
                <div>Start <span class="standout">{{ goalView.startDate | monthAndYear }}</span> with <span class="standout">{{ goalView.amount | currency }}</span>, save <span class="standout">{{ goalView.monthly | currency }}</span> per month for
                <span class="standout">{{ goalView.years | year }}</span> years at <span class="standout">{{ goalView.rate }}%</span></div>
                <div>Estimated value today after {{ getMonthsGoalActive() }} months: <span class="standout-lg">{{ getEstimatedSavingsForMonths(getMonthsGoalActive()).value | currency }}</span></div>
                <div>Actual value: <span class="standout-lg">{{ getActualValue() | currency }}</span> {{ percentageDifference() | percentage }}</div>
              </div>
              <ChartMain :main-chart-data="goalChartData" />
              <button v-if="accounts.length > 0" class="btn btn-primary btn-sm" @click="showAccountChooser =! showAccountChooser">Manage linked accounts</button>
              <accountChooser v-if="showAccountChooser"/>
              <button class="btn btn-primary btn-sm" @click="deleteGoal()">Delete goal</button>
              <tableData />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import utilities from "~/common/utilities.js";
import goalList from "~/components/goal-list";
import accountChooser from "~/components/account-chooser";
import tweaker from "~/components/tweaker";
import ChartCompact from "~/components/ChartCompact";
import tableData from "~/components/table-data";
import moment from "moment";
import { mapGetters, mapState } from "vuex";
import ChartMain from "~/components/ChartMain";

export default {
  components: {
    goalList,
    tableData,
    tweaker,
    accountChooser,
    ChartCompact,
    ChartMain
  },
  data() {
    return {
      showAccountChooser: false,
      goalChartData: null
    };
  },
  computed: {
    ...mapState({
      goalView: state => state.goalModule.goalView,
      accounts: state => state.accountModule.accounts
    }),
    ...mapGetters({
      valueOfGoal: "GET_VALUE_OF_GOAL",
      goalTarget: "GET_GOAL_TARGET",
      masterChartData: "GET_CHART_DATA",
      currentViewChartData: "GET_CHART_DATA_CURRENT_VIEW"
    }),
    pageReady() {
      return this.accounts.length > 0 && this.goalView.accounts !== undefined;
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
  created() {
    this.$store.dispatch("GET_USER_GOALS");
    this.$store.dispatch("GET_USER_ACCOUNTS");
  },
  methods: {
    getAccountsForGoal() {
      let accounts = [];

      let goalView = JSON.parse(JSON.stringify(this.goalView));
      let userAccounts = JSON.parse(JSON.stringify(this.accounts));

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
      const total = utilities.addAccounts(accounts);
      let totalChart = [{ name: total.name, account: total.chart }];
      this.goalChartData = [
        ...accounts,
        ...this.getGoalChartData(),
        ...totalChart
      ];
    },
    getGoalChartData() {
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
      var base = this;
      this.$dialog
        .confirm("Delete this goal?")
        .then(function() {
          base.$store.dispatch("DELETE_GOAL");
          base.$router.push({ name: "goals" });
        })
        .catch(function(e) {
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
.toolbar {
  display: flex;
}
h1 {
  flex: 8;
}
button {
  flex: 1;
}
</style>
