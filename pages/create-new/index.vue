<template>
  <section class="container">
    <h1>Create new goal</h1>
    <Calculator can-save="true" />
  </section>
</template>

<script>
import Calculator from "~/components/Calculator";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    Calculator
  }
};
</script>
