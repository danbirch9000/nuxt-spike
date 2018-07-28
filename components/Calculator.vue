<template>
  <section>
    <form>
      <div v-if="canSave" class="form-group">
        <label for="goal-description">Goal description</label>
        <input id="goal-description" v-model="description" type="text" class="form-control" aria-describedby="goalDescription" placeholder="e.g. Pension fund">
      </div>
      <div class="form-group">
        <label for="interest-rate">Interest rate</label>
        <input id="interest-rate" v-model="rate" type="text" class="form-control" aria-describedby="interestRate">
      </div>
      <div class="form-group">
        <label for="inital-amount">Initial amount</label>
        <input id="inital-amount" v-model="amount" type="text" class="form-control" aria-describedby="initialAmount">
      </div>
      <div class="form-group">
        <label for="monthly-deposits">Monthly deposits</label>
        <input id="monthly-deposits" v-model="monthly" type="text" class="form-control" aria-describedby="monthlyDeposits">
      </div>
      <div class="form-group">
        <label for="years">Years</label>
        <input id="years" v-model="years" type="text" class="form-control" aria-describedby="years">
      </div>
      <button type="button" class="btn btn-primary" @:click="calculate()">Calculate</button>
      <button v-if="canSave" type="button" class="btn btn-primary" @:click="saveGoal()">Save goal</button>
    </form>
    <tableData />
    <chart />

  </section>
</template>

<script>
import moment from "moment";
import goalList from "~/components/goal-list";
import tableData from "~/components/table-data";
import chart from "~/components/chart";
import { mapGetters } from "vuex";

export default {
  components: {
    goalList,
    chart,
    tableData
  },
  props: {
    canSave: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      description: "",
      rate: 5,
      amount: 1000,
      monthly: 250,
      years: 10,
      startDate: moment(),
      chartData: null,
      savingsGoal: null
    };
  },
  middleware: ["check-auth", "auth"],
  computed: {
    ...mapGetters({
      currentViewChartData: "GET_CHART_DATA_CURRENT_VIEW"
    }),
    getSavingsGoal: function() {
      return this.savingsGoal;
    },
    getChartConfig: function() {
      return {
        description: this.description,
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: this.startDate
      };
    }
  },
  methods: {
    calculate: function() {
      (this.startDate = moment()),
        (this.currentGoal = {
          rate: this.rate,
          amount: this.amount,
          monthly: this.monthly,
          years: this.years,
          startDate: moment().format(),
          description: this.description
        });

      this.$store.commit("SET_CURRENT_GOAL_VIEW", this.currentGoal);

      // this.savingsGoal = utilities.getFinanceData(this.rate, this.amount, this.monthly, this.years, this.startDate);
    },
    saveGoal: function() {
      this.$store.dispatch("SAVE_GOAL", {
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: moment().format(),
        description: this.description
      });
      this.$router.push("/goals");
    }
  }
};
</script>
