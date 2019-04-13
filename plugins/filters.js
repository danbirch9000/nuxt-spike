import Vue from "vue";
import moment from "moment";

export const sterling = val => {
  val = Number(val).toFixed(2);
  return `£${val}`;
};

Vue.filter("monthAndYear", function(val) {
  return moment(val).format("MMM YYYY");
});

Vue.filter("dateTime", function(val) {
  return moment(val).format("L LT");
});

Vue.filter("noDecimal", function(val) {
  return Math.round(val);
});

Vue.filter("reverse", function(value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse();
});

Vue.filter("sterling", sterling);
