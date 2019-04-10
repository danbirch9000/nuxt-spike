<template>
  <div class="account-summary ss-panel">
    <h3 class="link-text" @click="loadDetail(accountData.id)">{{ accountData.name }}</h3>
    <AccountHeaderInfo :value="value" :last-updated="lastUpdated"/>
    <AccountValueUpdate :account-id="accountData.id"/>
    <ApexChart v-if="accountData.history.length > 1"
               :chart-data="accountData.history"
               :account-id="accountData.id"
               type="spark"/>
    <AccountDelete :account-id="accountData.id"/>
  </div>
</template>

<script>
import AccountValueUpdate from "./AccountValueUpdate";
import AccountDelete from "~/components/accounts/AccountDelete";
import AccountHeaderInfo from "~/components/accounts/AccountHeaderInfo";
import ApexChart from "~/components/ApexChart";
export default {
  components: {
    AccountValueUpdate,
    ApexChart,
    AccountDelete,
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
      if (!this.accountData || !this.accountData.history.length) {
        return null;
      }
      return this.accountData.history[this.accountData.history.length - 1]
        .value;
    },
    lastUpdated() {
      if (!this.accountData || !this.accountData.history.length) {
        return null;
      }
      return this.accountData.history[this.accountData.history.length - 1].date;
    }
  },
  methods: {
    loadDetail(id) {
      this.$router.push(`/accounts/details/${id}`);
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
.link-text {
  text-decoration: underline;
  cursor: pointer;
}
</style>
