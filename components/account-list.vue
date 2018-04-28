<template>
    <section>
      <div v-if="getAccounts.length > 0">
          <span v-for="(item) in getAccounts" :key="item.id">
            <button @click="loadAccount(item.id)" type="button" class="btn btn-primary btn-sm">{{item.name}}</button>
          </span>
      </div>
    </section>
</template>

<script>
  export default {
    data () {
      return{
        currentGoal: null
      }
    },
    computed: {
      getAccounts: function(){
        return this.$store.state.accountModule.accounts
      }
    },
    methods: {
      loadAccount(id) {
        this.$store.commit("SET_ACCOUNT_VIEWING", id);
      }
    }
  }
</script>
