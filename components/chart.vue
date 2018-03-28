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
        startDate: null,
        chartConfig: chartConfig,
        chartData: null,
        savingsGoal: null
      }
    },
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
        this.startDate = moment(),
        this.savingsGoal = this.getFinanceData();
        this.chartData = this.buildChartData(this.savingsGoal);
        this.updateChart();
      },
      getFinanceData: function() {
        if (this.rate == '' || this.amount == '' || this.monthly == '' || this.years == ''){
          return [];
        }
        var monthly = parseFloat(this.monthly);
        var amount = parseFloat(this.amount);
        var rate = parseFloat(this.rate);
        var years = parseFloat(this.years);
        var savingsObject = utilities.calculateSavings(amount, years, monthly, rate, this.startDate);
        return savingsObject;
      },
      buildChartData(data){
        var chartData = [];
        for (var i = 0; i < data.length; i++) {
          chartData.push([data[i].utc, data[i].value]);
        }
        return chartData;
      }
    }
  }
</script>
