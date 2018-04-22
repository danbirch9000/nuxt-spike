<template>
    <section>
        <h3>Tweak values</h3>
        <input v-model="rate" />
        <button @click="changeRate()" class="btn btn-primary btn-sm">change rate</button>
        <div id="sliderRegular" class="slider"></div>
    </section>
</template>

<script>

  export default {
    data() {
        return {
            rate: null
        }
    },
    mounted: function () {
      var slider = document.getElementById('sliderRegular');
      noUiSlider.create(slider, {
        start: 40,
        connect: [true,false],
        range: {
          min: 0,
          max: 100
        }
      });
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