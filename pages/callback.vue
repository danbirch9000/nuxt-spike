<template>
  <section class="container">
    <InlineLoader width="30" height="30" />
  </section>
</template>

<script>
import "../components/icons/circle-loader";
import { parseHash } from "~/common/auth";
import InlineLoader from "~/components/InlineLoader";

export default {
  components: {
    InlineLoader
  },
  mounted() {
    parseHash(this.$store, this.$router);
  }
};
</script>
