<template>
  <section class="container">
      <h1>Accounts</h1>
  </section>
</template>

<script>
  export default {
    middleware:['check-auth','auth']
  }
</script>
