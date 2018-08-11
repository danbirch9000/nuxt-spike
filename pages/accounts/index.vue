<template>
  <section class="container">
    <h1>Accounts</h1>

    <div class="container">
      <div class="row">
        <div class="col-md">
          <ChartMain :main-chart-data="accountChartData" />
          <nuxt-link tag="button" to="/new-account" class="btn btn-primary btn-lg btn-block">Create new account</nuxt-link>
          <accountList />
          <accountDetails />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import accountList from "~/components/account-list";
import accountDetails from "~/components/account-details";
import ChartMain from "~/components/ChartMain";
import { mapState } from "vuex";
import moment from "moment";
import utilities from "~/common/utilities.js";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    accountList,
    accountDetails,
    ChartMain
  },
  data() {
    return {
      accountChartData: null
    };
  },
  computed: {
    ...mapState({
      accounts: state => state.accountModule.accounts,
      accountIdViewing: state => state.accountModule.accountIdViewing
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
