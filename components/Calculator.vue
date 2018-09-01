<template>
  <section>
    <Message v-if="!formValid && userClickedSaved" type="error">Please complete all fields</Message>
    <form>
      <div class="form-elements">
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
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-primary" @click="calculate()">Calculate</button>
        <button v-if="canSave" type="button" class="btn btn-primary" @click="saveGoal()">Save goal</button>
      </div>

    </form>
    <TableData v-if="currentViewChartData" />
    <Chart v-if="currentViewChartData" />

  </section>
</template>

<script>
import moment from "moment";
import GoalList from "~/components/GoalList";
import TableData from "~/components/TableData";
import Message from "~/components/Message";
import Chart from "~/components/Chart";
import { mapGetters } from "vuex";

export default {
  components: {
    GoalList,
    Chart,
    TableData,
    Message
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
      userClickedSaved: false
    };
  },
  middleware: ["check-auth", "auth"],
  computed: {
    ...mapGetters({
      currentViewChartData: "GET_CHART_DATA_CURRENT_VIEW"
    }),
    watchData() {
      return {
        description: this.description,
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years
      };
    },
    getChartConfig() {
      return {
        description: this.description,
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: this.startDate
      };
    },
    formValid() {
      return (
        this.description !== "" &&
        this.rate !== "" &&
        this.amount !== "" &&
        this.monthly !== "" &&
        this.years !== ""
      );
    }
  },
  watch: {
    handler: {
      watchData() {
        this.userClickedSaved = false;
      },
      deep: true
    }
  },
  methods: {
    calculate() {
      this.currentGoal = {
        rate: this.rate,
        amount: this.amount,
        monthly: this.monthly,
        years: this.years,
        startDate: moment().format(),
        description: this.description
      };
      this.$store.commit("SET_CURRENT_GOAL_VIEW", this.currentGoal);
    },
    saveGoal() {
      this.userClickedSaved = true;
      if (this.formValid) {
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
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .form-elements {
    display: flex;
    .form-group {
      flex-grow: 1;
      justify-content: space-around;
      margin: 5px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
