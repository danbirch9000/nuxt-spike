<template>
  <section class="container">
    <div class="goal-layout">
      <div class="panel">
        <Login />
        <button @click="login()">Login</button>
      </div>
      <div class="panel">
        <h1>Savings Calculator</h1>
        <P>Use our savings calculator to see how compound interest can boost your savings over time.</P>
        <Calculator/>
      </div>
    </div>

  </section>


</template>


<script>
import Login from "~/components/Login";
import Calculator from "~/components/Calculator";
import { authorise } from "~/common/auth"; //eslint-disable-line

export default {
  components: { Login, Calculator },
  // middleware: ["check-auth", "auth"],
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

@media (min-width: 700px) {
  .grid-container {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 25% 75%;
  }
}
</style>
