export default {
  methods: {
    updateAccount(payload) {
      this.loading = true;
      this.$store
        .dispatch("UPDATE_USER_ACCOUNT_VALUE", payload)
        .then(response => {
          this.$store.commit("ADD_UPDATED_ACCOUNT_VALUE", {
            ...payload,
            recordId: response.data.name
          });
        })
        .catch(() => {
          console.log("Error updating account value");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
