<template>
  <section class="container">
    <div>
      <h1>parcel-actions barcode: </h1>
    </div>
  </section>
</template>

<script>
export default {
  validate(data){
    console.log(data);
    return data.params.barcode === 1;
  }
}
</script>