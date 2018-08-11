import Vue from "vue";
import moment from "moment";

Vue.filter("monthAndYear", function(val) {
  return moment(val).format("MMM YYYY");
});
