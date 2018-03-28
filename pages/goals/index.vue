<template>
  <section class="container">
    <div>
      <h1>Goals</h1>
      <goalList />
      <nuxt-link to="/create-new">Create new goal</nuxt-link>
    </div>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import goalList from '~/components/goal-list'

export default {
  components: {
    goalList
  }
}
</script>
