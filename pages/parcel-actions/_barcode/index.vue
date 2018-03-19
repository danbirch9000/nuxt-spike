<template>
  <section class="container">
    <div>
      <Header />
      <h1>{{$route.params.barcode}}</h1>
    </div>
  </section>
</template>

<script>
import Header from '~/components/Header.vue';
export default {
  components:{
    Header
  },
  layout: 'test',
  validate(data){
    console.log(data);
    return data.params.barcode === '1';
  },
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
