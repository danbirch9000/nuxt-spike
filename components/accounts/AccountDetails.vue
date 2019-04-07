<template>
  <div class="account-summary ss-panel">
    <h3>{{ accountData.name }}</h3>
    <div>{{ value | sterling }}</div>
    <div class="">{{ lastUpdated | dateTime }}</div>
    <AccountValueUpdate :account-id="accountData.id"/>
    <ApexChart :chart-data="accountData.history"
               :account-id="accountData.id"
               type="line"/>
    <ul class="table-list">
      <li v-for="record in accountData.history" :key="record.id">
        <span>{{ record.value | sterling }}</span>
        <span>{{ record.date | dateTime }}</span>
        <span><InlineButton text="Delete record" classes="compact" /></span>
      </li>
    </ul>
  </div>
</template>

<script>
import InlineButton from "~/components/InlineButton.vue";
import AccountValueUpdate from "./AccountValueUpdate";
import ApexChart from "~/components/ApexChart";
export default {
  components: {
    InlineButton,
    AccountValueUpdate,
    ApexChart
  },
  props: {
    accountData: {
      type: Object,
      required: true
    }
  },
  computed: {
    value() {
      if (!this.accountData) {
        return null;
      }
      return this.accountData.history[this.accountData.history.length - 1]
        .value;
    },
    lastUpdated() {
      if (!this.accountData) {
        return null;
      }
      return this.accountData.history[this.accountData.history.length - 1].date;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
h3 {
  margin: 0;
}
.table-list li {
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 3px;
  grid-template-columns: 3fr 3fr 1fr;
}
</style>
