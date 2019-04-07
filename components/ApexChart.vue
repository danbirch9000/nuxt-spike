<template>
  <div>
    <div :ref="accountId" />
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import moment from "moment";
import { chartSparkLineOptions, chartLineOptions } from "~/common/chart-config";
export default {
  props: {
    chartData: {
      type: Array,
      required: true
    },
    accountId: {
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
  computed: {
    chartFormatData() {
      return this.chartData.map(o => {
        let value = parseInt(o.value) ? parseInt(o.value) : 0;
        return [moment(o.date).unix() * 1000, value];
      });
    }
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
      options.series[0].data = this.chartFormatData;
      this.domChart = new ApexCharts(this.$refs[this.accountId], options);
      this.domChart.render();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
