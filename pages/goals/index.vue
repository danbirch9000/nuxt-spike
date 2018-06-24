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
              <h2>{{currentGoal.description}}</h2>
              <div><span class="standout-lg">{{goalTarget.value | currency}}</span> by {{goalTarget.date}}</div>
              <div>Start <span class="standout">{{transformDate(currentGoal.startDate)}}</span> with <span class="standout">{{currentGoal.amount | currency}}</span>, save <span class="standout">{{currentGoal.monthly | currency}}</span> per month for 
              <span class="standout">{{currentGoal.years | year}}</span> years at <span class="standout">{{currentGoal.rate}}%</span></div>
              
              <div>Estimated value today after {{getMonthsGoalActive()}} months: <span class="standout-lg">{{getEstimatedSavingsForMonths(getMonthsGoalActive()).value | currency}}</span></div>
              <div>Actual value: <span class="standout-lg">{{getActualValue() | currency}}</span> {{percentageDifference() | percentage}}</div>
              </div>

              <button v-if="accounts.length > 0" class="btn btn-primary btn-sm" 
                @click="showAccountChooser =! showAccountChooser">Manage linked accounts</button>
              <accountChooser  v-if="showAccountChooser"/>
              <chart />
              <button @click="deleteGoal()" class="btn btn-primary btn-sm">Delete goal</button>
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
import chart from "~/components/chart";
import tableData from "~/components/table-data";
import moment from "moment";
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      showAccountChooser: false
    };
  },
  computed: {
    ...mapState({
      currentGoal: state => state.goalModule.goalView,
      accounts: state => state.accountModule.accounts
    }),
    ...mapGetters({
      valueOfGoal: "GET_VALUE_OF_GOAL",
      goalTarget: "GET_GOAL_TARGET"
    })
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  methods: {
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

      return increase / estimatedValue * 100;
    }
  },
  created() {
    this.$store.dispatch("GET_USER_GOALS");
    this.$store.dispatch("GET_USER_ACCOUNTS");
  },
  components: {
    goalList,
    chart,
    tableData,
    tweaker,
    accountChooser
  },
  middleware: ["check-auth", "auth"]
};
</script>
