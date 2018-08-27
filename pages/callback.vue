<template>
  <section class="container">
    <p>callback</p>
  </section>
</template>

<script>
import { parseHash } from "~/common/auth"; //eslint-disable-line

export default {
  components: {},
  // middleware: ["check-auth", "auth"],
  mounted() {
    parseHash();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";
</style>
