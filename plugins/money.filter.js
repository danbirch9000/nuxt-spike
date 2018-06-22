import Vue from "vue";
import utilities from "~/common/utilities.js";

Vue.filter("currency", function(value) {
  value = utilities.numberWithCommas(value);
  let digits = value.length - value.indexOf(".");
  if (digits === 2) {
    return `£${value}0`;
  }
  return `£${value}`;
});

Vue.filter("percentage", function(value) {
  value = Math.round(value * 100) / 100;
  return `${value} % `;
});
