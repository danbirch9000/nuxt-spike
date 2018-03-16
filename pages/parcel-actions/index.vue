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
    store.dispatch('getParcelData')
  },
  computed: {
    Parcels () {
      console.log(this.$store.state.parcelData);
      return this.$store.state.parcelData
    }
  }
}
</script>

<style>

</style>
