import Vue from "vue";
import moment from "moment";

Vue.filter("monthAndYear", function(val) {
  return moment(val).format("MMM YYYY");
});

Vue.filter("reverse", function(value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse();
});
