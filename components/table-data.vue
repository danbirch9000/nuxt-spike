<template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <table class="table" v-if="getSavingsGoal !== null">
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
                <tr v-for="(item, index) in getSavingsGoal" :key="item.value">
                  <td>{{index + 1}}</td>
                  
                  <td>{{ item.date }}</td>
                  <td>&pound;{{ item.formattedInterest }}</td>
                  <td>&pound;{{ item.formattedTotalInterest }}</td>
                  <td>&pound;{{ item.formattedvalue }}</td>
                </tr>
              </tbody>
            </table>

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
