<template>
  <div class="account-summary--delete">
    <InlineButton :loading="loading"
                  :action="() => deleteAccount()"
                  :use-confirmation="true"
                  text="Delete account"/>
  </div>
</template>

<script>
import InlineButton from "~/components/InlineButton.vue";

export default {
  components: {
    InlineButton
  },
  props: {
    accountId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    deleteAccount() {
      this.loading = true;
      this.$store
        .dispatch("DELETE_ACCOUNT", { accountId: this.accountId })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";

.account-summary--delete {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
}
</style>
