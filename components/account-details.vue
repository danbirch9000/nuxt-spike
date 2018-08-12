<template>
  <section>
    <div>
      <div v-if="currentSelectedAccount !== null">
        <form @submit.prevent>
          <div class="form-group">
            <label for="name">new account value:</label>
            <input id="value" v-model="value" type="number" class="form-control large-input" aria-describedby="value" placeholder="e.g. £2000" autocomplete="off" step=".01">
          </div>
          <button class="btn btn-primary" @click="updateValue()">Update</button>
        </form>
        <ul class="account-management">
          <li v-for="(item) in currentSelectedAccount.history" :key="item.id">&pound;{{ item.value }} - {{ item.date }} <button @click="deleteRecord(item.id)">Delete</button></li>
        </ul>
        <button class="btn btn-primary" @click="deleteAccount()">Delete Account</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      value: ""
    };
  },
  computed: {
    ...mapGetters({
      currentSelectedAccount: "GET_ACCOUNT_VIEWING"
    })
  },
  methods: {
    deleteAccount() {},
    deleteRecord(id) {
      var base = this;
      this.$dialog
        .confirm("Delete this entry?")
        .then(function() {
          var payload = {
            accountId: base.currentSelectedAccount.id,
            recordId: id
          };

          base.$store.dispatch("DELETE_ACCOUNT_VALUE", payload).then(() => {
            base.$store.dispatch("GET_USER_ACCOUNTS");
            base.value = "";
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
