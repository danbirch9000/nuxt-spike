<template>
  <div class="goal-summary ss-panel">
    <h3 class="link-text" @click="loadDetail(goalData.id)">{{ goalData.description }}</h3>
    <GoalHeaderInfo :goal-data="goalData" :goal-target="goalTarget" :current-value="currentValuation"/>

    <Pill classes="grey click" @click.native="updateChart('')">All</Pill>
    <Pill classes="grey click" @click.native="updateChart('toDate')">To date</Pill>

    <ApexChart v-if="chartFormatData.length"
               :chart-data="chartSeriesData"
               :unique-id="goalData.id"
               :filter="chartFilter"
               type="line"/>

    <AccountsOnAGoal :account-data="accountData" :goal-data="goalData"/>

  </div>
</template>

<script>
import { getFinanceData, addAccounts } from "~/common/utilities.js";
import ApexChart from "~/components/ApexChart";
import Pill from "~/components/Pill";
import GoalHeaderInfo from "~/components/accounts/GoalHeaderInfo";
import AccountsOnAGoal from "~/components/accounts/AccountsOnAGoal";
import moment from "moment";

export default {
  components: {
    ApexChart,
    GoalHeaderInfo,
    Pill,
    AccountsOnAGoal
  },
  props: {
    goalData: {
      type: Object,
      required: true
    },
    accountData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartFilter: null
    };
  },
  computed: {
    goalBreakdown() {
      if (!this.goalData) {
        return null;
      }
      return getFinanceData(
        this.goalData.rate,
        this.goalData.amount,
        this.goalData.monthly,
        this.goalData.years,
        this.goalData.startDate
      );
    },
    chartFormatData() {
      let data = this.goalBreakdown.map(o => {
        let value = parseInt(o.value) ? parseInt(o.value) : 0;
        return [o.utc, value];
      });
      data.unshift([
        moment(this.goalData.startDate)
          .utc()
          .valueOf(),
        this.goalData.amount
      ]);
      return data;
    },
    accountsForGoal() {
      if (this.accountData.data && this.accountData.data.length) {
        let accounts = [];
        let localGoalData = { ...this.goalData };
        let userAccounts = [...this.accountData.data];
        if (localGoalData.accounts && localGoalData.accounts.length) {
          localGoalData.accounts.forEach(account => {
            let accountsForGoal = userAccounts.filter(el => {
              return el.id === account;
            });
            if (accountsForGoal) {
              accountsForGoal = accountsForGoal[0];
              let accountRecords = [];
              for (const key in accountsForGoal.history) {
                let momentDate = moment(accountsForGoal.history[key].date);
                accountRecords.push([
                  momentDate.utc().valueOf(),
                  Number(accountsForGoal.history[key].value)
                ]);
              }
              accounts.push({
                name: accountsForGoal.name,
                account: accountRecords
              });
            }
          });
        }
        return addAccounts(accounts);
      }
      return [];
    },
    chartSeriesData() {
      return [
        {
          name: "Goal",
          data: this.chartFormatData
        },
        {
          name: "Current value",
          data: this.accountsForGoal.chart
        }
      ];
    },
    goalTarget() {
      return this.goalBreakdown[this.goalBreakdown.length - 1];
    },
    currentValuation() {
      if (
        !this.accountsForGoal ||
        !this.accountsForGoal.chart ||
        !this.accountsForGoal.chart.length
      ) {
        return null;
      }
      return this.accountsForGoal.chart[
        this.accountsForGoal.chart.length - 1
      ][1];
    }
  },
  methods: {
    loadDetail(id) {
      this.$router.push(`/goals/details/${id}`);
    },
    updateChart(type) {
      this.chartFilter = type;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
h3 {
  margin: 0;
}
.link-text {
  text-decoration: underline;
  cursor: pointer;
}
</style>
