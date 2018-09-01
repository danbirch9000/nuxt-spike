<template>
  <section class="container">
    <h1>Accounts</h1>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <form>
            <div class="form-group">
              <label for="name">Account name</label>
              <input id="name" v-model="name" type="text" class="form-control" aria-describedby="name" placeholder="e.g. HL SIPP">
            </div>
            <div class="form-group">
              <label for="name">Account amount</label>
              <input id="amount" v-model="amount" type="text" class="form-control" aria-describedby="amount" placeholder="e.g. £2000">
            </div>
            <button class="btn btn-primary" @click.prevent="createAccount()">Save</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      name: "",
      amount: ""
    };
  },
  middleware: ["check-auth", "auth"],
  methods: {
    createAccount: function() {
      this.$store
        .dispatch("CREATE_ACCOUNT", {
          name: this.name,
          amount: {
            value: this.amount,
            date: moment().format()
          }
        })
        .then(() => {
          this.$store
            .dispatch("UPDATE_ACCOUNT_VALUE", {
              value: this.amount,
              date: moment().format()
            })
            .then(() => {
              this.$router.push("/accounts");
            });
        });
    }
  }
};
</script>
