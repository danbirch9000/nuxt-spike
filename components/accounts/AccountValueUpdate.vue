<template>
  <div class="account-summary--quick-update">
    <input v-model="formItems.quickUpdate"
           type="number">
    <InlineButton :loading="loading"
                  text="Update"
                  @click.native="updateAccountValue()"/>
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
}
</style>
