<template>
  <section class="container">
    <AccountDetails v-if="account" :key="account.id" :account-data="account" />
  </section>
</template>

<script>
import pageMixin from "~/mixins/pageMixin";
import { mapState } from "vuex";
import AccountDetails from "~/components/accounts/AccountDetails";
export default {
  middleware: ["check-auth", "auth"],
  components: { AccountDetails },
  mixins: [pageMixin],
  computed: {
    ...mapState({
      userAccounts: state => state.accountModule.userAccounts
    }),
    account() {
      if (!this.userAccounts.data) {
        return null;
      }
      return this.userAccounts.data.find(o => o.id === this.$route.params.id);
    }
  },
  beforeMount() {
    if (!this.userAccounts.data) {
      this.$store.dispatch("GET_USER_ACCOUNTS");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
