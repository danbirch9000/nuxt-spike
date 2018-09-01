<template>
  <section>
    <div v-if="accounts">
      <select v-model="selectedAcccount">
        <option v-for="(item) in accounts" :value="item.id" :key="item.id">{{ item.name }}</option>
      </select>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentGoal: null,
      selectedAcccount: null
    };
  },
  computed: {
    ...mapState({
      accounts: state => state.accountModule.accounts,
      accountIdViewing: state => state.accountModule.accountIdViewing
    })
  },
  watch: {
    selectedAcccount(val) {
      console.log("selectedAcccount", val);
      this.loadAccount(val);
    }
  },
  mounted() {
    this.selectedAcccount =
      this.accountIdViewing !== ""
        ? this.accountIdViewing
        : this.accounts[0].id;
  },
  methods: {
    loadAccount(id) {
      console.log("loading", id);
      this.$store.commit("SET_ACCOUNT_VIEWING", id);
    }
  }
};
</script>
