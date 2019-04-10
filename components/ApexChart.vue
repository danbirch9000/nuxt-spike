<template>
  <div>
    <div :ref="uniqueId" />
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

import { chartSparkLineOptions, chartLineOptions } from "~/common/chart-config";
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
    }
  },
  data() {
    return {
      domChart: null
    };
  },
  watch: {
    chartData: {
      handler() {
        this.domChart.destroy();
        this.drawChart();
      },
      deep: true
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
      options.series = this.chartData;
      this.domChart = new ApexCharts(this.$refs[this.uniqueId], options);
      this.domChart.render();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
