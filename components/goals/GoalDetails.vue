<template>
  <div class="ss-panel">
    <h3>{{ goalData.description }}</h3>

  </div>
</template>

<script>
import ApexChart from "~/components/ApexChart";

export default {
  components: {
    ApexChart
  },
  props: {
    goalData: {
      type: Object,
      required: true
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
</style>
