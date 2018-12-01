<template>
  <section class="container" />
</template>

<script>
import { parseHash } from "~/common/auth"; //eslint-disable-line

export default {
  mounted() {
    parseHash(this.$store, this.$router);
  }
};
</script>
