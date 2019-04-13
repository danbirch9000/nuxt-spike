<template>
  <div class="account-summary ss-panel">
    <h3>{{ accountData.name }}</h3>
    <AccountHeaderInfo :value="value" :last-updated="lastUpdated"/>
    <AccountValueUpdate :account-id="accountData.id"/>
    <ApexChart :chart-data="chartFormatData"
               :unique-id="accountData.id"
               type="line"/>
    <ul class="table-list">
      <li v-for="record in accountHistory" :key="record.id">
        <span>{{ record.value | sterling }}</span>
        <span>{{ record.date | dateTime }}</span>
        <span>
          <InlineButton text="Delete record"
                        classes="compact"
                        @click.native="deleteRecord(record)"/>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import InlineButton from "~/components/InlineButton.vue";
import AccountValueUpdate from "./AccountValueUpdate";
import AccountHeaderInfo from "~/components/accounts/AccountHeaderInfo";
import ApexChart from "~/components/ApexChart";
import moment from "moment";
export default {
  components: {
    InlineButton,
    AccountValueUpdate,
    ApexChart,
    AccountHeaderInfo
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
    },
    accountHistory() {
      const history = [...this.accountData.history];
      return history.length ? history.reverse() : [];
    },
    chartFormatData() {
      return [
        {
          name: "Account",
          data: this.accountData.history.map(o => {
            let value = parseInt(o.value) ? parseInt(o.value) : 0;
            return [moment(o.date).unix() * 1000, value];
          })
        }
      ];
    }
  },
  methods: {
    deleteRecord(record) {
      let payload = {
        accountId: this.accountData.id,
        recordId: record.id
      };
      this.$store.dispatch("DELETE_USER_ACCOUNT_VALUE", payload);
    }
  }
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
