<template>
  <section>
    <button @click="login()">Login / Register</button>
  </section>
</template>

<script>
import { authorise } from "~/common/auth"; //eslint-disable-line

export default {
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
