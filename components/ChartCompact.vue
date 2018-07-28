<template>
  <section>
    <div class="chart-compact">
      <highcharts ref="chartComponent" :options="chartConfig" />
    </div>
  </section>
</template>

<script>
const chartConfig = {
  chart: {
    type: "spline",
    backgroundColor: "transparent",
    renderTo: "container",
    margin: 0,
    padding: 0,
    width: 300,
    height: 200
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
    type: "datetime",
    dateTimeLabelFormats: {
      year: "%Y"
    },
    title: {
      text: "Date"
    },
    labels: {
      enabled: false
    },
    lineWidth: 0,
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent"
  },
  yAxis: {
    title: {
      text: "Value"
    },
    min: 0,
    labels: {
      enabled: false
    },
    lineWidth: 0,
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent"
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
  props: {
    compactChartData: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      chartConfig: chartConfig,
      chartData: null,
      savingsGoal: null,
      chartShown: true
    };
  },
  mounted() {
    var chart = this.$refs.chartComponent.chart;
    chart.series[0].setData(this.compactChartData.line1);
    chart.series[1].setData(this.compactChartData.line2);
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/colors";
</style>
