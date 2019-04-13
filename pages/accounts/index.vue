<template>
  <div>
    <h1 class="page-header">Your accounts</h1>
    <section class="container">
      <AccountCreate />
      <div v-if="userAccounts.data && userAccounts.data.length" class="account-grid">
        <template v-for="account in userAccounts.data" >
          <AccountSummary :key="account.id" :account-data="account" />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import { mapState } from "vuex";
import AccountSummary from "~/components/accounts/AccountSummary";
import AccountCreate from "~/components/accounts/AccountCreate";
export default {
  middleware: ["check-auth", "auth"],
  components: { AccountSummary, AccountCreate },
  mixins: [pageMixin],
  computed: {
    ...mapState({
      userAccounts: state => state.accountModule.userAccounts
    })
  },
  beforeMount() {
    if (!this.userAccounts.data) {
      this.$store.dispatch("GET_USER_ACCOUNTS");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";

.account-grid {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  @include desktop {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
