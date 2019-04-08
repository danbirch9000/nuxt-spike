<template>
  <div class="account-summary--create ss-panel">
    <input v-model="formItems.accountName"
           type="text">
    <input v-model="formItems.accountValue"
           type="number">
    <InlineButton :loading="loading"
                  :action="() => createAccount()"
                  text="Create"/>
  </div>
</template>

<script>
import InlineButton from "~/components/InlineButton.vue";
import { mapState } from "vuex";
import moment from "moment";
import AccountValueUpdate from "~/mixins/AccountValueUpdate";

export default {
  components: {
    InlineButton
  },
  mixins: [AccountValueUpdate],
  data() {
    return {
      formItems: {
        accountName: "",
        accountValue: ""
      },
      loading: false
    };
  },
  computed: {
    ...mapState({
      createUserAccount: state => state.accountModule.createUserAccount,
      updateUserAccountValue: state =>
        state.accountModule.updateUserAccountValue
    }),
    isFormValid() {
      return this.formItems.accountName && this.formItems.accountValue;
    }
  },
  methods: {
    createAccount() {
      if (this.isFormValid) {
        this.$store
          .dispatch("CREATE_ACCOUNT", {
            name: this.formItems.accountName
          })
          .then(response => {
            const payload = {
              id: response.data.name,
              value: this.formItems.accountValue,
              date: moment().format()
            };
            this.updateAccount(payload);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.account-summary--create {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr auto;
}
</style>
