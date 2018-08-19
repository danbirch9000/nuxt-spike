<template>
  <section class="container">
    <h1>Accounts</h1>
    <div v-if="accounts.length > 0" class="goal-layout">
      <div class="panel">
        <accountList />
        <nuxt-link tag="button" to="/new-account" class="btn btn-primary btn-lg btn-block">Create new account</nuxt-link>
      </div>
      <div>
        <div class="panel">
          <h2 v-if="currentSelectedAccount">{{ currentSelectedAccount.name }}</h2>
          <ChartMain :main-chart-data="accountChartData" />
        </div>
        <div class="panel">
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
import { mapState, mapGetters } from "vuex";
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
