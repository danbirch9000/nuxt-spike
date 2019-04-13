<template>
  <div class="account-summary--create ss-panel">
    <div class="standard-input">
      <label for="accountName">Name</label>
      <input id="accountName"
             v-model="formItems.accountName"
             type="text">
    </div>
    <div class="standard-input">
      <label for="accountValue">Value</label>
      <input id="accountValue"
             v-model="formItems.accountValue"
             type="number">
    </div>


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
            this.formItems.accountName = "";
            this.formItems.accountValue = "";
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
  grid-template-columns: 1fr;
  @include tablet {
    grid-template-columns: 1fr 1fr auto;
  }
  @include desktop {
    grid-template-columns: 1fr 1fr auto;
  }
}
</style>
