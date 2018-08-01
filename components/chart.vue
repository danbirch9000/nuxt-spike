<template>
  <section v-if="chartShown">
    <highcharts ref="chartComponent" :options="chartConfig" />
  </section>
</template>

<script>
import utilities from "~/common/utilities.js";
import { mapGetters } from "vuex";

const chartConfig = {
  chart: {
    type: "spline",
    backgroundColor: "#ffffff",
    renderTo: "container"
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  title: {
    text: ""
  },
  xAxis: {
    lineWidth: 0,
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent",
    type: "datetime",
    dateTimeLabelFormats: {
      year: "%Y"
    },
    title: {
      text: "Date"
    }
  },
  yAxis: {
    lineWidth: 0,
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent",
    title: {
      text: "Value"
    },
    min: 0
  },
  tooltip: {
    headerFormat: "<b>{series.name}</b><br>",
    pointFormat: "{point.x:%b %Y}: £{point.y:.2f}"
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: false
      }
    }
  },
  series: [
    {
      name: "Your goal",
      data: [],
      color: "#22cfef"
    },
    {
      name: "0% goal",
      data: [],
      color: "#191d21"
    }
  ]
};

export default {
  data: function() {
    return {
      chartConfig: chartConfig,
      chartData: null,
      savingsGoal: null,
      chartShown: false
    };
  },
  computed: {
    ...mapGetters({
      currentViewChartData: "GET_CHART_DATA_CURRENT_VIEW",
      masterChartData: "GET_CHART_DATA"
    })
  },
  watch: {
    masterChartData() {
      this.updateChart();
      this.chartShown = this.masterChartData.length > 0;
    }
  },
  mounted() {
    this.updateChart();
    this.chartShown = this.masterChartData.length > 0;
    this.$forceUpdate();
  },
  updated() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      if (this.$refs.chartComponent !== undefined) {
        var chart = this.$refs.chartComponent.chart;
        chart.series[0].setData(this.masterChartData);
        let data = utilities.getFinanceData(
          0,
          this.currentViewChartData.amount,
          this.currentViewChartData.monthly,
          this.currentViewChartData.years,
          this.currentViewChartData.startDate
        );
        let chartData = utilities.buildChartData(data);
        chart.series[1].setData(chartData);
        chart.redraw();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: #fff;
  border: 1px #22cfef solid;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
</style>
