<template>
  <div v-if="goalData.length" class="goal-table">
    <ul class="table-list">
      <li class="table-list-header">
        <span>Date</span>
        <span>Total interest</span>
        <span>Year interest</span>
        <span>Total value</span>
      </li>
      <li v-for="(record, index) in goalData" :key="index" class="table-list-body">
        <span>{{ record.date }}</span>
        <span>{{ record.totalInterest | sterling }}</span>
        <span>{{ record.interest | sterling }}</span>
        <span>{{ record.value | sterling }}</span>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  props: {
    goalData: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.table-list li {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
