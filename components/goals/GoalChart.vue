<template>
  <section>
    <Pill classes="grey click" @click.native="updateChart('')">All</Pill>
    <Pill classes="grey click" @click.native="updateChart('toDate')">To date</Pill>

    <ApexChart v-if="chartFormatData.length"
               :chart-data="chartSeriesData"
               :unique-id="uniqueId"
               :filter="chartFilter"
               type="line"/>
  </section>
</template>

<script>
import ApexChart from "~/components/ApexChart";
import Pill from "~/components/Pill";
export default {
  components: {
    ApexChart,
    Pill
  },
  props: {
    accountsForGoal: {
      type: Array,
      required: true
    },
    goalBreakdown: {
      type: Array,
      required: true
    },
    uniqueId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chartFilter: null
    };
  },
  computed: {
    chartSeriesData() {
      return [
        {
          name: "Goal",
          data: this.chartFormatData
        },
        {
          name: "Current value",
          data: this.accountsForGoal.chart
        }
      ];
    },
    chartFormatData() {
      return this.goalBreakdown.map(o => {
        let value = parseInt(o.value) ? parseInt(o.value) : 0;
        return [o.utc, value];
      });
    }
  },
  methods: {
    updateChart(type) {
      this.chartFilter = type;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
