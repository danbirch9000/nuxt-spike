<template>
  <section class="container">
      <h1>Accounts</h1>

      <div class="container">
        <div class="row">
          <div class="col-md">
            <nuxt-link tag="button" to="/new-account" class="btn btn-primary btn-lg btn-block">Create new account</nuxt-link>
            <accountList />
            <accountDetails />
          </div>
        </div>
      </div>

  </section>
</template>

<script>
import accountList from "~/components/account-list";
import accountDetails from "~/components/account-details";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    accountList,
    accountDetails
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  created() {
    this.$store.dispatch("GET_USER_ACCOUNTS");
  }
};
</script>
