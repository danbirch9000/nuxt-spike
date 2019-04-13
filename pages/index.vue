<template>
  <section class="container">
    <div class="panel">
      <Login />
      <h1>Savings Calculator</h1>
      <P>Use our savings calculator to see how compound interest can boost your savings over time.</P>

    </div>
  </section>
</template>


<script>
import Login from "~/components/Login";

export default {
  components: { Login },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";

@media (min-width: 700px) {
}
</style>
