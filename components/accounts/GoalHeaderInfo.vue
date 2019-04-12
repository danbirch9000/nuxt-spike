<template>
  <div class="goal-definition">
    {{ goal }}
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    goalData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    goal() {
      let { amount, years, rate, startDate } = this.goalData;
      startDate = moment(startDate).format("ll");
      return `Save £${amount} per month for ${years} years at ${rate}% starting ${startDate}`;
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
</style>
