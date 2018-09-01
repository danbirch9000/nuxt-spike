<template>
  <section class="container">
    <h1>Accounts</h1>
    <div class="goal-layout">
      <div class="panel">
        <AccountList v-if="accounts.length > 0" />
        <nuxt-link tag="button" to="/new-account" class="btn btn-primary btn-lg btn-block">Create new account</nuxt-link>
      </div>
      <div v-if="accounts.length > 0">
        <div class="panel">
          <h2 v-if="currentSelectedAccount">{{ currentSelectedAccount.name }}</h2>
          <ChartMain :main-chart-data="accountChartData" />
        </div>
        <div class="panel">
          <AccountDetails />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import AccountList from "~/components/AccountList";
import AccountDetails from "~/components/AccountDetails";
import ChartMain from "~/components/ChartMain";
import { mapState, mapGetters } from "vuex";
import moment from "moment";
import utilities from "~/common/utilities.js";
import pageMixin from "~/mixins/pageMixin";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    AccountList,
    AccountDetails,
    ChartMain
  },
  mixins: [pageMixin],
  data() {
    return {
      accountChartData: null
    };
  },
  computed: {
    ...mapState({
      accounts: state => state.accountModule.accounts,
      accountIdViewing: state => state.accountModule.accountIdViewing
    }),
    ...mapGetters({
      currentSelectedAccount: "GET_ACCOUNT_VIEWING"
    })
  },
  watch: {
    accounts() {
      this.getChartData();
    },
    accountIdViewing() {
      this.getChartData();
    }
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  mounted() {},
  created() {
    this.$store.dispatch("GET_USER_ACCOUNTS");
  },
  methods: {
    getChartData() {
      let allAccounts = [];

      this.accounts.forEach(element => {
        let temp = {
          name: element.name,
          account: []
        };
        if (element.id === this.accountIdViewing) {
          for (const key in element.history) {
            let momentDate = moment(element.history[key].date);

            temp.account.push([
              momentDate.utc().valueOf(),
              Number(element.history[key].value)
            ]);
          }
          allAccounts.push(temp);
        }
      });
      let accountTotals = utilities.addAccounts(allAccounts);
      allAccounts.push({
        account: accountTotals.chart,
        name: "Total of all accounts"
      });
      this.accountChartData = allAccounts;
    }
  }
};
</script>
<style style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.account-grid {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
