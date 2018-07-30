<template>
  <section>
    <div v-if="accounts.length > 0">
      <div v-for="(item) in accounts" :key="item.description" class="form-check">
        <label :for="item.id" class="form-check-label">
          <input :id="item.id" :value="item.id" v-model="selectedAccounts" class="form-check-input" type="checkbox">
          {{ item.name }}
          <span class="form-check-sign"><span class="check" /></span>
        </label>
      </div>
      <button class="btn btn-primary btn-sm" @click="linkAccounts()">Save</button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedAccounts: [],
      value: ""
    };
  },
  computed: {
    ...mapState({
      accounts: state => state.accountModule.accounts,
      goalView: state => state.goalModule.goalView
    })
  },
  watch: {
    goalView() {
      if (this.goalView.accounts === undefined) {
        this.selectedAccounts = [];
      } else {
        this.selectedAccounts = this.goalView.accounts;
      }
    }
  },
  mounted() {
    this.selectedAccounts = this.goalView.accounts;
  },
  methods: {
    linkAccounts() {
      this.$store.dispatch("LINK_GOAL_TO_ACCOUNT", this.selectedAccounts);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  border: 1px #bcbcbc solid;
  padding: 18px;
  margin-top: 10px;
}
</style>
