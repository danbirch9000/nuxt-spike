<template>
  <section class="container">
    <div>
      <h1>nuxt-spike</h1>
      <nuxt-link to="/parcel-actions/1">Parcel Actions</nuxt-link>
      <p>test {{log('this is my message')}}</p>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import utilities from '~/common/utilities.js'
export default {
  components: {
    Logo
  },
  methods: {
    log: utilities.writeToPage,
  }
}
</script>

<style>

</style>
