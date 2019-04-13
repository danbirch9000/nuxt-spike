<template>
  <div>
    <div :ref="uniqueId" />
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { chartSparkLineOptions, chartLineOptions } from "~/common/chart-config";
import moment from "moment";

export default {
  props: {
    chartData: {
      type: Array,
      required: true
    },
    uniqueId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "line"
    },
    filter: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      domChart: null
    };
  },
  computed: {
    filteredChartData() {
      if (!this.filter) {
        return this.chartData;
      }
      if (this.filter === "toDate") {
        let filteredData = JSON.parse(JSON.stringify(this.chartData));
        filteredData.forEach(o => {
          o.data = o.data.filter(i => {
            return moment(i[0]).isBefore(moment().add(1, "years"));
          });
        });
        return filteredData;
      }
    }
  },
  watch: {
    chartData: {
      handler() {
        this.domChart.destroy();
        this.drawChart();
      },
      deep: true
    },
    filter() {
      this.domChart.destroy();
      this.drawChart();
    },
    filteredChartData() {
      this.domChart.destroy();
      this.drawChart();
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    loadDetail(id) {
      this.$router.push(`/accounts/details/${id}`);
    },
    drawChart() {
      let options =
        this.type === "line"
          ? { ...chartLineOptions }
          : { ...chartSparkLineOptions };
      options.series = this.filteredChartData;
      this.domChart = new ApexCharts(this.$refs[this.uniqueId], options);
      this.domChart.render();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
