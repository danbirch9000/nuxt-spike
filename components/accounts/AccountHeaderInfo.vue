<template>
  <div>
    <div class="ss-value">{{ value | sterling }}</div>
    <div class="date">Last updated: {{ lastUpdatedDesc }}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    lastUpdated: {
      type: String,
      default: ""
    }
  },
  computed: {
    lastUpdatedDesc() {
      const today = moment();
      const record = moment(this.lastUpdated);
      const dateDiff = today.diff(record, "days");
      if (dateDiff > 1) {
        return `${dateDiff} days ago`;
      }
      return this.$options.filters.dateTime(this.lastUpdated);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.date {
  font-size: 0.8em;
  color: #334856;
}
.ss-value {
  font-size: 1.5em;
  margin: 5px 0 10px;
}
</style>
