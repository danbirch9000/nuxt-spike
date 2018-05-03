<template>
    <section>
       <div v-if="accounts.length > 0">
        

          <div class="form-check" v-for="(item) in accounts" :key="item.description">
                <label class="form-check-label" :for="item.id">
                    <input class="form-check-input" type="checkbox" :id="item.id" :value="item.id" v-model="selectedAccounts">
                    {{item.name}}
                    <span class="form-check-sign"><span class="check"></span></span>
                </label>
            </div>
      </div>
    </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

  export default {
    data () {
      return{
          selectedAccounts: [],
          value: ''
      }
    },
    computed: {
   ...mapState({
      accounts: state => state.accountModule.accounts
    })
    },
    methods: {
      linkAccount(){

      }
    }
  }
</script>

<style lang="scss" scoped>

section {
    border: 1px #bcbcbc solid;
    padding: 18px;
    margin-top: 10px;
}
</style>
