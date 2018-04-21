<template>
    <section>
        <h3>Tweak values</h3>
        <input v-model="rate" />
        <button @click="changeRate()" class="btn btn-primary btn-sm">change rate</button>
    </section>
</template>

<script>

  export default {
    data() {
        return {
            rate: null
        }
    },
    methods: {
      changeRate(){
        this.$store.commit('setCurrentViewRate', this.rate);
      }
    }
  }
</script>

<style scoped>

</style>