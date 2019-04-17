<template>
  <div>
    <div v-if="goalTarget" class="goal-target"><span>{{ goalTarget.value | currency }}</span>  by {{ goalTarget.date }}</div>
    <div class="goal-definition">
      {{ goal }}
    </div>
    <div v-if="currentValue">Current value: {{ currentValue | currency }}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    goalData: {
      type: Object,
      default: () => {}
    },
    goalTarget: {
      type: Object,
      default: null
    },
    currentValue: {
      type: Number,
      default: null
    }
  },
  computed: {
    goal() {
      let { amount, monthly, years, rate, startDate } = this.goalData;
      years = this.$options.filters.noDecimal(years);
      startDate = moment(startDate).format("ll");
      return `Save £${monthly} per month starting with £${amount} for ${years} years at ${rate}% starting ${startDate}`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.goal-definition {
  margin: 10px 0;
  background-color: $lightgrey;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.1em;
  line-height: 1.6em;
}
.goal-target {
  span {
    font-size: 2em;
    color: #6ad065;
  }
}
</style>
