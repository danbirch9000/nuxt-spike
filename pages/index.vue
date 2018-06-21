<template>
  <section class="container">
    <div>
      <Login />

      <h1>Calculator</h1>
      <Calculator/>
    </div>
  </section>
</template>


<script>
import Login from "~/components/Login";
import Calculator from "~/components/Calculator";
export default {
  components: { Login, Calculator },
  // middleware: ["check-auth", "auth"],
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  }
};
</script>
