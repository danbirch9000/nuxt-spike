<template>
  <section class="container">
    <h1>Accounts</h1>
    <div class="goal-layout">
      <div class="panel">
        <AccountList v-if="hasAccounts"/>
        <nuxt-link tag="button" to="/accounts/create/" class="btn btn-primary btn-lg btn-block">Create new account</nuxt-link>
        <button v-if="hasAccounts" class="btn btn-primary" @click="deleteAccount()">Delete Account</button>
      </div>

      <div v-if="currentSelectedAccount && hasAccounts">
        <div v-if="currentSelectedAccount.history.length > 1" class="panel">
          <h2>{{ currentSelectedAccount.name }}</h2>
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
import moment from "moment";
import utilities from "~/common/utilities.js";
import pageMixin from "~/mixins/pageMixin";
import { mapState, mapGetters } from "vuex";
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
      accountModule: state => state.accountModule,
      accountIdViewing: state => state.accountModule.accountIdViewing
    }),
    ...mapGetters(["GET_ACCOUNT_VIEWING"]),
    currentSelectedAccount() {
      if (!this.accountModule) {
        return null;
      }
      const account = this.accountModule.accounts.filter(
        account => this.accountModule.accountIdViewing === account.id
      );
      return account[0];
    },
    hasAccounts() {
      return this.accountModule.accounts.length;
    }
  },
  watch: {
    accountIdViewing() {
      this.getChartData();
    },
    handler: {
      GET_ACCOUNT_VIEWING() {
        console.log("get chart data again");
        this.getChartData();
      },
      deep: true
    }
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  created() {
    if (!this.hasAccounts) {
      this.$store.dispatch("GET_USER_ACCOUNTS");
    }
  },
  methods: {
    deleteAccount() {
      this.$dialog.confirm("Delete this account?").then(() => {
        var payload = {
          accountId: this.currentSelectedAccount.id
        };
        this.$store.dispatch("DELETE_ACCOUNT", payload).then(() => {
          this.value = "";
        });
      });
    },
    getChartData() {
      let allAccounts = [];

      this.accountModule.accounts.forEach(element => {
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
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.account-grid {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
