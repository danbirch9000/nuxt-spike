<template>
  <section class="container">
    <div>
      <h1>Home</h1>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <nuxt-link tag="button" to="/create-new" class="btn btn-primary btn-lg btn-block">Create new goal</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  middleware: ["check-auth", "auth"],
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  }
};
</script>
