<template>
  <section>
    <Login />
    <h1 class="page-header">Quick savings calculator</h1>
    <section class="container">
      <p>Use our savings calculator to see how compound interest can boost your savings over time.</p>
      <NewGoal :allow-save="false"/>
    </section>
  </section>
</template>


<script>
import Login from "~/components/Login";
import NewGoal from "~/components/goals/NewGoal";

export default {
  components: { NewGoal, Login },
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
