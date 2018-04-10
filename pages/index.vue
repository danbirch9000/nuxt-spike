<template>
  <section class="container">
      <h1>Home</h1>
  </section>
</template>


<script>

import utilities from '~/common/utilities.js'
import goalList from '~/components/goal-list'
import chart from '~/components/chart'
import { mapGetters } from 'vuex'

export default {

  middleware:['check-auth','auth'],

}
</script>
