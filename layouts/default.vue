<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Nuxt</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <nuxt-link to="/" tag="li" active-class="active" class="nav-item"><a>Home</a></nuxt-link>
          <nuxt-link to="/goals" tag="li" active-class="active" class="nav-item"><a>Goals</a></nuxt-link>
          <nuxt-link to="/accounts" tag="li" active-class="active" class="nav-item"><a>Accounts</a></nuxt-link>
        </ul>
      </div>
    </nav>

    <nuxt-link to="/" tag="li" active-class="active" class="nav-item"><a>Home</a></nuxt-link>
    <nuxt-link to="/goals" tag="li" active-class="active" class="nav-item"><a>Goals</a></nuxt-link>
    <nuxt-link to="/accounts" tag="li" active-class="active" class="nav-item"><a>Accounts</a></nuxt-link>
    <span @click="logout()">Logout</span>

    <nuxt/>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </div>
</template>

<script>

export default {
  methods: {
    logout(){
      console.log('test');
      this.$store.dispatch("logout");
    }
  }
}

</script>


