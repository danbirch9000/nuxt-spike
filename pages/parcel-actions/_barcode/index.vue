<template>
  <section class="container">
    <div>
      <Header />
      <h1>Parcel actions page with barcode: {{$route.params.barcode}}</h1>
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
  }
}
</script>
