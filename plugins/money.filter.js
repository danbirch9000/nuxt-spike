import Vue from 'vue'

Vue.filter('toUSD', function (value) {
  return `$${value}`;
});
