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

    <nuxt/>
  </div>
</template>

