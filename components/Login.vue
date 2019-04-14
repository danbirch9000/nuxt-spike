<template>
  <section class="header-container">
    <InlineButton :action="() => login()"
                  text="Login / Register"/>
  </section>
</template>

<script>
import { authorise } from "~/common/auth"; //eslint-disable-line
import InlineButton from "~/components/InlineButton";

export default {
  components: {
    InlineButton
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  methods: {
    login() {
      authorise();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";

.header-container {
  margin: 20px;
  text-align: right;
}
</style>
