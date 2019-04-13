<template>
  <div>
    <div v-if="accountsUsedForThisGoal.length">Accounts used for goal:
      <Pill v-for="account in accountsUsedForThisGoal"
            :key="account.id"
            classes="blue">{{ account.name }} </Pill>
    </div>
    <div>
      <span class="link-text"
            @click="editAccounts()">edit</span>
      <div v-if="showAllAccounts">
        <ul class="account-list">
          <li v-for="account in accountData.data"
              :key="account.id">
            <input :id="account.id"
                   v-model="formItems.accounts" 
                   :value="account.id"
                   type="checkbox"><label :for="account.id">{{ account.name }}</label></li>
        </ul>
        <InlineButton :loading="loading"
                      :use-confirmation="true"
                      :action="() => updateAttachedAccounts()"
                      text="Update"/>
      </div>

    </div>
  </div>
</template>

<script>
import Pill from "~/components/Pill";
import InlineButton from "~/components/InlineButton.vue";

export default {
  components: {
    Pill,
    InlineButton
  },
  props: {
    goalData: {
      type: Object,
      required: true
    },
    accountData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      showAllAccounts: false,
      formItems: {
        accounts: []
      }
    };
  },
  computed: {
    isFormValid() {
      return true;
    },
    accountsUsedForThisGoal() {
      if (
        this.accountData.data &&
        this.accountData.data.length &&
        this.goalData.accounts
      ) {
        let accounts = [];
        this.goalData.accounts.forEach(a => {
          accounts.push(this.accountData.data.find(ad => ad.id === a));
        });
        return accounts;
      }
      return [];
    }
  },
  watch: {
    accountsUsedForThisGoal: {
      handler() {
        this.setAccounts();
      },
      deep: true
    }
  },
  methods: {
    setAccounts() {
      console.log("set accounts", this.accountsUsedForThisGoal);
      this.formItems.accounts = this.accountsUsedForThisGoal.map(i => i.id);
    },
    editAccounts() {
      this.showAllAccounts = !this.showAllAccounts;
    },
    updateAttachedAccounts() {
      const payload = {
        ...this.goalData,
        accounts: this.formItems.accounts
      };
      this.$store.dispatch("LINK_GOAL_TO_ACCOUNT", payload);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.account-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    background-color: $lightgrey;
    margin: 4px 0;
  }
}
label {
  font-size: 0.9em;
}
</style>
