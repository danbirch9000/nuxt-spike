<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Savings Tracker</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <nuxt-link to="/" tag="li" active-class="active" class="nav-item"><a class="nav-link">Home</a></nuxt-link>
          <nuxt-link to="/goals" tag="li" active-class="active" class="nav-item"><a class="nav-link">Goals</a></nuxt-link>
          <nuxt-link to="/accounts" tag="li" active-class="active" class="nav-item"><a class="nav-link">Accounts</a></nuxt-link>
          <li @click="logout" active-class="active" class="nav-item"><a class="nav-link">Logout</a></li>
        </ul>
      </div>
    </nav>

    <nuxt/>


  </div>
</template>

<script>

export default {
  methods: {
    logout(){
      this.$store.dispatch("LOGOUT");
      this.$router.push("/auth");
    }
  }
}

</script>

<style scoped>

.navbar {
  padding: .625rem .5rem;
}
.navbar .navbar-toggler .navbar-toggler-icon{
  height: 22px;
  background-color: #FFF;
}
</style>

