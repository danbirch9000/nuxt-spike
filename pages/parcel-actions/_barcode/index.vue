<template>
  <section class="container">
    <div>
      <h1>Parcel actions page with barcode: {{$route.params.barcode}}</h1>
    </div>
  </section>
</template>

<script>
export default {
  validate(data){
    console.log(data);
    return data.params.barcode === '1';
  }
}
</script>
