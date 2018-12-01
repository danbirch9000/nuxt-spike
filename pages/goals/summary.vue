<template>
  <section class="container">
    <h1>Account summaries</h1>
    <div class="card">
      <p>Quick value</p>
      <span class="account-value">
        {{ quickValue | currency }}
      </span>
      <button class="btn btn-primary btn-sm" @click="resetQuickValue()">Reset</button>
    </div>
    <div v-if="accounts" id="accounts-summary">
      <div v-for="(account, index) in accounts" :key="index" class="card">
        <ul>
          <li>{{ account.name }}</li>
          <li><span class="account-value">{{ getAccountValue(account.history) | currency }}</span></li>
        </ul>
        <button class="btn btn-primary btn-sm" @click="addToQuickValue(getAccountValue(account.history))">Add</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import pageMixin from "~/mixins/pageMixin";

export default {
  components: {},
  mixins: [pageMixin],
  middleware: ["check-auth", "auth"], // check-auth calls INIT_AUTH to make sure the user is authenticated
  data() {
    return {
      quickValue: 0
    };
  },
  computed: {
    ...mapState({
      accounts: state => state.accountModule.accounts,
      goals: state => state.goalModule.goals
    })
  },
  watch: {},
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  mounted() {
    if (!this.accounts || !this.goals) {
      this.getPageData();
    }
  },
  methods: {
    getPageData() {
      const getUserAccounts = this.$store.dispatch("GET_USER_ACCOUNTS");
      const getUserGoals = this.$store.dispatch("GET_USER_GOALS");
      return Promise.all([getUserAccounts, getUserGoals]).then(() => {
        console.log("Data got!");
      });
    },
    getAccountValue(history) {
      return history[history.length - 1].value;
    },
    addToQuickValue(val) {
      console.log(val);
      this.quickValue += parseFloat(val);
    },
    resetQuickValue() {
      this.quickValue = 0;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.card {
  padding: 20px;
  background-color: #fff;
  border: 2px #e5e9f2 solid;
  border-radius: 5px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 0;
    }
  }
}
.account-value {
  font-size: 1.6em;
  margin: 5px 0 10px;
  display: block;
}
#accounts-summary {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(3, 1fr);
}
</style>