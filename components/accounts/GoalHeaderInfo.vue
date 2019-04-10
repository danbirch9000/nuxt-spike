<template>
  <div>
    {{ goal }}
  </div>
</template>

<script>
// import moment from "moment";
export default {
  props: {
    goalData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    goal() {
      return `Save £${this.goalData.amount} per month for ${
        this.goalData.years
      } years at ${this.goalData.rate}% starting ${this.goalData.startDate}`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
</style>
