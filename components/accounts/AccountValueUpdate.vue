<template>
  <div class="account-summary--quick-update">
    <div class="standard-input">
      <label :for="`update-${accountId}`">New value</label>
      <input v-model="formItems.quickUpdate"
             :id="`update-${accountId}`"
             type="number">
    </div>

    <InlineButton :loading="loading"
                  :use-confirmation="true"
                  :valid="isFormValid"
                  :action="() => updateAccountValue()"
                  text="Update"/>
  </div>
</template>

<script>
import moment from "moment";
import InlineButton from "~/components/InlineButton.vue";
import AccountValueUpdate from "~/mixins/AccountValueUpdate";

export default {
  components: {
    InlineButton
  },
  mixins: [AccountValueUpdate],
  props: {
    accountId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formItems: {
        quickUpdate: ""
      },
      loading: false
    };
  },
  computed: {
    isFormValid() {
      return this.formItems.quickUpdate !== "";
    }
  },
  methods: {
    updateAccountValue() {
      if (this.formItems.quickUpdate) {
        const payload = {
          id: this.accountId,
          value: this.formItems.quickUpdate,
          date: moment().format()
        };
        this.updateAccount(payload);
      }
    },
    loadDetail(id) {
      this.$router.push(`/accounts/details/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
h3 {
  margin: 0;
}
.account-summary--quick-update {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr auto;
  > div:last-child {
    align-self: end;
  }
}
</style>
