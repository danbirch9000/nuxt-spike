<template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <table class="table" v-if="currentViewChartData.rate !== ''">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">Date</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Total Interest</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in getSavingsGoal" :key="item.value" v-if="showRow(index)">
                  <td>{{index + 1}}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.interest  | currency}}</td>
                  <td>{{ item.totalInterest  | currency}}</td>
                  <td>{{ item.value  | currency}}</td>
                </tr>
              </tbody>
            </table>
            <button @click="showAllRows = !showAllRows" v-if="currentViewChartData.rate !== ''">Show all rows</button>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import utilities from "~/common/utilities.js";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showAllRows: false
    };
  },
  computed: {
    ...mapGetters({
      currentViewChartData: "GET_CHART_DATA_CURRENT_VIEW"
    }),
    getSavingsGoal() {
      return utilities.getFinanceData(
        this.currentViewChartData.rate,
        this.currentViewChartData.amount,
        this.currentViewChartData.monthly,
        this.currentViewChartData.years,
        this.currentViewChartData.startDate
      );
    }
  },
  methods: {
    showRow(index) {
      if (this.showAllRows) {
        return true;
      } else if (
        index === 0 ||
        index === 1 ||
        index === this.getSavingsGoal.length - 1
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
}

.table th,
.table td {
  padding: 0.25em;
  font-size: 0.8em;
  text-align: right;
}
</style>
