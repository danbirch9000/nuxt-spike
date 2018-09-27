<template>
  <section class="container" />
</template>

<script>
import { parseHash } from "~/common/auth"; //eslint-disable-line

export default {
  components: {},
  mounted() {
    parseHash(this.$store, this.$router);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";
</style>
