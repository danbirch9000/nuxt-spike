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

        <ul class="account-management">
          <li v-for="(item, index) in currentSelectedAccount.history" :key="index">&pound;{{ item.value }} - {{ item.date }}<button @click="deleteRecord(item.uid)">Delete</button></li>
        </ul>
        <button class="btn btn-primary" @click="deleteAccount()">Delete Account</button>
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
      console.log("searching for", this.accountModule.accountIdViewing);
      const account = this.accountModule.accounts.filter(account => {
        if (this.accountModule.accountIdViewing === account.id) {
          console.log("account", account);
        }
        return this.accountModule.accountIdViewing === account.id;
      });
      console.log("account[0]", account[0]);
      return account[0];
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
    deleteRecord(uid) {
      this.$dialog
        .confirm("Delete this entry?")
        .then(() => {
          var payload = {
            accountId: this.currentSelectedAccount.id,
            recordId: uid
          };
          console.log(payload);
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
}
</style>
