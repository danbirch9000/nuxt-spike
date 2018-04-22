<template>
    <section>
        <h3>Tweak values</h3>
        <span>{{rate}}</span>
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
        start: 5,
        step: 0.5,
        connect: [true,false],
        range: {
          min: 1,
          max: 15
        }
      });

      // slider.noUiSlider.on('change', function(){
      //   this.rate = slider.noUiSlider.get();
      // });

      slider.noUiSlider.on('change',() => {
        this.rate = slider.noUiSlider.get();
      });
    },
    watch: {
      rate: function (val) {
        console.log(val);
        this.changeRate(val);
      }
    },
    methods: {
      changeRate(value){
        this.$store.commit('setCurrentViewRate', value);
      }
    }
  }
</script>

<style scoped>

</style>