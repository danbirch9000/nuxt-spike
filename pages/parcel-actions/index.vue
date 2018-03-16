<template>
  <section class="container">
    <div>
      <h1>parcel-actions, calling API and getting this response: {{Parcels}}</h1>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  fetch ({store}) {
    store.dispatch('getParcels')
  },
  computed: {
    Parcels () {
      console.log(this.$store.state.parcel);
      return this.$store.state.parcel
    }
  }
}
</script>

<style>

</style>
