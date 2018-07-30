<template>
  <section class="container">
    <div>
      <h1>Goals</h1>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <nuxt-link tag="button" to="/create-new" class="btn btn-primary btn-lg btn-block">Create new goal</nuxt-link>
            <goalList />
            <div v-if="currentGoal.description !== ''">
              <div class="goal-detail">
                <h2>{{ currentGoal.description }}</h2>
                <div><span class="standout-lg">{{ goalTarget.value | currency }}</span> by {{ goalTarget.date }}</div>
                <div>Start <span class="standout">{{ transformDate(currentGoal.startDate) }}</span> with <span class="standout">{{ currentGoal.amount | currency }}</span>, save <span class="standout">{{ currentGoal.monthly | currency }}</span> per month for
                <span class="standout">{{ currentGoal.years | year }}</span> years at <span class="standout">{{ currentGoal.rate }}%</span></div>

                <div>Estimated value today after {{ getMonthsGoalActive() }} months: <span class="standout-lg">{{ getEstimatedSavingsForMonths(getMonthsGoalActive()).value | currency }}</span></div>
                <div>Actual value: <span class="standout-lg">{{ getActualValue() | currency }}</span> {{ percentageDifference() | percentage }}</div>
              </div>

              <button v-if="accounts.length > 0" class="btn btn-primary btn-sm" @click="showAccountChooser =! showAccountChooser">Manage linked accounts</button>
              <accountChooser v-if="showAccountChooser"/>
              <!-- <ChartCompact :compact-chart-data="compact" /> -->
              <chart />
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
import chart from "~/components/chart";
import tableData from "~/components/table-data";
import moment from "moment";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    goalList,
    chart,
    tableData,
    tweaker,
    accountChooser,
    ChartCompact
  },
  data() {
    return {
      showAccountChooser: false,
      compact: {
        line1: [
          [1523514786000, 10400],
          [1555050786000, 20000],
          [1586673186000, 29600],
          [1618209186000, 39200],
          [1649745186000, 48800],
          [1681281186000, 58400],
          [1712903586000, 68000],
          [1744439586000, 77600],
          [1775975586000, 87200],
          [1807511586000, 96800]
        ],
        line2: [
          [1523514786000, 10829.73],
          [1555050786000, 21584.51],
          [1586673186000, 33116.77],
          [1618209186000, 45482.69],
          [1649745186000, 58742.55],
          [1681281186000, 72960.96],
          [1712903586000, 88207.22],
          [1744439586000, 104555.62],
          [1775975586000, 122085.86],
          [1807511586000, 140883.34]
        ]
      }
    };
  },
  computed: {
    ...mapState({
      currentGoal: state => state.goalModule.goalView,
      accounts: state => state.accountModule.accounts
    }),
    ...mapGetters({
      valueOfGoal: "GET_VALUE_OF_GOAL",
      goalTarget: "GET_GOAL_TARGET",
      accountViewing: "GET_ACCOUNT_VIEWING"
    }),
    pageReady() {
      return (
        this.accounts.length > 0 && this.currentGoal.accounts !== undefined
      );
    }
  },
  watch: {
    pageReady() {
      if (this.pageReady) {
        console.log("historic data.", this.getHistoricData());
      }
    },
    currentGoal() {
      console.log(this.currentGoal);
    }
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  mounted() {},
  created() {
    this.$store.dispatch("GET_USER_GOALS");
    this.$store.dispatch("GET_USER_ACCOUNTS");
  },
  methods: {
    getHistoricData() {
      var accountsInGoal = JSON.parse(JSON.stringify(this.currentGoal));
      var userAccounts = JSON.parse(JSON.stringify(this.accounts));
      let historicData = [];
      for (const i in accountsInGoal.accounts) {
        for (const j in userAccounts) {
          if (userAccounts[j].id === accountsInGoal.accounts[i]) {
            const account = userAccounts[j];
            const historyArray = [];
            for (const k in account.history) {
              historyArray.push([
                moment(account.history[k].date)
                  .utc()
                  .valueOf(),
                parseFloat(account.history[k].value)
              ]);
            }
            account.history = historyArray;
            historicData.push(account);
          }
        }
      }

      return historicData[0].history;
    },
    /*
            this.$store.commit("OPEN_OFF_CANVAS", {
          component: AddressSelect,
          title: "Please choose an address"
        });

        */
    test() {
      this.$dialog
        .confirm("Please confirm to continue")
        .then(function() {
          console.log("Clicked on proceed");
        })
        .catch(function() {
          console.log("Clicked on cancel");
        });
    },
    transformDate(date) {
      return moment(date).format("MMM YYYY");
    },
    deleteGoal() {
      this.$store.dispatch("DELETE_GOAL");
      this.$router.push({ name: "goals" });
    },
    saveGoal() {
      this.$store.dispatch("UPDATE_GOAL");
    },
    getEstimatedSavingsForMonths(months) {
      return utilities.getCiForMonths(
        parseInt(this.currentGoal.amount),
        months,
        parseInt(this.currentGoal.monthly),
        parseInt(this.currentGoal.rate)
      );
    },
    getMonthsGoalActive() {
      var months = moment().diff(
        moment(this.currentGoal.startDate),
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
