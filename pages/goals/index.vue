<template>
  <section class="container">
    <div>
      <h1>Goals</h1>
      <div class="container">
        <div class="row">
          <div class="col-md">
            <goalList />
            <chart />
            <tableData />
          <div class="col-md">
            <nuxt-link to="/create-new">Create new goal</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>

import utilities from '~/common/utilities.js'
import goalList from '~/components/goal-list'
import chart from '~/components/chart'
import tableData from '~/components/table-data'
import { mapGetters } from 'vuex'

export default {
  components: {
    goalList,
    chart,
    tableData
  },
  middleware:['check-auth','auth'],
  fetch ({store}) {
    store.dispatch('getData')
  },
}
</script>
