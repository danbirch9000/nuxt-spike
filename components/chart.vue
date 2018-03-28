<template>
    <section>
      <highcharts :options="chartConfig" ref="highcharts"></highcharts>
    </section>
</template>

<script>
import utilities from '~/common/utilities.js'
import moment from 'moment'

const chartConfig = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Your goals'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
    },
    title: {
        text: 'Date'
    }
  },
  yAxis: {
    title: {
        text: 'Value'
    },
    min: 0
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b}: £{point.y:.2f}'
  },

  plotOptions: {
    spline: {
      marker: {
          enabled: true
      }
    }
  },
  series: [
    {
      name: 'Your goal ',
      data: []
  }]
  };

  export default {
    data: function() {
      return {
        
        chartConfig: chartConfig,
        chartData: null,
        savingsGoal: null
      }
    },
    props: ['description', 'rate', 'amount', 'monthly', 'years', 'startDate'],
    created: function () {
      this.calculate();
    },
    computed: {

    },
    methods: {
      updateChart(){
        if (this.$refs.highcharts !== undefined){
          var chart = this.$refs.highcharts.chart;
          chart.series[0].setData(this.chartData);
          chart.redraw();
        }
      },
      calculate: function(){
 
        this.savingsGoal = utilities.getFinanceData(this.rate, this.amount, this.monthly, this.years, this.startDate);
        this.chartData = utilities.buildChartData(this.savingsGoal);
        this.updateChart();
      }
    }
  }
</script>
