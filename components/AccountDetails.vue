<template>
  <section>
    <div>
      <div v-if="currentSelectedAccount !== null">
        <form @submit.prevent>
          <div class="form-group">
            <label for="value">new account value:</label>
            <input id="value" v-model="value" type="number" class="form-control large-input" aria-describedby="value" placeholder="e.g. £2000" autocomplete="off" step=".01">
          </div>
          <button class="btn btn-primary" @click="updateValue()">Update</button>
        </form>

        <h3>Amend previous entries</h3>
        <ul class="account-management">
          <li v-for="(item, index) in currentSelectedAccountHistory" :key="index">
            <div>&pound;{{ item.value }}</div>
            <div>{{ item.date }}</div>
            <div><button @click="deleteRecord(item.uid)">Delete</button></div>
          </li>
        </ul>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapState({
      accountModule: state => state.accountModule
    }),
    currentSelectedAccount() {
      const account = this.accountModule.accounts.filter(
        account => this.accountModule.accountIdViewing === account.id
      );
      return account[0];
    },
    currentSelectedAccountHistory() {
      const account = this.accountModule.accounts.filter(
        account => this.accountModule.accountIdViewing === account.id
      );
      let historicRecords = account[0].history.reverse();
      let last10 = historicRecords.slice(0, 10);
      return last10;
    }
  },
  methods: {
    deleteRecord(uid) {
      this.$dialog
        .confirm("Delete this entry?")
        .then(() => {
          var payload = {
            accountId: this.currentSelectedAccount.id,
            recordId: uid
          };
          this.$store.dispatch("DELETE_ACCOUNT_VALUE", payload).then(() => {
            this.$store.dispatch("GET_USER_ACCOUNTS");
            this.value = "";
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    updateValue() {
      this.$store
        .dispatch("UPDATE_ACCOUNT_VALUE", {
          value: this.value,
          date: moment().format()
        })
        .then(() => {
          this.$store.dispatch("GET_USER_ACCOUNTS");
          this.value = "";
        });
    }
  }
};
</script>

<style style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";
.large-input {
  font-size: 35px;
  text-align: center;
}
.account-management {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr 1fr;
  }
}
</style>
