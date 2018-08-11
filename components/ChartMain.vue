<template>
  <section>
    <div>
      <highcharts ref="chartComponent" :options="chartConfig" />
    </div>
  </section>
</template>

<script>
let chartConfig = {
  chart: {
    type: "spline",
    backgroundColor: "#ffffff",
    zoomType: "x"
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: true
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
  series: []
};

export default {
  props: {
    mainChartData: {
      type: Array,
      default: function() {
        return [];
      }
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
  watch: {
    mainChartData() {
      // console.log(JSON.stringify(this.mainChartData));
      chartConfig.series = [];
      this.mainChartData.forEach(element => {
        chartConfig.series.push({
          name: element.name,
          data: element.account,
          color: "#22cfef"
        });
      });
      this.$refs.chartComponent.chart.redraw();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/colors";
section {
  background-color: #fff;
  border: 1px #22cfef solid;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
</style>
