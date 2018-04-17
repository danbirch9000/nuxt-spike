<template>
    <section>
      <highcharts :options="chartConfig" ref="chartComponent"></highcharts>
    </section>
</template>

<script>
import utilities from '~/common/utilities.js'
import moment from 'moment'
import { mapGetters } from 'vuex'

const chartConfig = {
  "chart": {
    "type": "spline"
  },
  "title": {
    "text": "Your goals"
  },
  "xAxis": {
    "type": "datetime",
    "dateTimeLabelFormats": {
      "year": "%Y"
    },
    "title": {
      "text": "Date"
    }
  },
  "yAxis": {
    "title": {
      "text": "Value"
    },
    "min": 0
  },
  "tooltip": {
    "headerFormat": "<b>{series.name}</b><br>",
    "pointFormat": "{point.x:%b %Y}: £{point.y:.2f}"
  },
  "plotOptions": {
    "spline": {
      "marker": {
        "enabled": true
      }
    }
  },
  "series": [
    {
      "name": "Your goal",
      "data": []
    },
    {
      "name": "0% goal",
      "data": []
    }
  ]
};

  export default {
    data: function() {
      return {
        chartConfig: chartConfig,
        chartData: null,
        savingsGoal: null
      }
    },
    computed: {
      ...mapGetters({
        currentViewChartData: 'getCurrentViewChartData'
      })
    },
    watch:{
      currentViewChartData(){
        this.calculate();
      }
    },
    methods: {
      updateChart(){
        if (this.$refs.chartComponent !== undefined){
          var chart = this.$refs.chartComponent.chart;
          chart.series[0].setData(this.chartData);
          let data = utilities.getFinanceData(0, this.currentViewChartData.amount, this.currentViewChartData.monthly, this.currentViewChartData.years, this.currentViewChartData.startDate);
          let chartData = utilities.buildChartData(data);
          chart.series[1].setData(chartData);
          chart.redraw();
        }
      },
      calculate: function(){
        this.savingsGoal = utilities.getFinanceData(this.currentViewChartData.rate, this.currentViewChartData.amount, this.currentViewChartData.monthly, this.currentViewChartData.years, this.currentViewChartData.startDate);
        this.chartData = utilities.buildChartData(this.savingsGoal);
        this.updateChart();
      }
    }
  }
</script>
