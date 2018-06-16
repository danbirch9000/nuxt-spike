<template>
  <section class="container">
    <div>
      <Login />
    </div>
  </section>
</template>


<script>
import Login from "~/components/Login";
export default {
  components: { Login },
  // middleware: ["check-auth", "auth"],
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  }
};
</script>
