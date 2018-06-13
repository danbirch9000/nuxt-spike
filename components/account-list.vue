<template>
    <section>
      <div v-if="getAccounts.length > 0">
          <select v-model="id" @change="loadAccount()">
            <option v-for="(item) in getAccounts" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
      </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      currentGoal: null,
      id: null
    };
  },
  computed: {
    getAccounts: function() {
      return this.$store.state.accountModule.accounts;
    }
  },
  methods: {
    loadAccount() {
      this.$store.commit("SET_ACCOUNT_VIEWING", this.id);
    }
  }
};
</script>
