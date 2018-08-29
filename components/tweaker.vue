<template>
  <section>
    <h3>Tweak values</h3>

    <div class="tweaker-control">
      <span>{{ rate }}%</span>
      <div id="tweaker-rate" class="slider" />>
    </div>

    <div class="tweaker-control">
      <span>£{{ monthly }}</span>
      <div id="tweaker-monthly" class="slider" />
    </div>

    <div class="tweaker-control">
      <span>{{ years }} yrs</span>
      <div id="tweaker-years" class="slider" />>
    </div>
  </section>
</template>

<script>
var rateSlider, monthlySlider, yearsSlider, noUiSlider;
export default {
  data() {
    return {
      rate: null,
      monthly: null,
      years: null
    };
  },
  computed: {
    currentView() {
      return this.$store.state.goalModule.goalView;
    }
  },
  watch: {
    rate: function(val) {
      this.changeRate(val);
    },
    monthly: function(val) {
      this.changeMonthly(val);
    },
    years: function(val) {
      this.changeYears(val);
    },
    currentView() {
      rateSlider.noUiSlider.set(this.currentView.rate);
      monthlySlider.noUiSlider.set(this.currentView.monthly);
      yearsSlider.noUiSlider.set(this.currentView.years);
    }
  },
  mounted: function() {
    this.buildSliders();
  },
  methods: {
    changeRate(value) {
      this.$store.commit("SET_CURRENT_GOAL_VIEW_RATE", value);
    },
    changeMonthly(value) {
      this.$store.commit("SET_CURRENT_GOAL_VIEW_MONTHLY", value);
    },
    changeYears(value) {
      this.$store.commit("SET_CURRENT_GOAL_VIEW_YEARS", value);
    },
    buildSliders() {
      rateSlider = document.getElementById("tweaker-rate");

      noUiSlider.create(rateSlider, {
        start: this.currentView.rate,
        step: 0.5,
        connect: [true, false],
        range: { min: 1, max: 15 }
      });
      rateSlider.noUiSlider.on("update", () => {
        this.rate = rateSlider.noUiSlider.get();
      });

      monthlySlider = document.getElementById("tweaker-monthly");
      noUiSlider.create(monthlySlider, {
        start: this.currentView.monthly,
        step: 10,
        connect: [true, false],
        range: { min: 10, max: 2000 }
      });
      monthlySlider.noUiSlider.on("update", () => {
        this.monthly = monthlySlider.noUiSlider.get();
      });

      yearsSlider = document.getElementById("tweaker-years");
      noUiSlider.create(yearsSlider, {
        start: this.currentView.years,
        step: 1,
        connect: [true, false],
        range: { min: 1, max: 100 }
      });
      yearsSlider.noUiSlider.on("update", () => {
        this.years = yearsSlider.noUiSlider.get();
      });
    }
  }
};
</script>

<style>
.noUi-handle {
  width: 25px;
  height: 25px;
  top: -11px;
}

.tweaker-control {
  margin-bottom: 10px;
}
</style>
