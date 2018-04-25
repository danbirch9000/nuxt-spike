<template>
    <section>
        <h3>Tweak values</h3>

        <div class="tweaker-control">
          <span>{{rate}}%</span>
          <div id="tweaker-rate" class="slider"></div>
        </div>

        <div class="tweaker-control">
          <span>£{{monthly}}</span>
          <div id="tweaker-monthly" class="slider"></div>
        </div>

        <div class="tweaker-control">
          <span>{{years}} yrs</span>
          <div id="tweaker-years" class="slider"></div>
        </div>

    </section>
</template>

<script>

  export default {
    data() {
        return {
            rate: null,
            monthly: null,
            years: null
        }
    },
    mounted: function () {
      var rateSlider = document.getElementById('tweaker-rate');
      noUiSlider.create(rateSlider, {
        start: 5,
        step: 0.5,
        connect: [true, false],
        range: { min: 1, max: 15 }
      });
      rateSlider.noUiSlider.on('update',() => {
        this.rate = rateSlider.noUiSlider.get();
      });

      var monthlySlider = document.getElementById('tweaker-monthly');
      noUiSlider.create(monthlySlider, {
        start: 500,
        step: 10,
        connect: [true, false],
        range: { min: 10, max: 2000 }
      });
      monthlySlider.noUiSlider.on('update',() => {
        this.monthly = monthlySlider.noUiSlider.get();
      });

      var yearsSlider = document.getElementById('tweaker-years');
      noUiSlider.create(yearsSlider, {
        start: 10,
        step: 1,
        connect: [true, false],
        range: { min: 1, max: 100 }
      });
      yearsSlider.noUiSlider.on('update',() => {
        this.years = yearsSlider.noUiSlider.get();
      });

    },
    watch: {
      rate: function (val) {
        this.changeRate(val);
      },
      monthly: function (val) {
        this.changeMonthly(val);
      },
      years: function (val) {
        this.changeYears(val);
      }
    },
    methods: {
      changeRate(value){
        this.$store.commit('setCurrentViewRate', value);
      },
      changeMonthly(value){
        this.$store.commit('setCurrentViewMonthly', value);
      },
      changeYears(value){
        this.$store.commit('setCurrentViewYears', value);
      }
    }
  }
</script>

<style>
.noUi-handle{
  width: 25px;
  height: 25px;
  top: -11px;
}

.tweaker-control{
  margin-bottom: 10px;
}
</style>